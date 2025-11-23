# Vercel Deployment Guide

This guide will help you deploy the **Frontend** of your application to Vercel.

## Prerequisites

1.  **GitHub Repository**: Ensure your code is pushed to GitHub (we will do this in the next step).
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
3.  **Backend URL**: You need the URL of your deployed backend (from Railway or elsewhere).

## Step 1: Push Changes to GitHub

We added a `vercel.json` file to fix the 404 errors. You need to push this change to GitHub.

```bash
git add .
git commit -m "Add vercel.json for SPA routing"
git push origin main
```

## Step 2: Import Project in Vercel

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** > **"Project"**.
3.  Import your GitHub repository (`tajik_vehicle`).

## Step 3: Configure Project Settings (CRITICAL)

Before clicking "Deploy", you **MUST** configure the settings:

1.  **Framework Preset**: Vercel should automatically detect `Vite`. If not, select `Vite`.
2.  **Root Directory**:
    *   Click **"Edit"** next to Root Directory.
    *   Select `frontend`.
    *   **This is crucial!** If you don't do this, the build will fail or you will get 404 errors.

## Step 4: Environment Variables

1.  Expand the **"Environment Variables"** section.
2.  Add the following variable:
    *   **Key**: `VITE_API_URL`
    *   **Value**: Your Backend URL (e.g., `https://backend-production.up.railway.app/api`).
    *   *Note: Ensure you include `/api` at the end if your backend expects it.*

## Step 5: Deploy

1.  Click **"Deploy"**.
2.  Wait for the build to complete.
3.  Once finished, your site should be live!

## Troubleshooting

-   **404 on Refresh**: If you get a 404 error when refreshing a page other than the home page, ensure `vercel.json` is present in the `frontend` folder and you have pushed it to GitHub.
-   **API Connection Error**: Check the browser console. If requests are failing, verify your `VITE_API_URL` environment variable is correct and your backend is running.
