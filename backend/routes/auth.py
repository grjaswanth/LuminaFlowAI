from fastapi import APIRouter
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from database import SessionLocal
import models

from schemas.auth_schema import (
    SignupRequest,
    LoginRequest
)

router = APIRouter()

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# Signup Route
@router.post("/signup")
def signup(data: SignupRequest):

    db: Session = SessionLocal()

    try:

        existing_user = db.query(models.User).filter(
            models.User.email == data.email
        ).first()

        if existing_user:

            return {
                "message": "Email already exists"
            }

        hashed_password = pwd_context.hash(
            data.password
        )

        new_user = models.User(
            name=data.name,
            email=data.email,
            password=hashed_password
        )

        db.add(new_user)

        db.commit()

        return {
            "message": "User created successfully"
        }

    except Exception as e:

        return {
            "message": f"Backend Error: {str(e)}"
        }

    finally:

        db.close()


# Login Route
@router.post("/login")
def login(data: LoginRequest):

    db: Session = SessionLocal()

    try:

        user = db.query(models.User).filter(
            models.User.email == data.email
        ).first()

        if not user:

            return {
                "message": "User not found"
            }

        valid_password = pwd_context.verify(
            data.password,
            user.password
        )

        if not valid_password:

            return {
                "message": "Incorrect password"
            }

        return {
            "message": "Login successful",
            "name": user.name
        }

    except Exception as e:

        return {
            "message": f"Backend Error: {str(e)}"
        }

    finally:

        db.close()