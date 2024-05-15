import logging
import google.generativeai as genai
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from face_recognition import load_image_file, face_locations
from google.ai import generativelanguage as glm

logger = logging.getLogger(__name__)

@csrf_exempt
def detectface(request):
    if request.method == 'POST':
        try:
            imageFile = request.FILES['image']
            image = load_image_file(imageFile)
            face_encodings_list = face_locations(image)
            if face_encodings_list:
                return JsonResponse({"faces": True})
            else:
                return JsonResponse({"faces": False})
        except Exception as e:
            logger.error(f"Error processing image: {e}")
            return HttpResponseBadRequest("Error processing image")
    else:
        return HttpResponseBadRequest("Image file not provided or invalid method")


genai.configure(api_key="AIzaSyBFzKNI02At6aCko5ldFvvrLvfFJCw1a6o")

@csrf_exempt
def chat(request):
    if request.method == 'POST':
        text = request.POST.get("text")
        # Load image file for face recognition
        model = genai.GenerativeModel("gemini-pro")
        history = [
            glm.Content(
            role="user",
            parts=[
                glm.Part(text=f'You are a helpful teacher. I will talk with you in {"German"} language about the topic {"why are stars bright"}. Starting from now, you will only answer in {"German"} and always keep in mind my grammatical errors and point them out to me. Now, tell me that you understood me and wait for me.'
                )
            ],
        ),
            glm.Content(
            role="model",
            parts=[
                glm.Part(text="Verstehe! Ich freue mich darauf, mit dir auf Deutsch über das Thema why are stars bright zu sprechen. Ich werde mein Bestes geben, dir die Grammatik zu erklären, falls du Fehler machst. Frag einfach nach, los geht's!"

                )
            ],
        ),
        ]
        chat = model.start_chat(history= history)
        print(text)
        response = chat.send_message(text)
        
        response_data = {
            "text": response.text,  # Assuming response.text contains the relevant response data
            # Add other relevant data from response if needed
        }
        return JsonResponse({"data": response_data})