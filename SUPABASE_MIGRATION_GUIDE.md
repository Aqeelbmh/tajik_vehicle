# Supabase Migration Guide

I have updated your backend to use **Supabase (PostgreSQL)** instead of MongoDB.

## Step 1: Create a Supabase Project

1.  Go to [Supabase](https://supabase.com) and sign in.
2.  Click **"New Project"**.
3.  Give it a name (e.g., `tajik-vehicle`) and a secure password.
4.  Select a region close to you.
5.  Click **"Create new project"**.

## Step 2: Get Connection String

1.  Once your project is ready, go to **Project Settings** (gear icon) -> **Database**.
2.  Under **Connection String**, make sure **"Transaction Mode"** is selected (port 6543).
3.  Copy the connection string. It looks like:
    `postgres://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`
4.  Replace `[password]` with the password you created in Step 1.

## Step 3: Update Railway

1.  Go to your **Railway Dashboard**.
2.  Click on your **Backend Service**.
3.  Go to **Variables**.
4.  **Delete** `MONGODB_URI`.
5.  **Add** `DATABASE_URL` and paste your Supabase connection string.

## Step 4: Run Migrations (One-time setup)

Since we are moving to a new database, we need to create the tables. You can do this from your local machine if you have Node.js installed, or I can help you do it via a script.

**Option A: Local Machine (Recommended)**
1.  In your `backend` folder, create a `.env` file and add:
    ```
    DATABASE_URL="your-supabase-connection-string"
    ```
2.  Run:
    ```bash
    cd backend
    npm install
    npx prisma db push
    ```
    This will create all the tables in your Supabase database.

**Option B: SQL Editor**
1.  Go to the **SQL Editor** in your Supabase dashboard.
2.  Copy the content of `backend/prisma/schema.prisma` (I can generate the SQL for you if you prefer this method).

## Step 5: Deploy

1.  Push the changes to GitHub (I will do this next).
2.  Railway will redeploy your backend.
