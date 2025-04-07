<<<<<<< HEAD
# 101414516__comp3133_assignment2
=======
# COMP3133 Full Stack Development - Assignment
Student ID: 101414516
Student Name: [Your Name]

## Employee Management System

This project consists of a REST API backend built with Node.js/Express and a frontend built with Angular.

### Technologies Used
- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT for authentication
  - Multer for file uploads
- Frontend:
  - Angular 17
  - Angular Material
  - RxJS

### Setup Instructions

1. Backend Setup:
```bash
cd backend
npm install
npm start
```
Server will run on http://localhost:3000

2. Frontend Setup:
```bash
cd frontend
npm install
ng serve
```
Application will run on http://localhost:4200

### REST API Endpoints Documentation

#### 1. Get All Employees
- **Endpoint:** `GET /api/employees`
- **Description:** Retrieves a list of all employees
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
```

#### 2. Get Single Employee
- **Endpoint:** `GET /api/employees/:id`
- **Description:** Retrieves details of a specific employee
- **Parameters:** `id` - Employee ID
- **Response Format:**
```json
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
- **Endpoint:** `POST /api/employees`
- **Description:** Creates a new employee
- **Request Format:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "department": "string",
  "position": "string"
}
```
- **Additional:** Supports file upload for profile picture using multipart/form-data

#### 4. Update Employee
- **Endpoint:** `PUT /api/employees/:id`
- **Description:** Updates an existing employee
- **Parameters:** `id` - Employee ID
- **Request Format:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "department": "string",
  "position": "string"
}
```
- **Additional:** Supports file upload for profile picture using multipart/form-data

#### 5. Delete Employee
- **Endpoint:** `DELETE /api/employees/:id`
- **Description:** Deletes an employee
- **Parameters:** `id` - Employee ID
- **Response Format:**
```json
{
  "message": "Employee deleted successfully"
}
```

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
```

### Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 201: Created successfully
- 404: Resource not found
- 500: Server error

Error responses follow this format:
```json
{
  "error": "Error message description"
}
```

### Database Schema

Employee Schema:
```javascript
{
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
  profile: { type: String }
}
```

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

### Screenshots

[Include screenshots of your application here]

### Additional Notes

- The application uses Angular Material for UI components
- File uploads are stored in the `uploads` directory
- CORS is enabled for localhost development
- Error handling is implemented for all endpoints
- The frontend implements responsive design 
>>>>>>> d54861c (First commit)
