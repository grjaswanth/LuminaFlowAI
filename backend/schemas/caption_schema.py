from pydantic import BaseModel

class CaptionRequest(BaseModel):

    topic: str
    tone: str