import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib

# Generate Synthetic Data (1000 Students)
np.random.seed(42)
n_samples = 1000

# Random scores with some correlation
attendance = np.random.randint(40, 100, n_samples)
quizScore = np.random.randint(30, 100, n_samples)
assignmentScore = np.random.randint(40, 100, n_samples)

# Marks are influenced by attendance and effort (plus noise)
marks = (attendance * 0.3) + (quizScore * 0.4) + (assignmentScore * 0.3) + np.random.randint(-5, 5, n_samples)
marks = np.clip(marks, 0, 100) # Ensure valid range

# Create DataFrame
df = pd.DataFrame({
    "marks": marks,
    "attendance": attendance,
    "quizScore": quizScore,
    "assignmentScore": assignmentScore
})

# Define Logic for Risk Labels (Ground Truth)
def determine_risk(row):
    avg_score = (row['marks'] + row['quizScore'] + row['assignmentScore']) / 3
    if row['attendance'] < 60 or avg_score < 50:
        return "High"
    elif row['attendance'] < 75 or avg_score < 70:
        return "Medium"
    else:
        return "Low"

df['risk'] = df.apply(determine_risk, axis=1)

print("Dataset Generated:")
print(df['risk'].value_counts())

X = df[["marks", "attendance", "quizScore", "assignmentScore"]]
y = df["risk"]

# Train Model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
print("\nModel Performance:")
print(classification_report(y_test, model.predict(X_test)))

joblib.dump(model, "model.pkl")

print("Model trained on 1000 records and saved as model.pkl")
