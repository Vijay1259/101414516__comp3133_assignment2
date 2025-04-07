 Employee Management System

Student Name: Diya Patel  
Course: COMP 3133 – Assignment 2  
Semester: 6th

---

## Project Overview

This is a full-stack web application to manage employee information, including adding, updating, deleting, and searching for employees. It features user authentication with signup/login, password hashing, and JWT-based session management.

---

## Technologies Used

- Frontend: Angular, Angular Material/Bootstrap, Apollo Angular
- Backend: Node.js, Express.js, GraphQL, MongoDB, JWT, Bcrypt

---

## Key Features

- User authentication (signup/login)
- Add, update, delete employees
- Search employees
- JWT-based session management

---

## How to Run

1. Clone the repository.
2. Install dependencies for frontend and backend.
3. Run the backend server.
4. Run the Angular app in development mode.

---


Let me know if you need any further modifications!

### Setup Instructions

1. Backend Setup:
bash
cd backend
npm install
npm start
Server will run on http://localhost:3000

2. Frontend Setup:
bash
cd frontend
npm install
ng serve

Application will run on http://localhost:4200

### REST API Endpoints Documentation

 1. Get All Employees
- Endpoint: `GET /api/employees`
- Description: Retrieves a list of all employees
- Response Format:
json

  {
  json:
     "_id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "department": "string",
    "position": "string",
    "profile": "string (optional)"
  }


#### 2. Get Single Employee
- Endpoint: `GET /api/employees/:id`
- Description: Retrieves details of a specific employee
- Parameters:`id` - Employee ID
- Response Format:
json
{
  "_id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "department": "string",
  "position": "string",
  "profile": "string (optional)"
}
```

#### 3. Create Employee
- Endpoint: `POST /api/employees`
- Description: Creates a new employee
- Request Format
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "department": "string",
  "position": "string"
}


- Endpoint:`PUT /api/employees/:id`
- Description:Updates an existing employee
- Parameters: `id` - Employee ID
- Request Format:
 json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "department": "string",
  "position": "string"
}
```
- Additional: Supports file upload for profile picture using multipart/form-data

#### 5. Delete Employee
- Endpoint: `DELETE /api/employees/:id`
- Description: Deletes an employee
- Parameters: `id` - Employee ID
- Response Format:
  json
{
  "message": "Employee deleted successfully"
}


#### 6. Search Employees
- **Endpoint:** `GET /api/employees/search`
- **Description:** Searches employees by name, department, or position
- **Query Parameters:** `term` - Search term
- **Example:** `GET /api/employees/search?term=developer`
- **Response Format:**
```json
[
  {
    "_id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "department": "string",
    "position": "string",
    "profile": "string (optional)"
  }
]


### Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 201: Created successfully
- 404: Resource not found
- 500: Server error

Error responses follow this format:
json
{
  "error": "Error message description"
}


### Database Schema

Employee Schema:
javascript
{
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
  profile: { type: String }
}


### Testing Instructions

1. Start MongoDB service
2. Start the backend server
3. Start the frontend application
4. Test the following functionalities:
   - Create a new employee
   - View all employees
   - View single employee details
   - Update employee information
   - Delete an employee
   - Search employees by term
   - Upload and view profile pictures



### Additional Notes

- The application uses Angular Material for UI components
- File uploads are stored in the `uploads` directory
- CORS is enabled for localhost development
- Error handling is implemented for all endpoints
- The frontend implements responsive design 

