import joblib
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "model.pkl")

model = joblib.load(MODEL_PATH)

def predict_performance(data):
    features = [[
        data["marks"],
        data["attendance"],
        data["quizScore"],
        data["assignmentScore"]
    ]]

    risk = model.predict(features)[0]

    if risk == "Low":
        grade = "A"
        confidence = 0.85
    elif risk == "Medium":
        grade = "B+"
        confidence = 0.75
    else:
        grade = "C"
        confidence = 0.65

    return {
        "predictedGrade": grade,
        "riskLevel": risk,
        "confidence": confidence
    }
