# User Access Management System

A full-stack system for user registration, authentication, software access requests, and managerial approvals.

---

## Features

- User registration and login (JWT-based)
- Role-based access (Employee, Manager, Admin)
- Software management (Admin)
- Access request submission (Employee)
- Request approval/rejection (Manager)
- Modern UI with Bootstrap

---

## Tech Stack

- **Backend:** Node.js, Express, TypeORM, PostgreSQL, JWT, bcrypt
- **Frontend:** React, React Router, Axios, Bootstrap
- **Deployment:** Render/Railway/Heroku (backend), Vercel/Netlify (frontend)

---

## Setup Instructions

### 1. **Backend**

```sh
git clone <your-repo-url>
cd backend
npm install
```

Create a `.env` file:
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_DATABASE=user_access_db
JWT_SECRET=your_jwt_secret
```

Start the backend:
```sh
npm start
```

### 2. **Frontend**

```sh
cd ../frontend
npm install
npm start
```

---

## API Endpoints

- `POST /api/auth/signup` — Register (default: Employee)
- `POST /api/auth/login` — Login (returns JWT, role)
- `POST /api/software` — Create software (Admin)
- `GET /api/software` — List software (All)
- `POST /api/requests` — Submit request (Employee)
- `PATCH /api/requests/:id` — Approve/reject (Manager)
- `GET /api/requests/pending` — List pending (Manager)

---

## Deployment

### **Backend (Render example)**

1. Push your backend code to GitHub.
2. Go to [Render](https://render.com), create a new Web Service, and connect your repo.
3. Set environment variables in the Render dashboard (from your `.env`).
4. Add a PostgreSQL database in Render and update your DB connection settings.
5. Deploy!

### **Frontend (Vercel example)**

1. Push your frontend code to GitHub.
2. Go to [Vercel](https://vercel.com), create a new project, and connect your repo.
3. Set the build command to `npm run build` and output directory to `build`.
4. If your backend is deployed, set `REACT_APP_API_URL` in Vercel's environment variables (if you use it in your code).
5. Deploy!

---

## Usage

- Register as a new user (default: Employee)
- Login and get redirected based on your role
- Admin: Create software
- Employee: Request access to software
- Manager: Approve or reject requests

---

## License

MIT 