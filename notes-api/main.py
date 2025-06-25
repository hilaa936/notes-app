from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import json
import schemas, models, crud
from database import engine, SessionLocal, Base

app = FastAPI()

# ✅ תמיכה ב־CORS עבור React (localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# אתחול סכמת מסד הנתונים
Base.metadata.create_all(bind=engine)

# קריאת רשימת משתמשים (דמו)
with open("users.json") as f:
    users = json.load(f)

# תלות בסיס נתונים
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# התחברות – מחזיר user_id אם תקף
@app.post("/login")
def login(data: schemas.UserLogin):
    user = next(
        (u for u in users if u["email"] == data.email and u["password"] == data.password),
        None,
    )
    if user:
        return {"user_id": user["id"]}
    raise HTTPException(status_code=401, detail="Invalid credentials")

# קבלת פתקים
@app.get("/notes", response_model=list[schemas.Note])
def read_notes(user_id: int, db: Session = Depends(get_db)):
    return crud.get_notes(db, user_id)

# יצירת פתק
@app.post("/notes", response_model=schemas.Note)
def create_note(note: schemas.NoteCreate, user_id: int, db: Session = Depends(get_db)):
    return crud.create_note(db, note, user_id)

# עדכון פתק
@app.put("/notes/{note_id}", response_model=schemas.Note)
def update_note(note_id: int, note: schemas.NoteCreate, db: Session = Depends(get_db)):
    return crud.update_note(db, note_id, note)

# מחיקת פתק
@app.delete("/notes/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    crud.delete_note(db, note_id)
    return {"message": "Deleted"}
