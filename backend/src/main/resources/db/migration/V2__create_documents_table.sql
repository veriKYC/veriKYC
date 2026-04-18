CREATE TABLE documents (
    id           VARCHAR(36)  NOT NULL PRIMARY KEY,
    owner_id     VARCHAR(36)  NOT NULL REFERENCES users(id),
    status       VARCHAR(50)  NOT NULL DEFAULT 'QUEUED',
    document_type VARCHAR(50),
    image_url    VARCHAR(2048) NOT NULL,
    selfie_url   VARCHAR(2048),
    created_at   TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_documents_owner_id ON documents (owner_id);
CREATE INDEX idx_documents_status   ON documents (status);