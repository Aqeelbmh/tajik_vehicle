# Backend Quick Deployment Guide (Railway)

I have optimized the project so you can deploy the backend easily.

## Step 1: Push Updates
(I will do this for you in the next step)

## Step 2: Deploy on Railway

1.  Go to [Railway Dashboard](https://railway.app/dashboard).
2.  Click **"New Project"** -> **"Deploy from GitHub repo"**.
3.  Select your repo (`tajik_vehicle`).
4.  **Click "Deploy Now"**.
    *   *Note: Because I updated `railway.toml`, it will automatically know how to build the backend!*

## Step 3: Add Database

1.  Once the project is created, click **"New"** -> **"Database"** -> **"Add MongoDB"**.
2.  Wait for it to initialize.

## Step 4: Connect Them

1.  Click on your **Repo Service** (the backend).
2.  Go to **Variables**.
3.  Add `MONGODB_URI`.
    *   Value: Click "Reference Variable" -> Select `MONGO_URL`.
4.  Add `PORT` = `8081`.

**That's it!** Your backend will restart and be live.
