# GitHub Pages Setup Guide

Follow these steps to make your PAPO'S World site accessible via GitHub Pages.

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in:
   - **Repository name**: `PaposWorld` (or your preferred name)
   - **Description**: "Interactive world map for PAPO'S snacks"
   - **Visibility**: Select **Public** (required for free GitHub Pages)
   - **DO NOT** check "Add a README file" (we already have one)
   - **DO NOT** check "Add .gitignore" (we already have one)
   - **DO NOT** select a license
5. Click **"Create repository"**

## Step 2: Connect and Push Your Code

After creating the repository, GitHub will show you commands. Use these:

```bash
# Make sure you're in the PaposWorld directory
cd /Users/Kush/Desktop/PaposWorld

# Add your GitHub repository (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/PaposWorld.git

# Rename branch to main (if not already)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Note**: You may be prompted for your GitHub username and password. If you have 2FA enabled, you'll need to use a Personal Access Token instead of your password.

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub (after pushing)
2. Click the **"Settings"** tab (top menu)
3. Scroll down and click **"Pages"** in the left sidebar
4. Under **"Source"**:
   - Select **Branch: main**
   - Select **Folder: / (root)**
5. Click **"Save"**
6. Wait 1-2 minutes for GitHub to build your site

## Step 4: Access Your Live Site

Your site will be available at:
```
https://YOUR_USERNAME.github.io/PaposWorld/
```

GitHub will show you this URL in the Pages settings after it's ready.

## Troubleshooting

### If images don't load:
- Make sure all image paths in `index.html` use relative paths like `images/filename.png`
- Check that the `images/` folder is in the repository
- Wait a few minutes after pushing - GitHub Pages can take 1-5 minutes to update

### If you get authentication errors:
- Use a Personal Access Token instead of password:
  1. Go to GitHub Settings > Developer settings > Personal access tokens
  2. Generate a new token with `repo` permissions
  3. Use this token as your password when pushing

### To update your site:
```bash
# Make your changes
# Then commit and push:
git add .
git commit -m "Your update message"
git push
```

## Sharing with Collaborators

Once your site is live:
- **Live site URL**: Share `https://YOUR_USERNAME.github.io/PaposWorld/`
- **Repository URL**: Share `https://github.com/YOUR_USERNAME/PaposWorld`
- Collaborators can clone: `git clone https://github.com/YOUR_USERNAME/PaposWorld.git`

