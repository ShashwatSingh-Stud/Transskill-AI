from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from engine import engine

app = FastAPI(title="TransSkill AI Prediction Engine")

# Allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SkillPredictionRequest(BaseModel):
    current_skills: List[str]
    target_role: str
    target_role_skills: List[str] # Frontend passes the skills required for the role so we don't need a DB connection here

class LearningResourceModel(BaseModel):
    title: str
    provider: str
    duration: str
    url: str

class SkillRecommendation(BaseModel):
    skill: str
    impact_score: float
    transfer_score: float
    reason: str
    transfer_from: str
    time_to_roi: str
    salary_impact: int
    learning_resources: List[LearningResourceModel]

class SkillPredictionResponse(BaseModel):
    recommendations: List[SkillRecommendation]
    visual_graph_data: Dict[str, Any]

@app.get("/")
def read_root():
    return {"status": "ok", "message": "TransSkill AI Service Running"}

@app.post("/api/predict-skills", response_model=SkillPredictionResponse)
def predict_skills(request: SkillPredictionRequest):
    try:
        recommendations, graph_data = engine.predict_next_skills(
            request.current_skills, 
            request.target_role, 
            request.target_role_skills
        )
        return {
            "recommendations": recommendations,
            "visual_graph_data": graph_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
