#!/usr/bin/env python3
"""
Comprehensive Backend Testing for University of Greenwich App
Tests all API endpoints with proper authentication and data validation
"""

import requests
import json
import sys
from datetime import datetime

# Configuration
BASE_URL = "https://uni-greenwich-hub.preview.emergentagent.com/api"
TEST_USERNAME = "testuser"
TEST_PASSWORD = "test123"

class UniversityAppTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.token = None
        self.session = requests.Session()
        self.test_results = []
        
    def log_result(self, test_name, success, message, details=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def test_user_registration(self):
        """Test user registration endpoint"""
        try:
            # First try to register a new user
            test_user_data = {
                "username": f"testuser_{datetime.now().timestamp()}",
                "email": f"test_{datetime.now().timestamp()}@greenwich.ac.uk",
                "password": "test123",
                "student_id": "STU123456",
                "course": "Computer Science",
                "year": 2
            }
            
            response = self.session.post(f"{self.base_url}/auth/register", json=test_user_data)
            
            if response.status_code == 200:
                data = response.json()
                if "token" in data and "user" in data:
                    self.log_result("User Registration", True, "New user registered successfully")
                    return True
                else:
                    self.log_result("User Registration", False, "Missing token or user data in response", data)
                    return False
            else:
                self.log_result("User Registration", False, f"Registration failed with status {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("User Registration", False, f"Registration error: {str(e)}")
            return False
    
    def test_user_login(self):
        """Test user login and get authentication token"""
        try:
            login_data = {
                "username": TEST_USERNAME,
                "password": TEST_PASSWORD
            }
            
            response = self.session.post(f"{self.base_url}/auth/login", json=login_data)
            
            if response.status_code == 200:
                data = response.json()
                if "token" in data:
                    self.token = data["token"]
                    self.session.headers.update({"Authorization": f"Bearer {self.token}"})
                    self.log_result("User Login", True, f"Login successful for user: {TEST_USERNAME}")
                    return True
                else:
                    self.log_result("User Login", False, "No token in login response", data)
                    return False
            else:
                self.log_result("User Login", False, f"Login failed with status {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("User Login", False, f"Login error: {str(e)}")
            return False
    
    def test_get_current_user(self):
        """Test /me endpoint to get current user info"""
        try:
            if not self.token:
                self.log_result("Get Current User", False, "No authentication token available")
                return False
                
            response = self.session.get(f"{self.base_url}/auth/me")
            
            if response.status_code == 200:
                data = response.json()
                if "username" in data and "email" in data:
                    self.log_result("Get Current User", True, f"User info retrieved for: {data['username']}")
                    return True
                else:
                    self.log_result("Get Current User", False, "Missing user data in response", data)
                    return False
            else:
                self.log_result("Get Current User", False, f"Get user failed with status {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Get Current User", False, f"Get user error: {str(e)}")
            return False
    
    def test_timetable_operations(self):
        """Test timetable GET and POST operations"""
        try:
            if not self.token:
                self.log_result("Timetable Operations", False, "No authentication token available")
                return False
            
            # Test GET timetable
            response = self.session.get(f"{self.base_url}/timetable")
            if response.status_code != 200:
                self.log_result("Timetable GET", False, f"GET timetable failed with status {response.status_code}", response.text)
                return False
            
            timetable_data = response.json()
            self.log_result("Timetable GET", True, f"Retrieved {len(timetable_data)} timetable entries")
            
            # Test POST timetable
            new_class = {
                "course": "Advanced Software Engineering",
                "time": "09:00-11:00",
                "location": "Room CS101",
                "day": "Monday",
                "campus": "Greenwich"
            }
            
            response = self.session.post(f"{self.base_url}/timetable", json=new_class)
            if response.status_code == 200:
                data = response.json()
                if "_id" in data and data["course"] == new_class["course"]:
                    self.log_result("Timetable POST", True, f"Successfully added class: {new_class['course']}")
                    return True
                else:
                    self.log_result("Timetable POST", False, "Invalid response data", data)
                    return False
            else:
                self.log_result("Timetable POST", False, f"POST timetable failed with status {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Timetable Operations", False, f"Timetable error: {str(e)}")
            return False
    
    def test_grades_operations(self):
        """Test grades GET and POST operations"""
        try:
            if not self.token:
                self.log_result("Grades Operations", False, "No authentication token available")
                return False
            
            # Test GET grades
            response = self.session.get(f"{self.base_url}/grades")
            if response.status_code != 200:
                self.log_result("Grades GET", False, f"GET grades failed with status {response.status_code}", response.text)
                return False
            
            grades_data = response.json()
            self.log_result("Grades GET", True, f"Retrieved {len(grades_data)} grade entries")
            
            # Test POST grades
            new_grade = {
                "name": "Database Systems",
                "grade": "A",
                "credits": 20
            }
            
            response = self.session.post(f"{self.base_url}/grades", json=new_grade)
            if response.status_code == 200:
                data = response.json()
                if "_id" in data and data["name"] == new_grade["name"]:
                    self.log_result("Grades POST", True, f"Successfully added grade: {new_grade['name']} - {new_grade['grade']}")
                    return True
                else:
                    self.log_result("Grades POST", False, "Invalid response data", data)
                    return False
            else:
                self.log_result("Grades POST", False, f"POST grades failed with status {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Grades Operations", False, f"Grades error: {str(e)}")
            return False
    
    def test_library_search(self):
        """Test library search with and without query parameters"""
        try:
            # Test library search without query (get all books)
            response = self.session.get(f"{self.base_url}/library")
            if response.status_code != 200:
                self.log_result("Library Search (All)", False, f"Library search failed with status {response.status_code}", response.text)
                return False
            
            all_books = response.json()
            self.log_result("Library Search (All)", True, f"Retrieved {len(all_books)} books from library")
            
            # Test library search with query parameter
            search_query = "Computer"
            response = self.session.get(f"{self.base_url}/library", params={"query": search_query})
            if response.status_code != 200:
                self.log_result("Library Search (Query)", False, f"Library search with query failed with status {response.status_code}", response.text)
                return False
            
            search_results = response.json()
            self.log_result("Library Search (Query)", True, f"Found {len(search_results)} books matching '{search_query}'")
            
            # Test adding a book (requires authentication)
            if self.token:
                new_book = {
                    "title": "Advanced Python Programming",
                    "author": "Test Author",
                    "isbn": "978-0-123456-99-9",
                    "available": True,
                    "location": "Computer Science Section, Floor 2",
                    "campus": "Greenwich"
                }
                
                response = self.session.post(f"{self.base_url}/library", json=new_book)
                if response.status_code == 200:
                    data = response.json()
                    if "_id" in data and data["title"] == new_book["title"]:
                        self.log_result("Library POST", True, f"Successfully added book: {new_book['title']}")
                    else:
                        self.log_result("Library POST", False, "Invalid response data", data)
                else:
                    self.log_result("Library POST", False, f"POST library failed with status {response.status_code}", response.text)
            
            return True
                
        except Exception as e:
            self.log_result("Library Search", False, f"Library search error: {str(e)}")
            return False
    
    def test_qr_attendance(self):
        """Test QR code attendance marking"""
        try:
            if not self.token:
                self.log_result("QR Attendance", False, "No authentication token available")
                return False
            
            # Test marking attendance
            attendance_data = {
                "class_name": "Advanced Software Engineering",
                "qr_code": "QR_CODE_12345_LECTURE_HALL_A"
            }
            
            response = self.session.post(f"{self.base_url}/attendance", json=attendance_data)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "record" in data:
                    self.log_result("QR Attendance POST", True, f"Attendance marked for: {attendance_data['class_name']}")
                else:
                    self.log_result("QR Attendance POST", False, "Invalid response format", data)
                    return False
            else:
                self.log_result("QR Attendance POST", False, f"Attendance marking failed with status {response.status_code}", response.text)
                return False
            
            # Test getting attendance records
            response = self.session.get(f"{self.base_url}/attendance")
            if response.status_code == 200:
                attendance_records = response.json()
                self.log_result("QR Attendance GET", True, f"Retrieved {len(attendance_records)} attendance records")
                return True
            else:
                self.log_result("QR Attendance GET", False, f"Get attendance failed with status {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("QR Attendance", False, f"QR attendance error: {str(e)}")
            return False
    
    def test_ai_chatbot(self):
        """Test AI chatbot integration"""
        try:
            if not self.token:
                self.log_result("AI Chatbot", False, "No authentication token available")
                return False
            
            # Test sending a message to the chatbot
            chat_message = {
                "message": "What are the library opening hours at Greenwich campus?",
                "session_id": f"test_session_{datetime.now().timestamp()}"
            }
            
            response = self.session.post(f"{self.base_url}/chat", json=chat_message)
            if response.status_code == 200:
                data = response.json()
                if "response" in data and "session_id" in data:
                    self.log_result("AI Chatbot POST", True, f"Chatbot responded successfully. Response length: {len(data['response'])} chars")
                else:
                    self.log_result("AI Chatbot POST", False, "Invalid response format", data)
                    return False
            else:
                self.log_result("AI Chatbot POST", False, f"Chatbot failed with status {response.status_code}", response.text)
                return False
            
            # Test getting chat history
            response = self.session.get(f"{self.base_url}/chat/history")
            if response.status_code == 200:
                chat_history = response.json()
                self.log_result("AI Chatbot History", True, f"Retrieved {len(chat_history)} chat history entries")
                return True
            else:
                self.log_result("AI Chatbot History", False, f"Get chat history failed with status {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("AI Chatbot", False, f"AI chatbot error: {str(e)}")
            return False
    
    def test_news_endpoints(self):
        """Test news and events endpoints"""
        try:
            # Test GET news (no auth required)
            response = self.session.get(f"{self.base_url}/news")
            if response.status_code == 200:
                news_data = response.json()
                self.log_result("News GET", True, f"Retrieved {len(news_data)} news articles")
            else:
                self.log_result("News GET", False, f"Get news failed with status {response.status_code}", response.text)
                return False
            
            # Test GET events (no auth required)
            response = self.session.get(f"{self.base_url}/events")
            if response.status_code == 200:
                events_data = response.json()
                self.log_result("Events GET", True, f"Retrieved {len(events_data)} events")
            else:
                self.log_result("Events GET", False, f"Get events failed with status {response.status_code}", response.text)
                return False
            
            # Test POST news (requires auth)
            if self.token:
                new_news = {
                    "title": "Test News Article",
                    "content": "This is a test news article created during backend testing.",
                    "category": "Testing"
                }
                
                response = self.session.post(f"{self.base_url}/news", json=new_news)
                if response.status_code == 200:
                    data = response.json()
                    if "_id" in data and data["title"] == new_news["title"]:
                        self.log_result("News POST", True, f"Successfully created news: {new_news['title']}")
                    else:
                        self.log_result("News POST", False, "Invalid response data", data)
                else:
                    self.log_result("News POST", False, f"POST news failed with status {response.status_code}", response.text)
            
            return True
                
        except Exception as e:
            self.log_result("News Endpoints", False, f"News endpoints error: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all backend tests in sequence"""
        print(f"🚀 Starting University of Greenwich App Backend Tests")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)
        
        # Authentication tests (required for other tests)
        print("\n🔐 AUTHENTICATION TESTS")
        self.test_user_registration()
        login_success = self.test_user_login()
        
        if login_success:
            self.test_get_current_user()
        
        # Core functionality tests
        print("\n📚 CORE FUNCTIONALITY TESTS")
        self.test_timetable_operations()
        self.test_grades_operations()
        self.test_library_search()
        self.test_qr_attendance()
        self.test_ai_chatbot()
        self.test_news_endpoints()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        # Show failed tests
        failed_tests = [result for result in self.test_results if not result["success"]]
        if failed_tests:
            print(f"\n❌ FAILED TESTS ({len(failed_tests)}):")
            for test in failed_tests:
                print(f"  • {test['test']}: {test['message']}")
        else:
            print(f"\n🎉 ALL TESTS PASSED!")
        
        return passed == total

if __name__ == "__main__":
    tester = UniversityAppTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)