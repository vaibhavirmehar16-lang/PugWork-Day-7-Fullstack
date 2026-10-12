# PugWork — Full-Stack Workforce Management System

A modern full-stack employee and workforce management application built with Next.js, React, TypeScript, Node.js, and Express. The platform provides an organized interface for managing employee records, viewing workforce statistics, searching employees, and performing employee CRUD operations through a REST API.

## 1. Project Overview

**PugWork** is a full-stack workforce management system developed as part of the PugArch Technology technical training program.

The application combines a responsive frontend with a RESTful backend to simplify employee record management. It demonstrates full-stack development concepts, API integration, data validation, authentication middleware, error handling, and modular application architecture.

The project is divided into two main components:

- **Frontend:** A Next.js application that provides the user interface for employee management.
- **Backend:** A Node.js and Express REST API that handles employee operations, validation, and request processing.

## 2. Problem Statement

Managing employee information manually can make it difficult to maintain organized records, find specific employees, monitor workforce statistics, and update employee details efficiently.

PugWork addresses these challenges by providing a centralized digital interface for employee management. It allows users to view employee records, search and filter the workforce, create new employee entries, update existing records, and remove employee records through a structured application workflow.

The project also demonstrates how frontend and backend applications communicate through REST APIs.

## 3. Features

### Employee Management
- View employee records in an organized interface.
- Add new employees with relevant employment details.
- Update existing employee information.
- Delete employee records.
- View individual employee details.

### Search and Filtering
- Search employee records using supported search fields.
- Filter employees by department.
- Filter workforce records by employment status through the API.

### Workforce Overview
- Display workforce statistics through dashboard components.
- View employee directory information.
- Present team and budget-related information through dedicated UI components.

### Backend and API
- RESTful API built using Node.js and Express.
- Versioned API endpoints under `/api/v1`.
- API key authentication middleware for employee create, update, and delete operations.
- Request validation using Zod schemas.
- Centralized error-handling middleware.
- Consistent API response utilities.
- Configurable CORS settings.
- Health-check endpoint for basic API status monitoring.

### Developer Experience
- TypeScript for type safety.
- Modular frontend and backend structure.
- Environment-based configuration.
- Separate development and production commands.
- Reusable React components.

## 4. Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | Frontend framework |
| React 19 | User interface |
| TypeScript | Type-safe application development |
| Node.js | Backend JavaScript runtime |
| Express.js | REST API development |
| Zod | Request data validation |
| Lucide React | Interface icons |
| dotenv | Environment variable management |
| CORS | Cross-origin request configuration |
| npm | Package management |

## 5. System Architecture

The application follows a modular frontend-backend architecture.

```text
                 USER
                   |
                   v
       +------------------------+
       | Next.js Frontend       |
       | React + TypeScript     |
       | Employee Dashboard     |
       +------------------------+
                   |
                   | HTTP Requests
                   | JSON Responses
                   v
       +------------------------+
       | Express REST API       |
       | /api/v1                |
       +------------------------+
                   |
                   v
       +------------------------+
       | API Routes             |
       +------------------------+
                   |
                   v
       +------------------------+
       | Authentication        |
       | Validation Middleware  |
       +------------------------+
                   |
                   v
       +------------------------+
       | Controllers            |
       +------------------------+
                   |
                   v
       +------------------------+
       | Employee Service       |
       | In-Memory Data Store   |
       +------------------------+
```

### Frontend Architecture

The frontend is located in the `nextjs-app/` directory.

It uses Next.js App Router pages and reusable React components to present employee records, forms, navigation, and workforce statistics.

The API utility module in `lib/api.ts` manages requests to the backend.

### Backend Architecture

The backend is located in the `node-api/` directory.

Its main layers include:

- **Routes:** Define API endpoints.
- **Middleware:** Handle API key authentication, request validation, and errors.
- **Controllers:** Process incoming requests and coordinate application operations.
- **Services:** Implement employee management operations.
- **Models:** Define employee types and Zod validation schemas.
- **Utilities:** Provide standardized API responses and logging.

## 6. Database Design

### Current Data Storage

The current implementation uses an **in-memory employee data store** inside the employee service. It does not currently use a persistent database such as MySQL, PostgreSQL, or MongoDB.

The employee records are stored in an array while the backend process is running. Consequently, newly created, updated, or deleted records are not guaranteed to persist after the server restarts.

### Employee Data Model

| Field | Data Type | Description |
|---|---|---|
| `id` | String | Employee identifier |
| `name` | String | Employee full name |
| `email` | String | Employee email address |
| `role` | String | Job role |
| `department` | String | Employee department |
| `status` | String | Employment status |
| `salary` | Number | Employee salary |
| `joinDate` | String | Employment joining date |
| `createdAt` | String | Record creation timestamp |
| `updatedAt` | String | Last update timestamp |

