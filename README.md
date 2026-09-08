# Mini Task Board
 
A simple full-stack task management application built with Next.js, TypeScript, React, Node.js, Express, and MySQL.
 
The application allows users to create tasks, assign them a status, update task statuses, and delete tasks. Tasks are persisted in a MySQL database through a REST API.
 
## Features
 
- View all tasks
- Create a new task
- Select a task status while creating a task
- Update task status
- Delete tasks
- Prevent empty task titles
- Loading state while fetching tasks
- Error handling for failed API requests
- Persistent data using MySQL
- RESTful Express API
- TypeScript throughout the frontend and backend
- Parameterized SQL queries for database operations
- Responsive and simple task-board interface
## Tech Stack
 
### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
### Backend
- Node.js
- Express
- TypeScript
### Database
- MySQL
- mysql2
## Project Structure
 
```
mini-task-board/
│
├── client/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── TaskCard.tsx
│   │   ├── TaskColumn.tsx
│   │   └── TaskForm.tsx
│   │
│   └── lib/
│       ├── api.ts
│       └── types/
│           └── task.ts
│
├── server/
│   ├── .env.example
│   └── src/
│       ├── config/
│       │   └── db.ts
│       ├── controllers/
│       │   └── task.controller.ts
│       ├── routes/
│       │   └── task.routes.ts
│       ├── app.ts
│       └── server.ts
│
├── database/
│   └── schema.sql
│
├── .gitignore
└── README.md
```
 
## Architecture
 
The project is separated into three main layers:
 
```
Next.js Frontend
       │
       │ HTTP / REST API
       ▼
Express Backend
       │
       │ Parameterized SQL Queries
       ▼
MySQL Database
```
 
### Why a separate Express server?
 
A separate Express backend was chosen instead of Next.js API routes to keep frontend and backend responsibilities clearly separated.
 
The Next.js application handles the user interface and client-side interactions, while Express handles the REST API and database operations.
 
This also keeps the backend independently usable and makes the API layer easier to extend in the future.
 
## Task Statuses
 
Tasks can have one of three statuses:
 
- `todo`
- `in-progress`
- `done`
The UI represents these statuses as three task columns:
 
- Todo
- In Progress
- Done
## API Endpoints
 
The backend runs on:
 
```
http://localhost:5000
```
 
### Get all tasks
 
```
GET /api/tasks
```
 
Returns all tasks ordered by creation date.
 
### Get a task by ID
 
```
GET /api/tasks/:id
```
 
Example:
 
```
GET /api/tasks/1
```
 
Returns the requested task or a 404 response if it does not exist.
 
### Create a task
 
```
POST /api/tasks
```
 
Request body:
 
```json
{
  "title": "Learn TypeScript",
  "status": "todo"
}
```
 
`status` defaults to `todo` when it is not provided.
 
### Update a task
 
```
PUT /api/tasks/:id
```
 
Request body:
 
```json
{
  "title": "Learn TypeScript",
  "status": "in-progress"
}
```
 
### Delete a task
 
```
DELETE /api/tasks/:id
```
 
Example:
 
```
DELETE /api/tasks/1
```
 
## Database
 
The application uses MySQL for persistent task storage.
 
The database contains a single `tasks` table with the following fields:
 
| Column | Description |
|---|---|
| id | Unique task identifier |
| title | Task title |
| status | Current task status |
| created_at | Task creation timestamp |
 
The database schema is provided in:
 
```
database/schema.sql
```
 
## Environment Variables
 
The backend uses environment variables for MySQL configuration.
 
A template is provided at:
 
```
server/.env.example
```
 
The example file contains the required variable names without any private credentials.
 
Create a local `.env` file inside the `server` directory and configure it using your local MySQL credentials.
 
Example:
 
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=mini_task_board
```
 
Replace `your_mysql_password` with your local MySQL password.
 
Do not commit your `.env` file or database credentials to the repository.
 
## Getting Started
 
### Prerequisites
 
Make sure the following are installed:
 
- Node.js
- npm
- MySQL
### 1. Clone the repository
 
```bash
git clone <your-github-repository-url>
cd mini-task-board
```
 
### 2. Set up the database
 
Create the MySQL database:
 
```sql
CREATE DATABASE mini_task_board;
```
 
Then execute:
 
```
database/schema.sql
```
 
This creates the required `tasks` table.
 
### 3. Configure and start the backend
 
Navigate to the server:
 
```bash
cd server
```
 
Install dependencies:
 
```bash
npm install
```
 
Create a `.env` file based on `.env.example` and configure your local MySQL credentials.
 
Start the backend in development mode:
 
```bash
npm run dev
```
 
The API will be available at:
 
```
http://localhost:5000
```
 
For a production build:
 
```bash
npm run build
npm start
```
 
### 4. Start the frontend
 
Open another terminal and navigate to the client:
 
```bash
cd client
```
 
Install dependencies:
 
```bash
npm install
```
 
Start the Next.js development server:
 
```bash
npm run dev
```
 
The frontend will be available at:
 
```
http://localhost:3000
```
 
## Validation and Error Handling
 
The application handles basic error cases on both the frontend and backend.
 
### Frontend
- Empty task titles are prevented.
- A loading state is displayed while tasks are being fetched.
- API errors are displayed to the user.
- Task actions are handled through the backend API.

### Backend
- Empty task titles return a 400 response.
- Requests for non-existent tasks return 404.
- Database/API failures return appropriate 500 responses.
- Database queries use parameterized values instead of string concatenation.

## TypeScript
 
TypeScript is used across the application with strict type checking.
 
Task-related types include:
 
- Task
- Task status
- Create task request
- Update task request
- Route parameters
The frontend and backend maintain corresponding task types so that the expected API data structure remains clear.
 
## SQL Safety
 
All database operations use parameterized SQL queries.
 
User-provided values are passed separately from SQL statements rather than being concatenated directly into queries. This helps reduce the risk of SQL injection.
 
## Future Improvements
 
With additional development time, the application could be extended with:
 
- Optimistic UI updates
- More comprehensive runtime request validation
- Automated frontend and backend tests
- Authentication and user-specific tasks
- Task editing
- Task search and filtering
- Pagination for larger task lists
- More detailed responsive and accessibility improvements

## Development
 
The project was developed incrementally, with separate changes for the database, backend API, and frontend task board.
 
The REST API was tested using CRUD operations before integrating the frontend.