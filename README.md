# ResolveX

ResolveX is a full-stack customer support ticket management application built to manage customer issues and keep track of their resolution.

The application provides a dashboard where support staff can create and manage tickets, assign them to agents, update their status and priority, and view customer and ticket information. It also includes analytics to give an overview of the current support workload.

**Live Demo:** https://resolve-x-git-main-smartwizard.vercel.app/

## Features

ResolveX includes user registration and login with JWT authentication and bcrypt password hashing. Once logged in, users can manage support tickets, search and filter them, update their status and priority, assign agents, and view individual ticket details.

The dashboard provides an overview of the ticket data, while the Customers, Agents, and Analytics sections provide additional information based on the stored tickets.

## Tech Stack

**Frontend:** React.js, JavaScript, React Router, CSS, Vite

**Backend:** Node.js, Express.js, MongoDB, Mongoose

**Authentication:** JWT, bcryptjs

**Deployment:** Vercel, Render, MongoDB Atlas

## Project Structure

```text
ResolveX/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── App.jsx
│   └── App.css
│
├── .gitignore
├── vercel.json
├── package.json
└── README.md
```

## Authentication

User authentication is handled using JWT. Passwords are hashed with bcrypt before being stored in the database. Protected routes require a valid authentication token before allowing access to ticket data.

## Database

ResolveX uses MongoDB Atlas to store user and ticket information. Mongoose is used on the backend to work with the MongoDB database.

## Deployment

The frontend is deployed on Vercel and the backend is deployed on Render. MongoDB Atlas is used as the production database.

## Security

Sensitive configuration such as the MongoDB connection string and JWT secret is stored using environment variables and is not included in the GitHub repository.

## Future Improvements

The project can be extended with features such as ticket comments, email notifications, role-based access, file attachments, and AI-assisted ticket classification.
