from sqlalchemy import Column, Integer, String
from database import Base


# User table
class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    email = Column(String, unique=True)

    password = Column(String)


# Caption table
class Caption(Base):

    __tablename__ = "captions"

    id = Column(Integer, primary_key=True, index=True)

    topic = Column(String)

    content = Column(String)


# Scheduled Posts table
class ScheduledPost(Base):

    __tablename__ = "scheduled_posts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    caption = Column(String)

    image_path = Column(String)

    platform = Column(String)

    scheduled_date = Column(String)

    scheduled_time = Column(String)

    status = Column(
        String,
        default="pending"
    )