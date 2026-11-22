# Security Policy & Vulnerability Disclosure

## Supported Versions

| Version | Supported |
| :--- | :--- |
| 1.0.x | Yes |
| < 1.0 | No |

## Reporting a Vulnerability

If you discover a security vulnerability within the AICTE PS 264 platform, please send an advisory email to the development team directly rather than opening a public issue on GitHub.

### Security Best Practices Implemented
- **BCrypt Hashing**: Passwords stored using salt rounds >= 10.
- **JWT Signing**: Statutory roles encoded into signed tokens with expiration.
- **Role-Based Middleware**: Route-level enforcement verifying user roles and bureau scopes.
- **Audit Logging**: Consequential actions immutably logged with actor identity, timestamp, and IP address.
