from uuid import UUID

from fastapi import APIRouter

from app.models.classify import ClassifyRequest, ClassifyResponse, DocumentType

router = APIRouter()


@router.post("/classify", tags=["CV Internal"])
def classify_document(request: ClassifyRequest) -> ClassifyResponse:
    """
    Stub implementation — returns deterministic fake data.
    Real EfficientNet-B0 inference will replace this block.
    """
    return ClassifyResponse(
        document_id=request.document_id,
        document_type=DocumentType.AADHAAR,
        extracted_fields={
            "name": "Stub Name",
            "dob": "1990-01-01",
            "document_number": "STUB-0000-0000",
        },
        confidence_scores={
            "name": 0.95,
            "dob": 0.92,
            "document_number": 0.98,
        },
        quality_score=0.87,
        face_match_score=0.91 if request.selfie_url else None,
        tamper_score=0.04,
    )
