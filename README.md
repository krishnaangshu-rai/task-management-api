# Task Management API

A simple RESTful API built using Node.js, Express.js, SQLite, and Sequelize.

This API allows users to create, view, update, and delete tasks.

## Technologies Used

- Node.js
- Express.js
- SQLite
- Sequelize ORM
- Postman (API Testing)

## Project Structure

task-management-api/
│
├── models/
│ └── task.js
│
├── routes/
│ └── taskRoutes.js
│
├── database.js
├── server.js
├── package.json
└── README.md

## Installation and Setup

### 1. Clone the repository

git clone https://github.com/krishnaangshu-rai/task-management-api.git

### 2. Navigate to the project folder

cd task-management-api

### 3. Install dependencies

npm install

### 4. Start the server

node server.js

## API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint   | Description         |
| ------ | ---------- | ------------------- |
| GET    | /tasks     | Get all tasks       |
| GET    | /tasks/:id | Get a specific task |
| POST   | /tasks     | Create a new task   |
| PATCH  | /tasks/:id | Update a task       |
| DELETE | /tasks/:id | Delete a task       |

### Create a Task

POST /tasks

Request Body:

{
"name": "Learn Backend"
}

## Sample Responses

### Successful Task Creation (201 Created)

{
"id": 1,
"name": "Learn Backend",
"completed": false,
"createdAt": "2026-11-18T05:07:09.868Z",
"updatedAt": "2026-11-18T05:07:09.868Z"
}

### Successful Task Deletion (200 OK)

{
"message": "Task deleted successfully."
}

## Error Handling

The API handles common errors:

- 400 Bad Request - Invalid input data.
- 404 Not Found - Task does not exist.
- 500 Internal Server Error - Unexpected server error.
