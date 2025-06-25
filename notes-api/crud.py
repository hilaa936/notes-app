from sqlalchemy.orm import Session
from models import Note
import schemas

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
