from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.image import router as image_router

from database import engine
import models

from routes.auth import router as auth_router
from routes.captions import router as captions_router
from routes.scheduler import router as scheduler_router

# Create database tables
models.Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Home route
@app.get("/")
def home():

    return {
        "message": "LuminaFlow AI Backend Running"
    }

# Register routes
app.include_router(auth_router)

app.include_router(captions_router)

app.include_router(image_router)

app.include_router(scheduler_router)