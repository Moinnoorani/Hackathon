import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# Dummy dataset
data = {
    "marks": [35, 45, 55, 65, 75, 85, 90, 40, 60, 70],
    "attendance": [50, 60, 65, 70, 80, 90, 95, 55, 75, 85],
    "quizScore": [30, 40, 50, 60, 70, 80, 85, 35, 65, 75],
    "assignmentScore": [40, 50, 55, 65, 75, 85, 90, 45, 70, 80],
    "risk": ["High", "High", "Medium", "Medium", "Low", "Low", "Low", "High", "Medium", "Low"]
}

df = pd.DataFrame(data)

X = df[["marks", "attendance", "quizScore", "assignmentScore"]]
y = df["risk"]

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

joblib.dump(model, "model.pkl")

print("✅ Model trained and saved as model.pkl")
