from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import json
import schemas, models, crud
from database import engine, SessionLocal, Base
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
import bcrypt
from datetime import datetime, timedelta
from typing import Optional

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

# Seed default users from users.json if not exist
with SessionLocal() as db:
    from models import User
    try:
        with open("users.json") as f:
            users = json.load(f)
        for user_data in users:
            email = user_data["email"]
            password = user_data["password"]
            if not db.query(User).filter_by(email=email).first():
                hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
                user = User(email=email, password=hashed_password)
                db.add(user)
        db.commit()
    except Exception as e:
        print(f"User seeding failed: {e}")

SECRET_KEY = "your-secret-key"  # Change this in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

# תלות בסיס נתונים
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# User registration endpoint
@app.post("/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    created_user = crud.create_user(db, user)
    if not created_user:
        raise HTTPException(status_code=400, detail="Registration failed")
    return created_user

# Updated login endpoint
@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, form_data.username)
    if not user or not bcrypt.checkpw(form_data.password.encode('utf-8'), user.password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.id == int(user_id)).first()
    if user is None:
        raise credentials_exception
    return user

# Protected notes endpoints
@app.get("/notes", response_model=list[schemas.Note])
def read_notes(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.get_notes(db, current_user.id)

@app.post("/notes", response_model=schemas.Note)
def create_note(note: schemas.NoteCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.create_note(db, note, current_user.id)

@app.put("/notes/{note_id}", response_model=schemas.Note)
def update_note(note_id: int, note: schemas.NoteCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Optionally, check note ownership here
    return crud.update_note(db, note_id, note)

@app.delete("/notes/{note_id}")
def delete_note(note_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Optionally, check note ownership here
    crud.delete_note(db, note_id)
    return {"message": "Deleted"}
