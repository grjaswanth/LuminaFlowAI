from fastapi import APIRouter
from sqlalchemy.orm import Session

from database import SessionLocal
import models

from schemas.caption_schema import CaptionRequest

from services.caption_service import (
    generate_ai_caption
)

router = APIRouter()


@router.post("/generate-caption")
def generate_caption(
    data: CaptionRequest
):

    db: Session = SessionLocal()

    try:

        generated_caption = generate_ai_caption(
            data.topic,
            data.tone
        )

        new_caption = models.Caption(
            topic=data.topic,
            content=generated_caption
        )

        db.add(new_caption)

        db.commit()

        return {
            "caption": generated_caption
        }

    except Exception as e:

        return {
            "caption": f"Backend Error: {str(e)}"
        }

    finally:

        db.close()


@router.get("/captions")
def get_captions():

    db: Session = SessionLocal()

    try:

        captions = db.query(
            models.Caption
        ).all()

        result = []

        for caption in captions:

            result.append({
                "topic": caption.topic,
                "content": caption.content
            })

        return result

    finally:

        db.close()