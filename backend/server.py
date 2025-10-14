from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from pymongo import MongoClient
from bson import ObjectId
import os
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage
import asyncio

load_dotenv()

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB
client = MongoClient(os.getenv("MONGO_URL"))
db = client.university_db

# JWT Config
JWT_SECRET = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 * 24 * 60  # 30 days

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Models
class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str
    student_id: str
    course: str
    year: int

class UserLogin(BaseModel):
    username: str
    password: str

class CourseGrade(BaseModel):
    name: str
    grade: str
    credits: int

class TimetableClass(BaseModel):
    course: str
    time: str
    location: str
    day: str
    campus: str

class NewsEvent(BaseModel):
    title: str
    content: str
    category: str
    image: Optional[str] = None

class LibraryBook(BaseModel):
    title: str
    author: str
    isbn: str
    available: bool
    location: str
    campus: str

class AttendanceRecord(BaseModel):
    class_name: str
    qr_code: str

class ChatMessage(BaseModel):
    message: str
    session_id: Optional[str] = None

# Helper functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=ALGORITHM)

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Auth Routes
@app.post("/api/auth/register")
async def register(user: UserRegister):
    if db.users.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already exists")
    
    if db.users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already exists")
    
    user_dict = user.dict()
    user_dict["password"] = hash_password(user.password)
    user_dict["created_at"] = datetime.utcnow()
    
    result = db.users.insert_one(user_dict)
    token = create_access_token({"sub": user.username})
    
    return {
        "token": token,
        "user": {
            "username": user.username,
            "email": user.email,
            "student_id": user.student_id,
            "course": user.course,
            "year": user.year
        }
    }

@app.post("/api/auth/login")
async def login(user: UserLogin):
    db_user = db.users.find_one({"username": user.username})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub": user.username})
    
    return {
        "token": token,
        "user": {
            "username": db_user["username"],
            "email": db_user["email"],
            "student_id": db_user["student_id"],
            "course": db_user["course"],
            "year": db_user["year"]
        }
    }

@app.get("/api/auth/me")
async def get_me(username: str = Depends(get_current_user)):
    user = db.users.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "username": user["username"],
        "email": user["email"],
        "student_id": user["student_id"],
        "course": user["course"],
        "year": user["year"]
    }

# Timetable Routes
@app.get("/api/timetable")
async def get_timetable(username: str = Depends(get_current_user)):
    user = db.users.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    timetable = list(db.timetable.find({"username": username}))
    for item in timetable:
        item["_id"] = str(item["_id"])
    
    return timetable

@app.post("/api/timetable")
async def add_timetable(timetable_class: TimetableClass, username: str = Depends(get_current_user)):
    timetable_dict = timetable_class.dict()
    timetable_dict["username"] = username
    timetable_dict["created_at"] = datetime.utcnow()
    
    result = db.timetable.insert_one(timetable_dict)
    timetable_dict["_id"] = str(result.inserted_id)
    
    return timetable_dict

# Grades Routes
@app.get("/api/grades")
async def get_grades(username: str = Depends(get_current_user)):
    user = db.users.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    grades = list(db.grades.find({"username": username}))
    for item in grades:
        item["_id"] = str(item["_id"])
    
    return grades

@app.post("/api/grades")
async def add_grade(grade: CourseGrade, username: str = Depends(get_current_user)):
    grade_dict = grade.dict()
    grade_dict["username"] = username
    grade_dict["created_at"] = datetime.utcnow()
    
    result = db.grades.insert_one(grade_dict)
    grade_dict["_id"] = str(result.inserted_id)
    
    return grade_dict

# News & Events Routes
@app.get("/api/news")
async def get_news():
    news = list(db.news.find().sort("created_at", -1).limit(50))
    for item in news:
        item["_id"] = str(item["_id"])
    return news

@app.post("/api/news")
async def create_news(news: NewsEvent, username: str = Depends(get_current_user)):
    news_dict = news.dict()
    news_dict["created_at"] = datetime.utcnow()
    news_dict["author"] = username
    
    result = db.news.insert_one(news_dict)
    news_dict["_id"] = str(result.inserted_id)
    
    return news_dict

@app.get("/api/events")
async def get_events():
    events = list(db.events.find().sort("date", 1).limit(50))
    for item in events:
        item["_id"] = str(item["_id"])
    return events

# Library Routes
@app.get("/api/library")
async def search_library(query: Optional[str] = None):
    if query:
        books = list(db.library.find({
            "$or": [
                {"title": {"$regex": query, "$options": "i"}},
                {"author": {"$regex": query, "$options": "i"}},
                {"isbn": {"$regex": query, "$options": "i"}}
            ]
        }).limit(50))
    else:
        books = list(db.library.find().limit(50))
    
    for item in books:
        item["_id"] = str(item["_id"])
    
    return books

