from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from face_recognition import load_image_file, face_locations

@csrf_exempt #besh taaml api call maghir token 
def detectface(request) : 
    if(request.method == 'POST' and request.FILES.get('image')):
        imageFile = request.FILES['image']
        image = load_image_file(imageFile)
        face_encodings_list = face_locations(image)
        if face_encodings_list:
            return JsonResponse({"faces":True})
        else:
            return JsonResponse({"faces":False})

#nkhaddem server bel command adhika python manage.py runserver