### Supported Departments

- Engineering
- Product
- Design
- HR
- Marketing

### Employment Status Values

- Active
- On Leave
- Inactive

### Validation Rules

The backend uses Zod schemas to validate employee data. These include minimum name and role lengths, valid email addresses, supported department and status values, positive salary values, and the expected `YYYY-MM-DD` format for joining dates.

## 7. API Documentation

### Base URL

For local development:

```text
http://localhost:5000/api/v1
```

### Available Endpoints

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/health` | Check API health | Not required |
| GET | `/employees` | Retrieve employee records | Not required |
| GET | `/employees/:id` | Retrieve an employee by ID | Not required |
| POST | `/employees` | Create an employee | Required |
| PUT | `/employees/:id` | Update an employee | Required |
| DELETE | `/employees/:id` | Delete an employee | Required |

### Authentication

Employee create, update, and delete operations require a Bearer token in the `Authorization` header.

Example:

```http
Authorization: Bearer YOUR_API_SECRET_KEY
Content-Type: application/json
```

Use the API secret configured in the backend environment. Do not publish real credentials in the repository.

### Example: Create an Employee

**Request**

```http
POST /api/v1/employees
Content-Type: application/json
Authorization: Bearer YOUR_API_SECRET_KEY
```

**Request Body**

```json
{
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "role": "Software Engineer",
  "department": "Engineering",
  "status": "Active",
  "salary": 65000,
  "joinDate": "2026-01-15"
}
```

**Expected Behavior**

The API validates the request, creates an employee record, and returns a structured response containing the created employee.

The actual HTTP status and response message depend on the result of the request.

### Example: Retrieve Employees

```http
GET /api/v1/employees
```

The API returns employee records in a structured JSON response.

Search and filtering parameters supported by the backend include:

- `search`
- `department`
- `status`

Example:

```text
GET /api/v1/employees?department=Engineering&status=Active
```

### Example: Update an Employee

```http
PUT /api/v1/employees/EMP-1001
```

Include the required Bearer token and a JSON body containing the fields to update.

### Example: Delete an Employee

```http
DELETE /api/v1/employees/EMP-1001
```

Include the required Bearer token in the request header.

### Error Handling

The API uses standardized response utilities and centralized error handling. Possible errors include invalid input, missing employee records, duplicate email addresses, and missing or invalid API credentials.

## 8. Project Structure

```text
PugWork-Day7-Fullstack/
|
|-- nextjs-app/
|   |-- app/
|   |   |-- employees/
|   |   |   |-- create/
|   |   |   |-- [id]/
|   |   |   |   |-- edit/
|   |   |-- login/
|   |   |-- layout.tsx
|   |   |-- page.tsx
|   |
|   |-- components/
|   |   |-- DirectoryView.tsx
|   |   |-- EmployeeForm.tsx
|   |   |-- Navbar.tsx
|   |   |-- StatsOverview.tsx
|   |   |-- TeamBudgetMeter.tsx
|   |
|   |-- lib/
|   |   |-- api.ts
|   |
|   |-- types/
|   |   |-- index.ts
|   |
|   |-- .env.local.example
|   |-- package.json
|
|-- node-api/
|   |-- src/
|   |   |-- controllers/
|   |   |-- middleware/
|   |   |-- models/
|   |   |-- routes/
|   |   |-- services/
|   |   |-- utils/
|   |   |-- app.ts
|   |   |-- server.ts
|   |
|   |-- .env.example
|   |-- package.json
|
|-- README.md
```

## 9. Installation

### Prerequisites

Install the following before running the project:

- Node.js (preferably Node.js 20 or later)
- npm
- Git
- Visual Studio Code or another code editor

Verify the installations:

```bash
node --version
npm --version
git --version
```

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd PugWork-Day7-Fullstack
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### Step 2: Install Backend Dependencies

Open a terminal in the project root and run:

```bash
cd node-api
npm install
```

### Step 3: Configure Backend Environment Variables

Create a `.env` file inside `node-api/` using `.env.example` as a reference.

Configure the following variables:

```env
PORT=5000
NODE_ENV=development
API_SECRET_KEY=replace_with_a_strong_random_secret
CORS_ORIGIN=http://localhost:3000
```

Use the same API secret in the frontend configuration if the current frontend authentication approach requires it.

### Step 4: Install Frontend Dependencies

Open another terminal from the project root:

```bash
cd nextjs-app
npm install
```

### Step 5: Configure Frontend Environment Variables

Create `.env.local` inside `nextjs-app/` using `.env.local.example` as a reference.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_API_KEY=replace_with_the_same_api_secret
```

