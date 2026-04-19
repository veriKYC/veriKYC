from enum import Enum
from uuid import UUID

from pydantic import BaseModel, HttpUrl


class DocumentType(str, Enum):
    PAN = "PAN"
    AADHAAR = "AADHAAR"
    PASSPORT = "PASSPORT"
    DL = "DL"
    CHEQUE = "CHEQUE"


class ClassifyRequest(BaseModel):
    document_id: UUID
    image_url: HttpUrl
    selfie_url: HttpUrl | None = None


class ClassifyResponse(BaseModel):
    document_id: UUID
    document_type: DocumentType
    extracted_fields: dict
    confidence_scores: dict[str, float]
    quality_score: float | None = None
    face_match_score: float | None = None
    tamper_score: float | None = None
