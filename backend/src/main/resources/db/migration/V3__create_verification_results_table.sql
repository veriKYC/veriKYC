CREATE TABLE verification_results (
    id                VARCHAR(36)   NOT NULL PRIMARY KEY,
    document_id       VARCHAR(36)   NOT NULL UNIQUE REFERENCES documents(id),
    extracted_fields  JSONB         NOT NULL DEFAULT '{}',
    confidence_scores JSONB         NOT NULL DEFAULT '{}',
    quality_score     NUMERIC(5, 4),
    face_match_score  NUMERIC(5, 4),
    tamper_score      NUMERIC(5, 4),
    created_at        TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_verification_results_document_id ON verification_results (document_id);