**Security note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to browser-side code. Therefore, this configuration is suitable only for a development demonstration, not for protecting production API credentials. A production deployment should keep secrets on the server and use secure authentication.

## 10. Environment Variables

### Backend Variables

| Variable | Purpose | Example |
|---|---|---|
| `PORT` | Backend server port | `5000` |
| `NODE_ENV` | Runtime environment | `development` |
| `API_SECRET_KEY` | API authentication secret | A strong random secret |
| `CORS_ORIGIN` | Permitted frontend origin | `http://localhost:3000` |

### Frontend Variables

| Variable | Purpose | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000/api/v1` |
| `NEXT_PUBLIC_API_KEY` | Development API credential used by the current client | A matching development secret |

Never commit `.env`, `.env.local`, or real credentials to GitHub.

## 11. How to Run the Project

Start the backend and frontend in separate terminals.

### Terminal 1: Start the Backend

```bash
cd node-api
npm run dev
```

The API should start at:

```text
http://localhost:5000
```

Test the health endpoint in your browser:

```text
http://localhost:5000/api/v1/health
```

### Terminal 2: Start the Frontend

```bash
cd nextjs-app
npm run dev
```

Open the frontend in your browser:

```text
http://localhost:3000
```

### Production Build

To build the frontend:

```bash
cd nextjs-app
npm run build
npm run start
```

To compile and start the backend:

```bash
cd node-api
npm run build
npm start
```

Run the backend build before starting the compiled production server.

## 12. Screenshots

Add screenshots of the running application to a `screenshots/` directory in the repository.

Recommended screenshots:

1. Main workforce dashboard.
2. Employee directory.
3. Create employee form.
4. Employee details or edit screen.
5. Search and department filtering.
6. API health-check response.

After adding the corresponding image files, use Markdown to display them.

Example:

```markdown
![PugWork Dashboard](screenshots/dashboard.png)
![Employee Directory](screenshots/employee-directory.png)
![Create Employee](screenshots/create-employee.png)
```

Replace these example paths with the actual screenshot filenames available in your repository.

## 13. Challenges Faced

The project involves several common full-stack development challenges:

- Connecting the Next.js frontend to a separately running Express backend.
- Managing frontend and backend environment variables.
- Implementing authentication for employee modification endpoints.
- Validating incoming employee data consistently.
- Handling invalid requests and missing employee records.
- Configuring CORS for communication between different local development ports.
- Organizing code into reusable components and modular backend layers.
- Maintaining consistent API response formats.

## 14. Solutions Implemented

The following approaches are used in the current implementation:

- Created a dedicated frontend API utility module for backend communication.
- Separated backend routes, controllers, services, models, and middleware.
- Used Zod schemas to validate employee creation and update requests.
- Added API key authentication middleware to protected mutation endpoints.
- Configured CORS using an environment variable.
- Added centralized error handling and reusable API response utilities.
- Used TypeScript interfaces and types to improve code clarity and maintainability.
- Implemented an in-memory service layer to demonstrate employee CRUD workflows without requiring a database setup.

## 15. Future Improvements

Potential improvements for a production-ready version include:

- Integrate PostgreSQL, MySQL, or MongoDB for persistent storage.
- Replace the browser-exposed API key approach with secure server-side authentication.
- Implement role-based access control for administrators, HR staff, and employees.
- Add pagination, sorting, and advanced employee search.
- Introduce automated unit and integration tests.
- Add API documentation using Swagger/OpenAPI.
- Implement structured audit logs for employee changes.
- Add secure password hashing and session management if user accounts are introduced.
- Add Docker support for consistent development and deployment.
- Set up a CI/CD pipeline using GitHub Actions.
- Deploy the frontend and backend with separate production environment configurations.
- Add monitoring, request logging, and rate limiting.
- Improve accessibility, responsive design, and automated quality checks.

## 16. Learning Outcomes

This project demonstrates practical experience with:

- Full-stack application development.
- Next.js and React component architecture.
- TypeScript-based development.
- REST API design and integration.
- CRUD operations and data validation.
- Authentication middleware.
- Environment-based configuration.
- Error handling and modular software design.
- Local development and production build workflows.

## 17. Project Status

**Project:** PugWork — Full-Stack Workforce Management System  
**Training Program:** PugArch Technology Technical Training Program  
**Assignment:** Day 7 — Full-Stack Development  
**Frontend:** Next.js, React, TypeScript  
**Backend:** Node.js, Express, TypeScript  
**Storage:** In-memory employee data store  
**Status:** Development project

## 18. Author

Developed as part of the PugArch Technology technical training program to practice full-stack development, API design, validation, and employee management workflows.

