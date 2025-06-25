from sqlalchemy.orm import Session
from models import Note, User
import schemas
from sqlalchemy.exc import IntegrityError
import bcrypt

def get_notes(db: Session, user_id: int):
    return db.query(Note).filter(Note.user_id == user_id).all()

def create_note(db: Session, note: schemas.NoteCreate, user_id: int):
    db_note = Note(**note.dict(), user_id=user_id)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

def update_note(db: Session, note_id: int, note: schemas.NoteCreate):
    db_note = db.query(Note).filter(Note.id == note_id).first()
    db_note.title = note.title
    db_note.content = note.content
    db.commit()
    return db_note

def delete_note(db: Session, note_id: int):
    db_note = db.query(Note).filter(Note.id == note_id).first()
    db.delete(db_note)
    db.commit()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    db_user = User(email=user.email, password=hashed_password.decode('utf-8'))
    db.add(db_user)
    try:
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError:
        db.rollback()
        return None
