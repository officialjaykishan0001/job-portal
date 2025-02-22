# Backend API Documentation

## Endpoint: /api/v1/user/

### Description
The `/user` endpoint provides functionalities related to user authentication and profile management. This includes registering new users, logging in, fetching user profiles, updating user information, and logging out.

---

## 1. Register User

### HTTP Method: **POST**

### URL: `/api/v1/user/register`

### Description:
This endpoint is used to register a new user. It validates input data, hashes the password, uploads a profile image to Cloudinary, and stores the user in the database.

#### Request Body:
```json
{
    "fullname": "John Doe",
    "email": "johndoe@example.com",
    "phoneNumber": "1234567890",
    "password": "yourpassword",
    "role": "student_OR_recruiter"
}
```

#### File Upload:
- **profilePhoto** (optional): Image file for the user's profile picture.

#### Success Response:
**HTTP Status Code: 201**
```json
{
    "success": true,
    "user": {
        "_id": "<USER_ID>",
        "fullname": "John Doe",
        "email": "johndoe@example.com",
        "phoneNumber": "1234567890",
        "role": "student",
        "profile": {
            "profilePhoto": "<Cloudinary_URL>"
        }
    },
    "message": "Account created successfully"
}
```

#### Cookies Set:
- `token`: Stores the JWT token for authentication.

#### Error Responses:
**HTTP Status Code: 400** (Validation Error)
```json
{
    "success": false,
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        }
    ]
}
```

---

## 2. User Login

### HTTP Method: **POST**

### URL: `/api/v1/user/login`

### Description:
This endpoint authenticates users by verifying their email, password, and role, and then returns a JWT token stored in a cookie.

#### Request Body:
```json
{
    "email": "johndoe@example.com",
    "password": "yourpassword",
    "role": "student_OR_recruiter"
}
```

#### Success Response:
**HTTP Status Code: 200**
```json
{
    "success": true,
    "user": {
        "_id": "<USER_ID>",
        "fullname": "John Doe",
        "email": "johndoe@example.com",
        "role": "student"
    },
    "message": "Welcome back John Doe"
}
```

#### Cookies Set:
- `token`: Stores the JWT token for authentication.

#### Error Responses:
**HTTP Status Code: 400** (Invalid Credentials or Role Mismatch)
```json
{
    "success": false,
    "message": "Incorrect email or password"
}
```

---

## 3. Logout User

### HTTP Method: **GET**

### URL: `/api/v1/user/logout`

### Description:
Clears the authentication token by expiring the cookie.

#### Success Response:
**HTTP Status Code: 200**
```json
{
    "success": true,
    "message": "Logged out successfully."
}
```

#### Cookies Cleared:
- `token`: Removed from the client.

---

## 4. Fetch User Profile

### HTTP Method: **GET**

### URL: `/api/v1/user/profile`

### Description:
Fetches the profile details of the authenticated user.

#### Headers:
```json
{
    "Authorization": "Bearer <JWT_TOKEN>"
}
```

#### Success Response:
**HTTP Status Code: 200**
```json
{
    "success": true,
    "_id": "<USER_ID>",
    "fullname": "John Doe",
    "email": "johndoe@example.com",
    "phoneNumber": "1234567890",
    "role": "student"
}
```

#### Error Responses:
**HTTP Status Code: 403** (Unauthorized Access)
```json
{
    "success": false,
    "message": "Access denied. No token provided."
}
```

---

## 5. Update User Profile

### HTTP Method: **POST**

### URL: `/api/v1/user/profile/update`

### Description:
Updates user profile information, including bio, skills, and resume upload.

#### Headers:
```json
{
    "Authorization": "Bearer <JWT_TOKEN>"
}
```

#### Request Body:
```json
{
    "fullname": "John Doe",
    "phoneNumber": "9876543210",
    "bio": "Software Engineer with 5 years experience",
    "skills": "JavaScript, React, Node.js"
}
```

#### File Upload:
- **resume** (optional): PDF file containing the user's resume.

#### Success Response:
**HTTP Status Code: 200**
```json
{
    "success": true,
    "message": "Profile updated successfully",
    "user": {
        "_id": "<USER_ID>",
        "fullname": "John Doe",
        "phoneNumber": "9876543210",
        "bio": "Software Engineer with 5 years experience",
        "skills": ["JavaScript", "React", "Node.js"],
        "profile": {
            "resume": "<Cloudinary_URL>",
            "resumeOriginalName": "resume.pdf"
        }
    }
}
```

