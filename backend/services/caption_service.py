import random
import google.generativeai as genai

# Use the SAME Gemini API key that works in image_service.py
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def generate_ai_caption(
    image_description,
    tone
):

    creative_angles = [
        "innovation and growth",
        "future opportunities",
        "technology and transformation",
        "personal impact",
        "industry disruption",
        "modern branding",
        "success and achievement",
        "vision and leadership",
        "creativity and innovation",
        "digital transformation"
    ]

    selected_angle = random.choice(
        creative_angles
    )

    prompt = f"""
You are a world-class social media copywriter.

Image Description:
{image_description}

Tone:
{tone}

Focus Angle:
{selected_angle}

Generate 3 completely different caption options.

Requirements:
- Different style for each option
- Different wording
- Different hashtags
- Human sounding
- Social media ready
- No repeated sentences

Instructions:

1. Generate ONE unique social media caption.
2. Make it completely different each time.
3. Use fresh wording and structure.
4. Do not repeat previous captions.
5. Make it engaging and professional.
6. Add 5 relevant hashtags.
7. Maximum 120 words.
8. Return only the caption.

Format exactly like this:

OPTION 1:
<caption>

OPTION 2:
<caption>

OPTION 3:
<caption>
"""

    try:

        response = model.generate_content(
            prompt
        )

        return response.text

    except Exception as e:

        return f"Caption AI Error: {str(e)}"