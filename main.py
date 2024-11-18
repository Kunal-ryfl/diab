from typing import Union
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pickle

model = pickle.load(open("model.pkl", "rb"))
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def main():
    return {"message": "Hello World"}

class FormData(BaseModel):
    pregnancies: int
    glucose: int
    bp: int
    skinThickness: int
    insulin: int
    bmi: int 
    dpf: int 
    age: int

@app.post("/submit")
async def submit_form(formData: FormData):

    X = [[formData.pregnancies, formData.glucose, formData.bp, formData.skinThickness, formData.insulin, formData.bmi, formData.dpf, 
         formData.age]]
    X = np.array(X)
    print("**** Got here**")
    y = model.predict(X)
    print(y)
    message = ""
    if (y == 1):
        message = "You have Diabetes"
    else:
        message = "You don't have Diabetes"
    try:
        return {
            "status": "success",
            "message": message 
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