#### Error Responses:
**HTTP Status Code: 400** (Validation Error)
```json
{
    "success": false,
    "message": "Invalid data provided"
}
```

---


## Endpoint: /api/v1/company/

### Description
The `/company` endpoint provides functionalities for company registration, retrieval, and updates. Only authenticated users can manage company-related data.

---

## 1. Register Company

### HTTP Method: **POST**

### URL: `/api/v1/company/register`

### Description:
This endpoint allows authenticated users to register a new company.

#### Headers:
```json
{
    "Authorization": "Bearer <JWT_TOKEN>"
}
```

#### Request Body:
```json
{
    "name": "Tech Corp",
    "description": "A leading tech solutions provider",
    "website": "https://techcorp.com",
    "location": "San Francisco, CA"
}
```

#### Success Response:
**HTTP Status Code: 201**
```json
{
    "success": true,
    "message": "Company registered successfully.",
    "company": {
        "_id": "<COMPANY_ID>",
        "name": "Tech Corp",
        "description": "A leading tech solutions provider",
        "website": "https://techcorp.com",
        "location": "San Francisco, CA",
        "logo": "",
        "userId": "<USER_ID>",
        "createdAt": "2025-02-22T12:00:00Z",
        "updatedAt": "2025-02-22T12:00:00Z"
    }
}
```

#### Error Responses:
**HTTP Status Code: 400** (Company already exists)
```json
{
    "success": false,
    "message": "You can't register the same company."
}
```

---

## 2. Get All Companies of a User

### HTTP Method: **GET**

### URL: `/api/v1/company/get`

### Description:
Retrieves all companies registered by the authenticated user.

#### Headers:
```json
{
    "Authorization": "Bearer <JWT_TOKEN>"
}
```

#### Success Response:
**HTTP Status Code: 200**
```json
{
    "success": true,
    "companies": [
        {
            "_id": "<COMPANY_ID>",
            "name": "Tech Corp",
            "description": "A leading tech solutions provider",
            "website": "https://techcorp.com",
            "location": "San Francisco, CA",
            "logo": "<Cloudinary_URL>",
            "userId": "<USER_ID>",
            "createdAt": "2025-02-22T12:00:00Z",
            "updatedAt": "2025-02-22T12:00:00Z"
        }
    ]
}
```

#### Error Responses:
**HTTP Status Code: 404** (No companies found)
```json
{
    "success": false,
    "message": "Companies not found."
}
```

---

## 3. Get Company By ID

### HTTP Method: **GET**

### URL: `/api/v1/company/get/:id`

### Description:
Retrieves details of a specific company by its ID.

#### Headers:
```json
{
    "Authorization": "Bearer <JWT_TOKEN>"
}
```

#### Success Response:
**HTTP Status Code: 200**
```json
{
    "success": true,
    "company": {
        "_id": "<COMPANY_ID>",
        "name": "Tech Corp",
        "description": "A leading tech solutions provider",
        "website": "https://techcorp.com",
        "location": "San Francisco, CA",
        "logo": "<Cloudinary_URL>",
        "userId": "<USER_ID>",
        "createdAt": "2025-02-22T12:00:00Z",
        "updatedAt": "2025-02-22T12:00:00Z"
    }
}
```

#### Error Responses:
**HTTP Status Code: 404** (Company not found)
```json
{
    "success": false,
    "message": "Company not found."
}
```

---

## 4. Update Company Information

### HTTP Method: **PUT**

### URL: `/api/v1/company/update/:id`

### Description:
Allows an authenticated user to update company details, including uploading a new logo.

#### Headers:
```json
{
    "Authorization": "Bearer <JWT_TOKEN>"
}
```

#### Request Body:
```json
{
    "name": "Tech Corp",
    "description": "An updated tech solutions provider",
    "website": "https://techcorp.com",
    "location": "New York, NY"
}
```

#### File Upload:
- **logo** (optional): Image file for the company logo.

#### Success Response:
**HTTP Status Code: 200**
```json
{
    "success": true,
    "message": "Company information updated"
}
```

#### Error Responses:
**HTTP Status Code: 404** (Company not found)
```json
{
    "success": false,
    "message": "Company not found."
}
```

