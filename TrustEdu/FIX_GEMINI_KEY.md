# 🔑 How to Get a WORKING Gemini API Key

Your current API key returns `404 Not Found` errors. Here's how to get a key that works instantly:

## Option 1: Google AI Studio (RECOMMENDED - Works Immediately!)

1. Go to: **https://aistudio.google.com/app/apikey**
2. Click **"Get API Key"**
3. Click **"Create API key in new project"**
4. Copy the key (starts with `AIza...`)
5. Replace in `backend/.env`:
   ```
   GEMINI_API_KEY=YOUR_NEW_KEY_HERE
   ```
6. Restart backend: `npm start`

**Done!** This key works immediately, no billing or project setup needed.

---

## Option 2: Fix Your Google Cloud Console Key

If you want to keep using your Cloud Console key (`AIzaSyCnpWgqCaVe6Cq1LD_8Xg7hDqIpP8ZOZg0`):

1. Go to: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com
2. Select your project
3. Click **ENABLE**
4. Wait 1-2 minutes
5. Restart backend

---

## Why Your Key Doesn't Work

Error: `404 Not Found - models/gemini-pro is not found for API version v1beta`

This means:
- ❌ The "Generative Language API" is NOT enabled in your project
- ❌ Or your project doesn't have access to Gemini models

**Solution**: Use AI Studio key (Option 1) - it's designed for demos and works instantly!
