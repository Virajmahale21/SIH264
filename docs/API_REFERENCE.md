# REST API Reference Documentation

Base URL: `http://localhost:5001/api`

---

## 1. Authentication (`/api/auth`)

### `POST /api/auth/login`
Authenticates an AICTE official and returns a signed JWT.
- **Request Body**:
  ```json
  {
    "email": "officer@aicte.gov.in",
    "password": "password123"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": {
      "id": "usr_...",
      "name": "Dr. Vikram Singh",
      "email": "officer@aicte.gov.in",
      "role": "OFFICER",
      "bureau": "Regulation Bureau"
    }
  }
  ```

---

## 2. Complaints Management (`/api/complaints`)

### `GET /api/complaints`
Retrieve a paginated list of complaints with filtering options.
- **Query Parameters**:
  - `bureau`: Filter by bureau (e.g., `PGRC`, `Regulation Bureau`, `Legal`)
  - `status`: Filter by status (`REGISTERED`, `UNDER_PROCESS`, `OVERDUE`, `DISPOSED`)
  - `priority`: Filter by priority (`LOW`, `MEDIUM`, `HIGH`, `URGENT`)
  - `institutionId`: Filter by AICTE institution ID
- **Response `200 OK`**: Array of complaint objects with populated institution and action relations.

### `POST /api/complaints`
Register a new statutory complaint into the central registry.
- **Request Body**:
  ```json
  {
    "institutionId": "inst_123",
    "category": "Fee Extortion",
    "description": "Allegation of non-refund of caution money...",
    "source": "Online Portal",
    "complainantType": "Student",
    "department": "PGRC",
    "priority": "HIGH"
  }
  ```

### `PATCH /api/complaints/:id/status`
Update status, add consequential action notes, or re-route bureau.

---

## 3. Overlap Detection & Coordination (`/api/overlaps`, `/api/coordination`)

### `GET /api/overlaps`
List all detected cross-bureau case collisions with composite similarity scores.

### `POST /api/overlaps/scan`
Trigger an on-demand scan of active complaint pairs across bureaus.

### `POST /api/coordination`
Establish a Shared Cross-Bureau Coordination Record between investigating bureaus with a designated Lead Bureau.

---

## 4. Institutions Registry (`/api/institutions`)

### `GET /api/institutions`
Search and list accredited technical institutions with complaint metrics and compliance scores.

### `GET /api/institutions/:id`
Fetch complete institutional dossier, history of inquiries, and overlap graph nodes.

---

## 5. Audit Trail & Reports (`/api/audit-logs`, `/api/reports`)

### `GET /api/audit-logs`
Fetch chronological, tamper-evident action logs with officer identity and timestamp.

### `GET /api/reports/summary`
Compute real-time summary statistics, bureau disposal ratios, and SLA compliance metrics.

---

## 6. System Health (`/api/health`)

### `GET /api/health`
Checks database connectivity and returns system status.
- **Response `200 OK`**:
  ```json
  {
    "status": "HEALTHY",
    "service": "AICTE SIH 2026 PS 264 Integrated Complaint & Overlap Detection API",
    "timestamp": "2026-11-22T15:00:00.000Z",
    "database": "CONNECTED",
    "stats": { "users": 15, "complaints": 220 }
  }
  ```
