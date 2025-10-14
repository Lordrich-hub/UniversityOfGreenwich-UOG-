#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "Build a comprehensive University of Greenwich mobile app with authentication, student portal, campus maps, QR attendance scanner, library search, and AI chatbot assistant."

backend:
  - task: "User Authentication (JWT)"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "Register and login endpoints tested successfully with curl. Token generation working."
  
  - task: "Student Timetable Management"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: "GET and POST endpoints created for timetable. Needs testing."
      - working: true
        agent: "testing"
        comment: "Comprehensive testing completed. GET /api/timetable returns user-specific timetable entries. POST /api/timetable successfully adds new classes with proper authentication. All CRUD operations working correctly."
  
  - task: "Grades Management"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: "GET and POST endpoints created for grades. Needs testing."
      - working: true
        agent: "testing"
        comment: "Comprehensive testing completed. GET /api/grades returns user-specific grade records. POST /api/grades successfully adds new grades with proper validation. Grade data includes course name, grade, and credits."
  
  - task: "News & Events Feed"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "News endpoint tested via seed data. Working correctly."
  
  - task: "Library Book Search"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Library search with query parameter implemented. Needs testing."
      - working: true
        agent: "testing"
        comment: "Comprehensive testing completed. GET /api/library works both with and without query parameters. Search functionality properly filters by title, author, and ISBN. POST /api/library successfully adds new books. Seed data contains 3 sample books."
  
  - task: "QR Code Attendance Marking"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: "POST endpoint for attendance marking created. Needs testing with QR data."
      - working: true
        agent: "testing"
        comment: "Comprehensive testing completed. POST /api/attendance successfully marks attendance with QR code data and class name. GET /api/attendance retrieves user-specific attendance records with timestamps. Both endpoints working correctly with proper authentication."
  
  - task: "AI Chatbot Integration"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "AI chatbot tested with curl. Successfully integrated with Emergent LLM key using gpt-4o-mini. Responses are contextual and helpful."

frontend:
  - task: "Authentication Screens (Login/Register)"
    implemented: true
    working: "NA"
    file: "/app/frontend/app/auth/"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Login and register screens created with form validation and error handling. Needs UI testing."
  
  - task: "Bottom Tab Navigation"
    implemented: true
    working: "NA"
    file: "/app/frontend/app/(tabs)/_layout.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "5 tabs created: Home, Timetable, Campus, Library, Profile. Navigation structure in place."
  
  - task: "Home Dashboard with News"
    implemented: true
    working: "NA"
    file: "/app/frontend/app/(tabs)/index.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Home screen with quick actions, news feed, and welcome header. Pull to refresh implemented."
  
  - task: "Timetable View"
    implemented: true
    working: "NA"
    file: "/app/frontend/app/(tabs)/timetable.tsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Day-based timetable view with horizontal scroll for day selection. Displays classes with time, location, and campus."
  
  - task: "Campus Maps & Information"
    implemented: true
    working: "NA"
    file: "/app/frontend/app/(tabs)/campus.tsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Campus selector with 3 campuses (Greenwich, Avery Hill, Medway). Map placeholder with 'Open in Maps' functionality. Campus info and facilities listed."
  
  - task: "Library Search"
    implemented: true
    working: "NA"
    file: "/app/frontend/app/(tabs)/library.tsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Search input with real-time filtering. Book cards showing title, author, ISBN, location, and availability status."
  
  - task: "Profile with Grades & Attendance"
    implemented: true
    working: "NA"
    file: "/app/frontend/app/(tabs)/profile.tsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Profile screen with user info, GPA calculator, grades list, attendance records, and logout button."
  
  - task: "QR Scanner Modal"
    implemented: true
    working: "NA"
    file: "/app/frontend/app/qr-scanner.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "QR scanner with camera permissions, scan overlay, and attendance marking. Uses expo-barcode-scanner."
  
  - task: "AI Chatbot Modal"
    implemented: true
    working: "NA"
    file: "/app/frontend/app/chatbot.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Chat interface with message history, typing indicator, and session management. Connected to backend AI endpoint."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 0
  run_ui: false

test_plan:
  current_focus:
    - "User Authentication (JWT)"
    - "AI Chatbot Integration"
    - "QR Code Attendance Marking"
    - "Student Timetable Management"
    - "Library Book Search"
  stuck_tasks: []
  test_all: true
  test_priority: "high_first"

agent_communication:
  - agent: "main"
    message: "Complete University of Greenwich app MVP built with all features. Backend has been tested manually for auth and AI chatbot. Now needs comprehensive backend testing for all endpoints including timetable, grades, library, and attendance. Authentication is working - use username: testuser, password: test123 for testing."