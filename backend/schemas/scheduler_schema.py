from pydantic import BaseModel


class SchedulePostRequest(BaseModel):

    caption: str

    platform: str

    scheduled_date: str

    scheduled_time: str

    image_path: str = ""