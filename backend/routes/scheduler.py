from fastapi import APIRouter
from sqlalchemy.orm import Session

from database import SessionLocal
import models

from schemas.scheduler_schema import (
    SchedulePostRequest
)

router = APIRouter()


@router.post("/schedule-post")
def schedule_post(
    data: SchedulePostRequest
):

    db: Session = SessionLocal()

    try:

        new_post = models.ScheduledPost(
            caption=data.caption,
            platform=data.platform,
            scheduled_date=data.scheduled_date,
            scheduled_time=data.scheduled_time,
            image_path=data.image_path,
            status="pending"
        )

        db.add(new_post)

        db.commit()

        return {
            "message": "Post scheduled successfully"
        }

    except Exception as e:

        return {
            "message": str(e)
        }

    finally:

     db.close()


@router.get("/scheduled-posts")
def get_scheduled_posts():

    db: Session = SessionLocal()

    try:

        posts = db.query(
            models.ScheduledPost
        ).all()

        result = []

        for post in posts:

            result.append({
                "id": post.id,
                "caption": post.caption,
                "platform": post.platform,
                "scheduled_date": post.scheduled_date,
                "scheduled_time": post.scheduled_time,
                "status": post.status
            })

        return result

    finally:

        db.close()