# Official Functional Feature Inventory & Module Specifications

This document catalogs the complete 16-module capability inventory for the AICTE Smart India Hackathon platform.

---

## Module Index

| # | Feature Identifier | Module Name | Primary Stakeholder |
| :--- | :--- | :--- | :--- |
| **01** | `Feature_01_Login` | Role-Based Authentication & Trilingual Switcher | All Statutory Users |
| **02** | `Feature_02_Dashboard` | Executive Real-Time KPI & Statutory Command Center | Central Admin, Bureau Heads |
| **03** | `Feature_03_Institutions` | National Accredited Institutions Registry | Scrutiny Officers, Public |
| **04** | `Feature_04_Filing` | Statutory Complaint Registration & Ingestion | Complainants, Regional Officers |
| **05** | `Feature_05_Complaints` | Multi-Bureau Active Complaint Case Management | Bureau Officers |
| **06** | `Feature_06_Scrutiny` | Regulatory Application Scrutiny & Verification | Scrutiny Officers |
| **07** | `Feature_07_OCR` | Document OCR & Mandatory Evidence Inspection | Scrutiny Officers |
| **08** | `Feature_08_OverlapEngine` | AI Multi-Signal Overlap & Collision Detector | Cross-Bureau Taskforce |
| **09** | `Feature_09_EVC` | Expert Visiting Committee (EVC) Field Management| Regional Officers, EVC Members |
| **10** | `Feature_10_SLA` | Statutory SLA Deadline & Escalation Engine | Bureau Heads, Vigilance Cell |
| **11** | `Feature_11_Coordination` | Shared Joint Directives & Inter-Bureau Hub | Bureau Heads |
| **12** | `Feature_12_AuditTrail` | Immutable Non-Repudiation Audit Ledger | Vigilance Cell, Legal Division |
| **13** | `Feature_13_CaseNetwork` | Interactive Cross-Bureau Case Topology Graph | Executive Leadership |
| **14** | `Feature_14_Reports` | Statutory Disposal & Bureau Performance Reports| Ministry & Council Officials |
| **15** | `Feature_15_Admin` | System Administration & Bureau Threshold Config | Super Admin, Central Admin |
| **16** | `Feature_16_Notifications`| Instant Dispatch & Escalation Notification Center| All Active Personnel |

---

## Detailed Capabilities

### Feature 01: Role-Based Authentication & Trilingual Accessibility
- Secure BCrypt hashed password verification and signed JWT token sessions.
- Dynamic trilingual support across English (`en-IN`), Hindi (`hi-IN`), and Marathi (`mr-IN`) with instantaneous client-side re-render.
- High-contrast toggle and accessible font scaling for government accessibility compliance.

### Feature 08: Multi-Signal Overlap & Case Collision Detection
- Deterministic signal weighting balancing institution identifiers, categorical classification, semantic text similarity, and time-decay curves.
- Strict disambiguation rules that prevent distinct matters targeting the same institution from false-positive merging.
- Visual breakdown of signal contributions aiding transparency and official defense.

### Feature 10: Statutory SLA Escalation Engine
- Background monitor analyzing pending cases against 15/30/45-day statutory timeframes.
- Automatic transition from normal to high-priority state upon deadline breach.
- Direct notification dispatches to bureau officers and supervisory heads.

### Feature 13: Interactive Case Network Graph
- Graph visualization powered by Vis/Canvas rendering.
- Visual mapping of relationships between institutions, complaints, overlaps, and coordinating bureaus.
- Cluster analysis identifying institutes facing multiple simultaneous statutory grievances.
