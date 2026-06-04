from fastapi import APIRouter, UploadFile, File

from services.image_service import analyze_uploaded_image

router = APIRouter()


@router.post("/upload-image")
async def upload_image(
    file: UploadFile = File(...)
):

    image_bytes = await file.read()

    image_description = (
        analyze_uploaded_image(
            image_bytes
        )
    )

    return {
        "message": "Image analyzed successfully",
        "description": image_description
    }