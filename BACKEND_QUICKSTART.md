# Backend Quick Deployment Guide (Railway + Supabase)

I have optimized the project so you can deploy the backend easily with Supabase.

## Step 1: Push Updates
(Already done - code is on GitHub)

## Step 2: Deploy on Railway

1.  Go to [Railway Dashboard](https://railway.app/dashboard).
2.  Click **"New Project"** -> **"Deploy from GitHub repo"**.
3.  Select your repo (`tajik_vehicle`).
4.  **Click "Deploy Now"**.

**Important:** Railway will automatically detect how to build the backend from `railway.toml`.

## Step 3: Add Supabase Database URL

1.  Click on your **Backend Service** in Railway.
2.  Go to **Variables**.
3.  Add `DATABASE_URL`:
    ```
    postgresql://postgres:Tajikistan321%23Agro@db.oqmwzbrutyithmrkkdga.supabase.co:5432/postgres
    ```
    *(Note: The `#` symbol is encoded as `%23` for URL compatibility)*
4.  Add `PORT` = `8081`.

**That's it!** Your backend will restart and connect to Supabase. The database tables are already created! ✅
