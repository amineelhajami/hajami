# Fluxon Repo Migration

This project is currently on branch `brnamin` and still points to the old remote:

- `origin -> https://git.bib.de/PBT3H24AKA/WebShop_Fluxon.git`

Use this guide when your new empty GitHub repository is ready.

## 1. Check current branch

```powershell
git branch --show-current
```

Expected branch for your current work:

```text
brnamin
```

## 2. Verify remotes

```powershell
git remote -v
```

## 3. Replace old origin with new GitHub repo

Replace `<NEW_GITHUB_URL>` with your new GitHub repo URL.

```powershell
git remote remove origin
git remote add origin <NEW_GITHUB_URL>
git remote -v
```

## 4. Push your working branch

```powershell
git push -u origin brnamin
```

## 5. Optional: push main too

If you also want `main` on GitHub:

```powershell
git switch main
git push -u origin main
git switch brnamin
```

## 6. Connect deployment later

After the new repo is live on GitHub:

- connect `frontend` to Vercel
- connect backend/API to Render or Railway
- point deployment to the new GitHub repository, not the old one

## Safer temporary option

If you want to keep the old remote for a short time instead of replacing it immediately:

```powershell
git remote rename origin old-origin
git remote add origin <NEW_GITHUB_URL>
git remote -v
```
