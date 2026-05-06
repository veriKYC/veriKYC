# VeriKYC

An AI-powered KYC document verification system. Upload a PAN card, Aadhaar, Passport, Driving License, or Cheque — VeriKYC classifies it, pulls out the text fields, validates them, and optionally matches the face against a selfie.

Built as a full-stack portfolio project across Java, Python, and React, deployed on GCP.

---

## What it does

The user uploads a document. The backend stores it, kicks off the CV pipeline, and returns a structured verification result — extracted fields, confidence scores, and a pass/fail verdict per field. If a selfie is provided, face matching runs against the document photo.

Two modes:
- **Quick Verify** — single document, selfie optional. Good for a fast one-off check.
- **KYC Session** *(Phase 3)* — multiple documents with a mandatory selfie. Returns a consolidated identity verification report.

---

## Architecture

Three services, each independently deployable:

```
Frontend (React)
      |
      | REST
      |
Backend API (Spring Boot)
      |               |
      | WebClient     | JPA
      |               |
CV Service (FastAPI)  PostgreSQL
```

The backend owns orchestration — it handles auth, stores documents in GCS, and coordinates with the CV service. The CV service is stateless and has no database access. The frontend only talks to the backend.

For async processing (Phase 3+), the backend publishes jobs to RabbitMQ locally / Cloud Pub/Sub on GCP, and a worker calls the CV service.

---

## CV Pipeline

Stages run sequentially. Classification runs first and determines which downstream stages execute.

| Stage | Model | Phase |
|-------|-------|-------|
| Document Classification | EfficientNet-B0 (fine-tuned, ONNX) | 2 |
| OCR Extraction | PaddleOCR + MRZ parser | 2 |
| Field Validation | Rules per document type | 2 |
| Quality Check | MobileNetV3 | 3 |
| Text Region Detection | CRAFT / DBNet | 3 |
| Face Matching + Liveness | RetinaFace + ArcFace + MiniFASNet | 3 |
| Tamper Detection | ELA + forensic CNN | 3 |

---

## Stack

- **Backend** — Java 17, Spring Boot 3.x, Spring Security (JWT), Spring Data JPA, WebFlux (WebClient)
- **CV Service** — Python 3.11, FastAPI, PyTorch, EfficientNet-B0, PaddleOCR, ArcFace, ONNX Runtime
- **Frontend** — React 18, Tailwind CSS, Axios, React Router
- **Database** — PostgreSQL 15
- **Queue** — RabbitMQ (local) / Cloud Pub/Sub (GCP)
- **Storage** — Google Cloud Storage
- **Infra** — Docker, Docker Compose, GCP Cloud Run, Cloud SQL, Artifact Registry, Cloud Build, Secret Manager, Terraform (Phase 4)

---

## Repos

| | |
|--|--|
| [verikyc-backend](https://github.com/veriKYC/verikyc-backend) | Spring Boot API |
| [verikyc-cv](https://github.com/veriKYC/verikyc-cv) | FastAPI CV service |
| [verikyc-frontend](https://github.com/veriKYC/verikyc-frontend) | React frontend |
| [verikyc-infra](https://github.com/veriKYC/verikyc-infra) | Docker Compose + GCP deployment |

---

## Running locally

```bash
git clone https://github.com/veriKYC/verikyc-infra
cd verikyc-infra
cp .env.example .env
docker compose up
```

| | URL |
|--|--|
| Backend | http://localhost:8080 |
| Swagger | http://localhost:8080/swagger-ui |
| CV Service | http://localhost:8000 |
| Frontend | http://localhost:3000 |
| RabbitMQ | http://localhost:15672 |

For service-specific setup, check the README in each repo.

---

## Phases

| Phase | Goal | Status |
|-------|------|--------|
| 1 — Foundation | Backend, auth, upload API, CV classification | Done |
| 2 — Quick Verify MVP | End-to-end single document flow + frontend | In progress |
| 3 — KYC Session | Multi-doc, face matching, async pipeline, admin | Planned |
| 4 — Production | Full GCP deployment, CI/CD, Terraform | Planned |

---

## License

Portfolio and learning project. Not for production use.
