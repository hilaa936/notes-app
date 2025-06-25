# 📝 Notes App – Full Stack React + FastAPI

A simple full-stack notes management app with login, personal notes, and full CRUD functionality.  
Built with **React + TypeScript** on the frontend and **FastAPI (Python)** on the backend.

---

## 📸 Preview

> Login → Notes List → Create / Edit (in separate pages) → Delete

---

## 🚀 Features

- 🔐 **JWT Authentication**: Secure login and registration with email + password
- 🔐 **Login** with email + password (no signup)
- 🚪 **Logout** option
- 📋 View **personal notes**
- ➕ **Create notes** (in a separate page)
- ✏️ **Edit notes** (in a separate page)
- 🗑 **Delete** notes
- ✅ **Title is required**
- ⚙️ Backend with FastAPI & SQLite
- 💡 Clean code structure with React Router & Axios

## 🛠 Getting Started

### 📦 1. Backend (FastAPI)

```bash
cd notes-api
python -m venv .venv
source .venv/bin/activate      # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

> The API will be available at:
> [http://localhost:8000](http://localhost:8000)
> Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)

#### 🔐 Test User:

```text
Email:    test@example.com
Password: 1234
```

---

### 💻 2. Frontend (React + TypeScript)

```bash
cd notes-client
npm install
npm run dev
```

> The frontend will run at:
> [http://localhost:5173](http://localhost:5173)

---

### 🧪 Example Workflow

1. Go to `/` → Login with test credentials
2. Redirected to `/notes` → View personal notes
3. Click **+ New Note** → Go to `/notes/new` and create
4. Click **Edit** → Go to `/notes/edit/:id` and update
5. Click **Delete** → Remove the note
6. Title field is **required** when creating/editing
