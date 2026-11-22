# System Architecture & Technical Specifications

## 1. High-Level Architecture Overview

The **AICTE PS 264 Integrated Complaint & Overlap Tracking Platform** is structured as a decoupled, multi-tiered architecture designed for high availability, audit compliance, and strict statutory data boundaries.

```
                      +-----------------------------+
                      |       Web Client (SPA)      |
                      |   React 18 / Vite / Lucide  |
                      |  Trilingual i18n / Tailwind |
                      +--------------+--------------+
                                     |
                                REST API
                                     |
                      +--------------v--------------+
                      |     Express API Gateway     |
                      |   CORS / JWT Auth / RBAC    |
                      |     SLA Escalation Engine   |
                      +--------------+--------------+
                                     |
                      +--------------+--------------+
                      | Overlap Intelligence Engine |
                      | Deterministic Multi-Signal  |
                      |   Scoring & Disambiguation  |
                      +--------------+--------------+
                                     |
                      +--------------v--------------+
                      |     Prisma ORM Layer        |
                      | (SQLite Dev / PostgreSQL)   |
                      +--------------+--------------+
                                     |
                      +--------------v--------------+
                      |    Relational Database      |
                      | Complaints, Overlaps, Audit |
                      +-----------------------------+
```

---

## 2. Core Functional Pillars

### 2.1 Multi-Signal Overlap Detection Engine
The overlap engine computes a composite similarity metric between any pair of complaints targeting an institution:

$$\text{Composite Score} = (w_{\text{inst}} \cdot S_{\text{inst}}) + (w_{\text{cat}} \cdot S_{\text{cat}}) + (w_{\text{sem}} \cdot S_{\text{sem}}) + (w_{\text{time}} \cdot S_{\text{time}})$$

- **Permanent AICTE Institution Disambiguation ($S_{\text{inst}}$)**: Exact matching of statutory institution registration IDs.
- **Categorical Signal ($S_{\text{cat}}$)**: Exact or related domain categorization (e.g., fee extortion vs. marksheet retention).
- **Semantic Text Signal ($S_{\text{sem}}$)**: Tokenized lexical and key phrase overlap.
- **Temporal Proximity ($S_{\text{time}}$)**: Decay curve based on complaint filing dates.

### 2.2 Statutory Disambiguation Guard
A major innovation of the PS 264 engine is **false-positive prevention**. Complaints lodged against the same institution that concern unrelated matters (e.g., a student ragging grievance vs. a civil building zoning dispute) are **not merged** into parallel inquiry overlaps. The threshold cutoff ensures administrative independence.

### 2.3 Automated SLA Deadline & Escalation Monitor
A background daemon verifies statutory inquiry deadlines every 60 seconds:
- Computes time remaining against AICTE procedural guidelines (15/30/45-day SLAs).
- Flags expired cases as `isOverdue: true` and elevates priority to `HIGH`.
- Sends notifications to assigned bureau officers and bureau chiefs.
- Logs an immutable entry in the system audit trail.

---

## 3. Statutory Role-Based Access Control (RBAC)

| Role | Access Level | Permitted Operations |
| :--- | :--- | :--- |
| **CENTRAL_ADMIN** | Global / Read-Write | Master oversight, SLA threshold configuration, administrative dashboards |
| **BUREAU_HEAD** | Bureau Wide | Cross-bureau joint directives, case re-assignment, escalation resolution |
| **OFFICER** | Case Specific | Evidence examination, consequential action logging, status updates |
| **REGIONAL_OFFICER** | Regional Jurisdiction | Field inspection scheduling, regional compliance oversight |
| **GUEST / AUDITOR** | Read Only | Verified audit log examination and regulatory analytics review |
