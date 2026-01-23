# from django.shortcuts import render

# # Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .ml_model import predict_performance

@csrf_exempt
def predict(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)

            required_fields = ["marks", "attendance", "quizScore", "assignmentScore"]
            for field in required_fields:
                if field not in body:
                    return JsonResponse({"error": f"Missing field: {field}"}, status=400)

            result = predict_performance(body)
            return JsonResponse(result)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST allowed"}, status=405)
