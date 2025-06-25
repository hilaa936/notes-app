from pydantic import BaseModel

class NoteBase(BaseModel):
    title: str
    content: str

class NoteCreate(NoteBase):
    pass

class Note(NoteBase):
    id: int
    user_id: int
    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: str
    password: str
