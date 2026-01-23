# 🚀 GitHub Repository Setup Guide

## Step 1: Initialize Git Repository

Open terminal in the TrustEdu folder and run:

```bash
cd d:\Hackathon\TrustEdu
git init
git add .
git commit -m "Initial commit: TrustEdu - Blockchain AI Academic System"
```

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `TrustEdu`
3. Description: `Blockchain-verified AI academic performance system with accountable tutoring`
4. Select **Public** (for hackathon visibility)
5. **Do NOT** initialize with README (we already have one)
6. Click **Create repository**

## Step 3: Connect and Push

GitHub will show you commands. Run these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/TrustEdu.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Step 4: Verify Upload

1. Refresh your GitHub repository page
2. You should see all files uploaded
3. README.md will display automatically

---

## 📝 What Gets Uploaded

✅ **Included:**
- All source code (frontend, backend, ml-service, blockchain)
- README.md with full documentation
- Package.json files
- Configuration examples (.env.example)
- Startup scripts

❌ **Excluded** (via .gitignore):
- node_modules/
- venv/
- .env (sensitive keys)
- build files
- database files

---

## 🎯 Quick Commands Reference

### Update Repository Later
```bash
git add .
git commit -m "Updated feature X"
git push
```

### Clone on Another Machine
```bash
git clone https://github.com/YOUR_USERNAME/TrustEdu.git
cd TrustEdu
# Follow installation in README.md
```

---

## ✨ Repository Features to Enable

After pushing, go to your GitHub repo settings:

1. **Topics**: Add tags like `blockchain`, `ai`, `hackathon`, `react`, `machine-learning`
2. **About**: Add description and website (if deployed)
3. **Releases**: Create v1.0.0 release for hackathon submission

---

**Your code is ready to share with the world! 🌍**