---

## Endpoint: /api/v1/job/

### Description
The `/job` endpoint provides functionalities for job posting, retrieval, and filtering. Only authenticated users can create and manage job postings.

---

## 1. Post a New Job

### HTTP Method: **POST**

### URL: `/api/v1/job/post`

### Description:
This endpoint allows authenticated users to post a new job listing.

#### Headers:
```json
{
    "Authorization": "Bearer <JWT_TOKEN>"
}
```

#### Request Body:
```json
{
    "title": "Software Engineer",
    "description": "We are looking for a skilled software engineer.",
    "requirements": "JavaScript, React, Node.js",
    "salary": 80000,
    "experience": 2,
    "location": "San Francisco, CA",
    "jobType": "Full-time",
    "position": 1,
    "companyId": "<COMPANY_ID>"
}
```

#### Success Response:
**HTTP Status Code: 201**
```json
{
    "success": true,
    "message": "New job created successfully.",
    "job": {
        "_id": "<JOB_ID>",
        "title": "Software Engineer",
        "description": "We are looking for a skilled software engineer.",
        "requirements": ["JavaScript", "React", "Node.js"],
        "salary": 80000,
        "experienceLevel": 2,
        "location": "San Francisco, CA",
        "jobType": "Full-time",
        "position": 1,
        "company": "<COMPANY_ID>",
        "created_by": "<USER_ID>",
        "createdAt": "2025-02-22T12:00:00Z",
        "updatedAt": "2025-02-22T12:00:00Z"
    }
}
```

#### Error Responses:
**HTTP Status Code: 400** (Missing Fields)
```json
{
    "success": false,
    "message": "Something missing."
}
```

---

## 2. Get All Jobs

### HTTP Method: **GET**

### URL: `/api/v1/job/get`

### Description:
Retrieves all job listings with optional keyword search.

#### Headers:
```json
{
    "Authorization": "Bearer <JWT_TOKEN>"
}
```

#### Query Parameters:
- `keyword` (optional): Search term for job title or description.

#### Success Response:
**HTTP Status Code: 200**
```json
{
    "success": true,
    "jobs": [
        {
            "_id": "<JOB_ID>",
            "title": "Software Engineer",
            "description": "We are looking for a skilled software engineer.",
            "requirements": ["JavaScript", "React", "Node.js"],
            "salary": 80000,
            "experienceLevel": 2,
            "location": "San Francisco, CA",
            "jobType": "Full-time",
            "position": 1,
            "company": "<COMPANY_ID>",
            "created_by": "<USER_ID>",
            "createdAt": "2025-02-22T12:00:00Z",
            "updatedAt": "2025-02-22T12:00:00Z"
        }
    ]
}
```

#### Error Responses:
**HTTP Status Code: 404** (No Jobs Found)
```json
{
    "success": false,
    "message": "Jobs not found."
}
```

---

## 3. Get Job by ID

### HTTP Method: **GET**

### URL: `/api/v1/job/get/:id`

### Description:
Retrieves details of a specific job by its ID.

#### Headers:
```json
{
    "Authorization": "Bearer <JWT_TOKEN>"
}
```

#### Success Response:
**HTTP Status Code: 200**
```json
{
    "success": true,
    "job": {
        "_id": "<JOB_ID>",
        "title": "Software Engineer",
        "description": "We are looking for a skilled software engineer.",
        "requirements": ["JavaScript", "React", "Node.js"],
        "salary": 80000,
        "experienceLevel": 2,
        "location": "San Francisco, CA",
        "jobType": "Full-time",
        "position": 1,
        "company": "<COMPANY_ID>",
        "created_by": "<USER_ID>",
        "applications": [],
        "createdAt": "2025-02-22T12:00:00Z",
        "updatedAt": "2025-02-22T12:00:00Z"
    }
}
```

#### Error Responses:
**HTTP Status Code: 404** (Job Not Found)
```json
{
    "success": false,
    "message": "Job not found."
}
```

---

## 4. Get Jobs Created by Admin

### HTTP Method: **GET**

### URL: `/api/v1/job/getadminjobs`

### Description:
Retrieves all job listings created by the authenticated admin user.

#### Headers:
```json
{
    "Authorization": "Bearer <JWT_TOKEN>"
}
```

