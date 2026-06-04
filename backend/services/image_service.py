import google.generativeai as genai

genai.configure(
    api_key="AIzaSyB13aVzPa4ZABmVvFpVyf7s-UzwtKX9CR0"
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