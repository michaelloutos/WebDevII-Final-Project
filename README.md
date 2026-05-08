
# MyCanvas

## Project Overview

MyCanvas is a full-stack MEAN web application designed to help students organize and manage their academic workload in one centralized platform. The application allows users to create, edit, track, and manage assignments and courses through an interactive dashboard.

This project was built using the MEAN stack (MongoDB, Express, Angular, and Node.js) while following a modular MVC architecture and implementing full CRUD functionality across the frontend, backend, and database.

# Features

- Create assignments and coursework tasks
- Edit and update assignment information
- Delete assignments and courses
- Track assignment completion status
- Organize assignments by course
- Responsive dashboard interface
- REST API integration
- MongoDB database storage
- Full-stack CRUD operations
- Deployed frontend and backend applications

# Technology Stack

## Frontend
- Angular
- TypeScript
- Angular Router
- Angular Services
- Angular HttpClient
- Observables
- FormsModule / ngModel

## Backend
- Node.js
- Express.js
- Native HTTP Server (`server.js`)
- REST API Architecture

## Database
- MongoDB
- Mongoose

## Deployment
- Vercel: https://web-dev-ii-final-project.vercel.app/
- Render: https://mycanvas-api.onrender.com

# Application Architecture

The application follows a modular MVC structure.

## Frontend Structure
- Components
- Services
- Interfaces
- Routing

## Backend Structure
- Models
- Controllers
- Routes
- server.js

# REST API Functionality

The backend implements full CRUD operations for application data.

## Assignment Routes
- `GET /assignments`
- `POST /assignments`
- `PUT /assignments/:id`
- `DELETE /assignments/:id`

## Course Routes
- `GET /courses`
- `POST /courses`
- `PUT /courses/:id`
- `DELETE /courses/:id`


# MongoDB Models

## Assignment Model
Stores:
- assignment title
- due date
- description
- completion status
- associated course

## Course Model
Stores:
- course name
- course category
- course color/tag

# Installation Instructions

## Clone Repository

```bash
git clone https://github.com/michaelloutos/WebDevII-Final-Project.git

```

## Backend Setup

```bash
cd server
npm install
npm run dev
```

## Frontend Setup

```bash
cd client/mycanvas-client
npm install
ng serve
```

## Environment Variables
.env file holds information for Mongo connection and port

## Seed Data
Seed/test data is included for MongoDB testing
-Run the following command

```bash
node seed.js
```

## YouTube Presentation
https://youtu.be/Yk75W9-jb9Q


## Team Roles
Michael Loutos- Individually completed