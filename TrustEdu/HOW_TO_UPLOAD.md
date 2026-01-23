# 📤 How to Push Your Project to GitHub

It looks like **Git is not installed** on your system (or not in your PATH), so I couldn't push it automatically. Don't worry, it's easy to fix!

## Step 1: Install Git
1. Download Git: [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Run the installer (Click "Next" through all options, they are fine).
3. **Important**: Restart your terminal (or VS Code) after installing.

## Step 2: Create Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name it `TrustEdu`.
3. Click **Create repository**.

## Step 3: Run This Command
Once Git is installed, copy and run these commands in your terminal (inside `d:\Hackathon\TrustEdu`):

```bash
# 1. Initialize Git
git init

# 2. Add all files
git add .

# 3. Commit your work
git commit -m "TrustEdu Complete: Blockchain AI System"

# 4. Link to GitHub (Replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/TrustEdu.git

# 5. Push!
git branch -M main
git push -u origin main
```

---

## 🚀 Alternative: Use GitHub Desktop
If you prefer a visual tool:
1. Download [GitHub Desktop](https://desktop.github.com/).
2. Open it and go to **File > Add Local Repository**.
3. Choose `d:\Hackathon\TrustEdu`.
4. Click **Publish repository** to push it to your account.