#### Success Response:
**HTTP Status Code: 200**
```json
{
    "success": true,
    "jobs": [
        {
            "_id": "<JOB_ID>",
            "title": "Software Engineer",
            "company": "<COMPANY_ID>",
            "created_by": "<USER_ID>",
            "createdAt": "2025-02-22T12:00:00Z",
            "updatedAt": "2025-02-22T12:00:00Z"
        }
    ]
}
```

#### Error Responses:
**HTTP Status Code: 404** (No Jobs Found)
```json
{
    "success": false,
    "message": "Jobs not found."
}
```

---

## Endpoint: /api/v1/application/

### Description
The `/application` endpoint provides functionalities for job applications, including applying for a job, retrieving applied jobs, fetching job applicants, and updating application statuses. Only authenticated users can apply and manage job applications.

---

## 1. Apply for a Job

### HTTP Method: **GET**

### URL: `/api/v1/application/apply/:id`

### Description:
This endpoint allows authenticated users to apply for a job.

#### Headers:
```json
{
    "Authorization": "Bearer <JWT_TOKEN>"
}
```

#### URL Parameters:
- `id` (required): The Job ID the user wants to apply for.

#### Success Response:
**HTTP Status Code: 201**
```json
{
    "success": true,
    "message": "Job applied successfully"
}
```

#### Error Responses:
**HTTP Status Code: 400** (Already Applied or Missing Job ID)
```json
{
    "success": false,
    "message": "You have already applied for this job"
}
```

**HTTP Status Code: 404** (Job Not Found)
```json
{
    "success": false,
    "message": "Job not found"
}
```

---

## 2. Get Applied Jobs

### HTTP Method: **GET**

### URL: `/api/v1/application/get`

### Description:
Retrieves all jobs the authenticated user has applied for.

#### Headers:
```json
{
    "Authorization": "Bearer <JWT_TOKEN>"
}
```

#### Success Response:
**HTTP Status Code: 200**
```json
{
    "success": true,
    "application": [
        {
            "_id": "<APPLICATION_ID>",
            "job": {
                "_id": "<JOB_ID>",
                "title": "Software Engineer",
                "company": "<COMPANY_ID>",
                "location": "San Francisco, CA"
            },
            "status": "pending",
            "createdAt": "2025-02-22T12:00:00Z"
        }
    ]
}
```

#### Error Responses:
**HTTP Status Code: 404** (No Applications Found)
```json
{
    "success": false,
    "message": "No applications"
}
```

---

## 3. Get Job Applicants

### HTTP Method: **GET**

### URL: `/api/v1/application/:id/applicants`

### Description:
Retrieves all applicants for a specific job posting.

#### Headers:
```json
{
    "Authorization": "Bearer <JWT_TOKEN>"
}
```

#### URL Parameters:
- `id` (required): The Job ID for which applicants are retrieved.

#### Success Response:
**HTTP Status Code: 200**
```json
{
    "success": true,
    "job": {
        "_id": "<JOB_ID>",
        "title": "Software Engineer",
        "applications": [
            {
                "_id": "<APPLICATION_ID>",
                "applicant": {
                    "_id": "<USER_ID>",
                    "name": "John Doe",
                    "email": "johndoe@example.com"
                },
                "status": "pending",
                "createdAt": "2025-02-22T12:00:00Z"
            }
        ]
    }
}
```

#### Error Responses:
**HTTP Status Code: 404** (Job Not Found)
```json
{
    "success": false,
    "message": "Job not found"
}
```

---

## 4. Update Application Status

### HTTP Method: **POST**

### URL: `/api/v1/application/status/:id/update`

### Description:
Allows an authenticated employer to update the status of a job application.

#### Headers:
```json
{
    "Authorization": "Bearer <JWT_TOKEN>"
}
```

#### URL Parameters:
- `id` (required): The Application ID to update.

#### Request Body:
```json
{
    "status": "accepted"
}
```

Accepted Values for `status`:
- `pending`
- `accepted`
- `rejected`

#### Success Response:
**HTTP Status Code: 200**
```json
{
    "success": true,
    "message": "Status updated successfully"
}
```

#### Error Responses:
**HTTP Status Code: 400** (Missing Status Field)
```json
{
    "success": false,
    "message": "Status is required"
}
```

**HTTP Status Code: 404** (Application Not Found)
```json
{
    "success": false,
    "message": "Application not found"
}
```

---
