# Database Schema & Data Dictionary

The platform uses Prisma ORM to interact with either SQLite (for rapid local developer setup) or PostgreSQL 16 (for high-concurrency production deployments).

---

## 1. Entity-Relationship Overview

```
 +------------------+            +---------------------+
 |   Institution    | 1        * |      Complaint      |
 |  (AICTE Registry)|------------|  (Statutory Filings)|
 +------------------+            +----------+----------+
                                            | 1
                                            |
                                            | *
                                 +----------v----------+
                                 |       Action        |
                                 | (Audit History Log) |
                                 +---------------------+

 +------------------+            +---------------------+
 |     Overlap      | 1        1 | CoordinationRecord  |
 | (Detected Clash) |------------| (Lead Bureau Directive)
 +------------------+            +----------+----------+
                                            | 1
                                            |
                                            | *
                                 +----------v----------+
                                 | CoordinationAction  |
                                 |  (Joint Workflows)  |
                                 +---------------------+
```

---

## 2. Core Models Specification

### 2.1 `User`
Stores authorized statutory personnel and their role permissions.
- `id` (String, Primary Key, UUID)
- `email` (String, Unique)
- `name` (String)
- `passwordHash` (String, bcrypt salted hash)
- `role` (String: `ADMIN`, `OFFICER`, `BUREAU_HEAD`, `AUDITOR`)
- `bureau` (String: `Regulation Bureau`, `PGRC`, `Legal`, `Approval Bureau`)

### 2.2 `Institution`
Master AICTE database of approved institutes.
- `id` (String, Primary Key)
- `aicteId` (String, Unique - permanent statutory identifier)
- `name` (String)
- `state` (String)
- `region` (String: `Western`, `Northern`, `Southern`, `Central`, `Eastern`)
- `totalApprovedIntake` (Int)

### 2.3 `Complaint`
The central statutory filing entity.
- `id` (String, Primary Key)
- `complaintNumber` (String, Unique)
- `institutionId` (Foreign Key -> Institution)
- `category` (String)
- `description` (Text)
- `source` (String: `Online Portal`, `National Anti-Ragging Cell`, `Court Order`, `Direct Email`)
- `department` (String: investigating bureau)
- `status` (String: `REGISTERED`, `UNDER_PROCESS`, `OVERDUE`, `DISPOSED`, `CLOSED`)
- `priority` (String: `LOW`, `MEDIUM`, `HIGH`, `URGENT`)
- `deadline` (DateTime: statutory SLA deadline)
- `isOverdue` (Boolean: automated flag)

### 2.4 `Overlap`
Pairs of complaints identified by the overlap detection engine.
- `id` (String, Primary Key)
- `complaintAId`, `complaintBId` (Foreign Keys -> Complaint)
- `departmentA`, `departmentB` (String: collided bureaus)
- `compositeScore` (Float: 0.00 to 1.00)
- `status` (String: `FLAGGED`, `COORDINATED`, `DISMISSED`)
- `matchedSignals` (JSON/String: signal contributions breakdown)

### 2.5 `AuditLog`
Immutable system audit record ensuring non-repudiation.
- `id` (String, Primary Key)
- `action` (String)
- `entityType` (String)
- `entityId` (String)
- `userId` (Foreign Key -> User)
- `ipAddress` (String)
- `details` (String)
- `createdAt` (DateTime)
