from fastapi import FastAPI

from app.routers import classify, health

app = FastAPI(
    title="VeriKYC CV Service",
    description="Internal ML pipeline — document classification, OCR, face matching.",
    version="0.1.0",
)

app.include_router(health.router)
app.include_router(classify.router)
