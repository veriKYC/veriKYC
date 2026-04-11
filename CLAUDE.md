# VeriKYC

AI-powered document verification system (KYC). Monorepo with three microservices.

## Structure

```
backend/       → Java 17 / Spring Boot 3.x (REST API, auth, queue)
cv-service/    → Python 3.11 / FastAPI (ML pipeline, OCR, classification)
frontend/      → React 18 / TypeScript / Tailwind (SPA)
docs/          → Shared docs: OpenAPI contract, HLD, ADRs
```

## API Contract

The single source of truth for all service interfaces is `docs/api/openapi.yaml` (OpenAPI 3.1).
All three services build against this spec. Changes to the contract require review from all three leads.

## Key Decisions

- **Platform:** GCP — Cloud Run for all three services, Cloud SQL (Postgres), Cloud Storage, Pub/Sub
- **Auth:** JWT bearer tokens issued by the backend; CV service is internal (no user-facing auth)
- **Design approach:** Contract-first — define the API spec before implementing endpoints

## Running Services

- **Backend:** `cd backend && ./mvnw spring-boot:run` (port 8080)
- **CV Service:** `cd cv-service && uvicorn app.main:app --reload` (port 8000) — not yet implemented
- **Frontend:** `cd frontend && npm run dev` (port 5173) — not yet implemented

## Team

- **Probina** — Backend Lead
- **Yuki** — CV/ML Lead
- **Alka** — Frontend Lead
- **Rajdeep** — Full-stack developer
