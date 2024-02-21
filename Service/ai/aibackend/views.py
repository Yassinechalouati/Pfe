import logging
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from face_recognition import load_image_file, face_locations

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
