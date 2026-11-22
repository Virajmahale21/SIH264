# Production Deployment & Operations Guide

This guide covers deployment options for the AICTE PS 264 Integrated Complaint Portal on cloud providers and containerized environments.

---

## 1. Option A: Render Cloud Deployment (Full-Stack or Monolith)

Render natively supports both the Express backend API and PostgreSQL managed databases via `render.yaml`.

### Step 1: Managed PostgreSQL Database
1. Create a PostgreSQL service on Render.
2. Note the internal connection string: `postgresql://user:pass@host/dbname`.

### Step 2: Web Service Configuration
Set the following environment variables in the Render Dashboard:
```env
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://sih_user:password@hostname:5432/sih264?sslmode=require
JWT_SECRET=production_secret_key_generate_using_openssl_rand_base64_32
FRONTEND_URL=https://sih264.onrender.com
```

### Step 3: Build & Start Command
- **Build Command**: `npm run render-build` (installs dependencies, generates Prisma client, runs `prisma db push`, and seeds reference data)
- **Start Command**: `npm start` (launches Express server on `$PORT`)

---

## 2. Option B: Vercel Frontend + Render Backend (Decoupled)

### Frontend Deployment on Vercel
1. Import repository into Vercel.
2. Select Vite as framework preset.
3. Configure Environment Variable:
   - `VITE_API_URL`: URL of the deployed Render backend (e.g. `https://sih264-api.onrender.com`).
4. Output Directory: `dist`.
5. Deploy.

---

## 3. Option C: Self-Hosted Docker Compose

To deploy on an Ubuntu / Debian VPS:

```bash
# Clone the repository
git clone https://github.com/Virajmahale21/SIH264.git
cd SIH264

# Copy and adjust environment settings
cp .env.example .env

# Launch services
docker-compose up -d --build

# Run database migrations and seeding inside container
docker-compose exec web npx prisma db push
docker-compose exec web npm run seed
```

---

## 4. Verification & Health Monitoring

Verify the service status using the public health endpoint:
```bash
curl -f http://localhost:5001/api/health
```
Expected output:
```json
{
  "status": "HEALTHY",
  "database": "CONNECTED",
  "stats": { "users": 15, "complaints": 220 }
}
```
