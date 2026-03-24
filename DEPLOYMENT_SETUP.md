# Fluxon Deployment Setup

This repo is now ready to connect to:

- **Vercel** for the frontend in `frontend/`
- **Render** for the ASP.NET Core API in `ShopAPI/ShopAPI/`

GitHub repo:

- `https://github.com/amineelhajami/hajami.git`

## 1. Connect Frontend to Vercel

1. Sign in to Vercel
2. Click **Add New Project**
3. Import this GitHub repo:
   - `amineelhajami/hajami`
4. Set:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variable:
   - `VITE_API_BASE_URL=https://api.yourdomain.com`
6. Deploy

Notes:
- `frontend/vercel.json` is already added so React Router routes rewrite to `index.html`
- if you still want mock mode for testing, also set:
  - `VITE_USE_MOCK_API=true`
- for real backend mode, set:
  - `VITE_USE_MOCK_API=false`

## 2. Connect Backend to Render

1. Sign in to Render
2. Choose **New +**
3. Select **Blueprint** or **Web Service**
4. Import this GitHub repo:
   - `amineelhajami/hajami`

If using **Blueprint**:
- Render will read the root `render.yaml`

If using **Web Service** manually:
- **Root Directory**: `ShopAPI/ShopAPI`
- **Runtime**: Docker
- **Dockerfile Path**: `ShopAPI/ShopAPI/Dockerfile`

Set these environment variables:

- `ConnectionStrings__DefaultConnection`
- `Jwt__Secret`
- `Jwt__Issuer=Fluxon.Api`
- `Jwt__Audience=Fluxon.Web`
- `Cors__AllowedOrigins__0=https://www.yourdomain.com`
- `ASPNETCORE_ENVIRONMENT=Production`

Then deploy.

## 3. Domain Setup

Use:

- `www.yourdomain.com` -> Vercel frontend
- `api.yourdomain.com` -> Render backend

### Frontend domain in Vercel

1. Open your Vercel project
2. Go to **Settings -> Domains**
3. Add:
   - `www.yourdomain.com`
4. Follow the DNS instructions Vercel gives you

### Backend domain in Render

1. Open your Render service
2. Go to **Settings -> Custom Domains**
3. Add:
   - `api.yourdomain.com`
4. Follow the DNS instructions Render gives you

Both platforms will issue SSL certificates automatically once DNS is correct.

## 4. DNS Records

Your registrar/domain provider will usually need:

- `CNAME`:
  - `www` -> Vercel target
- `CNAME` or `A record`:
  - `api` -> Render target

Use exactly the DNS values shown by Vercel and Render in their dashboards.

## 5. Recommended First Production Settings

### Vercel frontend env vars

- `VITE_API_BASE_URL=https://api.yourdomain.com`
- `VITE_USE_MOCK_API=false`

### Render backend env vars

- `ConnectionStrings__DefaultConnection=<your-production-mysql-connection>`
- `Jwt__Secret=<long-random-secret>`
- `Jwt__Issuer=Fluxon.Api`
- `Jwt__Audience=Fluxon.Web`
- `Cors__AllowedOrigins__0=https://www.yourdomain.com`
- `ASPNETCORE_ENVIRONMENT=Production`

## 6. Before Going Live

Make sure these work:

- frontend loads from Vercel
- backend Swagger or API responds from Render
- frontend can register/login against production API
- product list loads from production DB
- COD checkout creates a real order
- admin can update order/payment status
- HTTPS works for both `www` and `api`

## 7. Important Notes

- The repo already points to the new GitHub remote
- Current working branch pushed to GitHub:
  - `brnamin`
- If you want Vercel/Render to deploy from `main`, you should push `main` too
- Production database credentials must stay only in platform env vars, never in repo