@app.post("/api/library")
async def add_book(book: LibraryBook, username: str = Depends(get_current_user)):
    book_dict = book.dict()
    book_dict["created_at"] = datetime.utcnow()
    
    result = db.library.insert_one(book_dict)
    book_dict["_id"] = str(result.inserted_id)
    
    return book_dict

# Attendance Routes
@app.post("/api/attendance")
async def mark_attendance(record: AttendanceRecord, username: str = Depends(get_current_user)):
    # Verify QR code exists
    attendance_dict = record.dict()
    attendance_dict["username"] = username
    attendance_dict["timestamp"] = datetime.utcnow()
    
    result = db.attendance.insert_one(attendance_dict)
    attendance_dict["_id"] = str(result.inserted_id)
    
    return {"message": "Attendance marked successfully", "record": attendance_dict}

@app.get("/api/attendance")
async def get_attendance(username: str = Depends(get_current_user)):
    attendance = list(db.attendance.find({"username": username}).sort("timestamp", -1))
    for item in attendance:
        item["_id"] = str(item["_id"])
    
    return attendance

# AI Chatbot Routes
@app.post("/api/chat")
async def chat(chat_msg: ChatMessage, username: str = Depends(get_current_user)):
    try:
        api_key = os.getenv("EMERGENT_LLM_KEY")
        session_id = chat_msg.session_id or f"{username}_{datetime.utcnow().timestamp()}"
        
        chat = LlmChat(
            api_key=api_key,
            session_id=session_id,
            system_message="You are a helpful University of Greenwich assistant. Help students with information about courses, campus locations, events, library resources, and general university queries. The university has 3 campuses: Greenwich (SE London - historic World Heritage Site), Avery Hill (Eltham, London), and Medway (Kent). Be helpful, friendly, and concise."
        )
        
        chat.with_model("openai", "gpt-4o-mini")
        
        user_message = UserMessage(text=chat_msg.message)
        response = await chat.send_message(user_message)
        
        # Store chat history
        chat_record = {
            "username": username,
            "session_id": session_id,
            "message": chat_msg.message,
            "response": response,
            "timestamp": datetime.utcnow()
        }
        db.chat_history.insert_one(chat_record)
        
        return {"response": response, "session_id": session_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")

@app.get("/api/chat/history")
async def get_chat_history(username: str = Depends(get_current_user), session_id: Optional[str] = None):
    query = {"username": username}
    if session_id:
        query["session_id"] = session_id
    
    history = list(db.chat_history.find(query).sort("timestamp", 1).limit(100))
    for item in history:
        item["_id"] = str(item["_id"])
    
    return history

# Seed data endpoint (for development)
@app.post("/api/seed")
async def seed_data(username: str = Depends(get_current_user)):
    # Seed some sample news
    sample_news = [
        {
            "title": "New Library Opening at Greenwich Campus",
            "content": "We are excited to announce the opening of our state-of-the-art library facility at the Greenwich Campus. The £76-million Stockwell Street Building features modern study spaces, film/TV studios, and extensive digital resources.",
            "category": "Campus News",
            "created_at": datetime.utcnow(),
            "author": "admin"
        },
        {
            "title": "University Partnership Announcement",
            "content": "The University of Greenwich and the University of Kent have signed a memorandum of understanding to form the London and South East University Group, launching in 2026/27.",
            "category": "Important",
            "created_at": datetime.utcnow(),
            "author": "admin"
        },
        {
            "title": "Open Day - 18 October 2025",
            "content": "Join us for an in-person Open Day on 18 October 2025. Explore our campuses, meet faculty, and learn about our 200+ undergraduate courses.",
            "category": "Events",
            "created_at": datetime.utcnow(),
            "author": "admin"
        }
    ]
    
    # Seed library books
    sample_books = [
        {
            "title": "Introduction to Computer Science",
            "author": "John Smith",
            "isbn": "978-0-123456-78-9",
            "available": True,
            "location": "Computer Science Section, Floor 2",
            "campus": "Greenwich",
            "created_at": datetime.utcnow()
        },
        {
            "title": "Business Management Fundamentals",
            "author": "Jane Doe",
            "isbn": "978-0-987654-32-1",
            "available": True,
            "location": "Business Section, Floor 3",
            "campus": "Greenwich",
            "created_at": datetime.utcnow()
        },
        {
            "title": "Engineering Mathematics",
            "author": "Robert Johnson",
            "isbn": "978-0-111222-33-4",
            "available": False,
            "location": "Engineering Section, Floor 1",
            "campus": "Medway",
            "created_at": datetime.utcnow()
        }
    ]
    
    # Insert only if collections are empty
    if db.news.count_documents({}) == 0:
        db.news.insert_many(sample_news)
    
    if db.library.count_documents({}) == 0:
        db.library.insert_many(sample_books)
    
    return {"message": "Sample data seeded successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)