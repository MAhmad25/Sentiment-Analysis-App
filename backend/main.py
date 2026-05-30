from fastapi import FastAPI
import joblib
from pydantic import BaseModel, Field
from helper import preprocessing
from fastapi.middleware.cors import CORSMiddleware
from config import settings

vectorizer = joblib.load("ai_models/vectorizer.pkl")
model = joblib.load("ai_models/model.pkl")
label_encoder = joblib.load("ai_models/LabelEncoder.pkl")

app = FastAPI(title="Sentiment Analysis", version="1.0.0")


origins = [settings.FRONTEND_URL]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserText(BaseModel):
    text: str = Field(min_length=2, description="Raw text")


@app.get("/")
def health():
    return {"status": "healthy"}


@app.post("/predict")
def predict(text: UserText):
    cleaned = preprocessing(text.text)
    vector = vectorizer.transform([cleaned])
    prediction = model.predict(vector)[0]
    label = label_encoder.inverse_transform([prediction])[0]
    return {
        "prediction": int(prediction),
        "Label": str(label)
    }
