import google.generativeai as genai

import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def analyze_uploaded_image(image_bytes):

    prompt = """
    Analyze this image.

    Describe:
    - main subject
    - context
    - industry/category
    - mood
    - branding/message

    Keep response concise.
    """

    try:

        response = model.generate_content(
            [
                prompt,
                {
                    "mime_type": "image/jpeg",
                    "data": image_bytes
                }
            ]
        )

        return response.text

    except Exception as e:

        return f"Gemini Vision Error: {str(e)}"