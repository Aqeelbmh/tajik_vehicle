# Deployment Guide for Railway

This guide will help you deploy your Heavy Vehicle & Spare Parts Distribution Platform to [Railway.app](https://railway.app).

## Prerequisites

1.  **GitHub Account**: You need a GitHub account to host your code.
2.  **Railway Account**: Sign up at [railway.app](https://railway.app) using your GitHub account.
3.  **Git Installed**: Ensure you have Git installed on your machine.

## Step 1: Push Code to GitHub

If you haven't already, push your code to a new GitHub repository.

1.  Create a new repository on GitHub (e.g., `tajik-vehicle-platform`).
2.  Run the following commands in your project root:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tajik-vehicle-platform.git
git push -u origin main
```

*(Replace `YOUR_USERNAME` with your actual GitHub username)*

## Step 2: Create a Project on Railway

1.  Go to your [Railway Dashboard](https://railway.app/dashboard).
2.  Click **"New Project"** > **"Deploy from GitHub repo"**.
3.  Select the repository you just created (`tajik-vehicle-platform`).
4.  Click **"Deploy Now"**.

Railway will attempt to deploy, but it might fail initially because we need to set up the services correctly. That's okay!

## Step 3: Set up MongoDB

1.  In your Railway project view, click **"New"** (or right-click on the canvas) > **"Database"** > **"Add MongoDB"**.
2.  Wait for the MongoDB service to initialize.

## Step 4: Configure the Backend

1.  Click on your repository service (it might be named after your repo).
2.  Go to **Settings** > **General**.
    *   Change **Root Directory** to `/backend`.
    *   Click the checkmark to save.
3.  Go to **Variables**.
    *   Click **"New Variable"**.
    *   Name: `MONGODB_URI`
    *   Value: Click on "Reference Variable" and select `MONGO_URL` from your MongoDB service.
    *   Add another variable: `PORT` with value `8081`.
4.  Go to **Settings** > **Networking**.
    *   Click **"Generate Domain"**. This will give you a public URL for your backend (e.g., `backend-production.up.railway.app`). **Copy this URL.**

Railway should now automatically redeploy your backend. Wait for it to show "Active".

## Step 5: Configure the Frontend

Since we have a monorepo (frontend and backend in one repo), we need to create a second service for the frontend.

1.  In the project canvas, click **"New"** > **"GitHub Repo"**.
2.  Select the **same repository** again.
3.  Click on this new service to configure it.
4.  Go to **Settings** > **General**.
    *   Change **Root Directory** to `/frontend`.
    *   Click the checkmark to save.
5.  Go to **Variables**.
    *   Name: `VITE_API_URL`
    *   Value: The Backend URL you copied in Step 4 (e.g., `https://backend-production.up.railway.app/api`). **Important:** Make sure to include `https://` and append `/api` at the end.
6.  Go to **Settings** > **Networking**.
    *   Click **"Generate Domain"**. This is your website's public URL!

## Step 6: Finalize

1.  Railway will trigger a redeploy for the frontend.
2.  Once it's "Active", click the generated domain for your frontend service.
3.  Your application should now be live!

## Troubleshooting

-   **Build Failed?** Check the "Build Logs" in the deployment tab to see what went wrong.
-   **API Errors?** Open the browser console (F12) and check the Network tab. Ensure requests are going to your Backend URL, not `localhost`.
-   **Database Connection Error?** Check the Backend "Deploy Logs" to ensure it connected to MongoDB successfully.
