# Anchor

This project is configured for static export and deployment to GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

## Build static files

```bash
npm run build
```

The static site is generated in `out/`.

## GitHub Pages deployment

Deployment is automated with GitHub Actions via `.github/workflows/deploy-pages.yml`.

1. Push to `main`.
2. In GitHub, enable **Settings → Pages → Source: GitHub Actions**.
3. Wait for the **Deploy to GitHub Pages** workflow to complete.

## Base path behavior

- On production builds in GitHub Actions, the app automatically uses the repository name as `basePath` (for example, `/anchor`).
- For local development, no `basePath` is applied.
- If deploying from a user/org repository like `username.github.io`, no `basePath` is applied.
