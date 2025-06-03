# 🚀 ValueAtvoid

A full-stack web application to visualize job data and application statistics using a React + Tailwind frontend and Express + MongoDB backend.

---

## What Extra I did

I have implemented the post end point in the backend and implement its functionality in the frontend. We can add the job, but the adding it to the db is need to figure out. I am honest. I have done and happy to deliver only this much. 

## Assumption
Feed the data for the Total Jobs Posted,
Application received, Hired manually, initially. 

Also feed initially 21 job data initially, and then dynamically fetching from the db. 


---

## 🖼 Frontend (React + Vite + TailwindCSS)

The frontend is built with modern tooling: React for UI, Vite for fast development builds, and TailwindCSS for utility-first styling.

### 🗂 Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Local images, logos
│   ├── components/         # Modular UI elements
│   │   ├── FilterButton.jsx
│   │   ├── JobCard.jsx
│   │   ├── RightTop.jsx
│   │   ├── RightBottom.jsx
│   │   └── SideBar.jsx
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Root entry point
│   ├── App.css             # Global styles
│   └── index.css           # Tailwind imports
├── index.html              # HTML shell
├── package.json
├── tailwind.config.js
├── vite.config.js
```

### 🧪 Scripts

```bash
cd frontend
npm install       # Install dependencies
npm run dev       # Start local dev server
npm run build     # Build for production
```

---

## ⚙️ Backend (Express + MongoDB)

A Node.js/Express backend that provides APIs for job posting and application statistics management, connected to MongoDB.

### 📁 Structure

```
backend/
├── models/
│   ├── ApplicationStatistics.js   # Schema for stats
│   └── JobCard.js                 # Schema for job posts
├── server.js                      # Express API entry point
├── .env                           # Environment variables
```

### 🌐 API Endpoints

#### `GET /`
> Bulk insert mock job data into MongoDB (one-time seed)

#### `POST /add-job`
> Add a new job from the frontend  
**Body**:
```json
{
  "job_title": "Full Stack Developer",
  "posted_time": "Now",
  "employment_type": "Full-time",
  ...
}
```

#### `GET /post`
> Create or update application statistics  
(*Can be adapted to accept dynamic data via `req.body`*)

#### `GET /stats`
> Retrieve all application statistics

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ashugh12/valueAtvoid.git
cd valueAtvoid
```

### 2. Set up the Backend

```bash
cd backend
npm install
# Create .env file
touch .env
```

Inside `.env`:

```
MONGO_URI=your_mongodb_connection_string
PORT=3001
```

Then run the server:

```bash
node server.js
```

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🧠 Tech Stack

| Frontend        | Backend         | Database     |
|----------------|------------------|--------------|
| React           | Node.js + Express| MongoDB      |
| Vite            | Mongoose         |              |
| Tailwind CSS    | dotenv, cors     |              |

---

## 📊 Features

- 🖼 Job Card Grid Layout with Filters
- 📉 Application Stats Dashboard
- 📤 Add Jobs via Form
- 🧪 Pre-seeded job data for testing

---

## 🧑‍💻 Author

**Ashutosh Mishra**  
[GitHub – @ashugh12](https://github.com/ashugh12)

---

## 📃 License

This project is licensed under the MIT License.