# PAPO'S World

An interactive world map experience showcasing PAPO'S snacks and their global ingredients.

## Features

- Interactive world map with ingredient markers
- Flavor exploration with detailed modals
- Animated sea dragon in the Pacific Ocean
- Cursor ship that follows your mouse over water
- Footprint trail when moving over land
- Caravan cursor when exploring North America
- Ingredient visualization mode
- Shopping cart and checkout functionality

## Setup for GitHub Pages

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right, then "New repository"
3. Name it `PaposWorld` (or your preferred name)
4. Make it **Public** (required for free GitHub Pages)
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### 2. Push Your Code to GitHub

Run these commands in your terminal (from the PaposWorld directory):

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit: PAPO'S World interactive map"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/PaposWorld.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes, then visit: `https://YOUR_USERNAME.github.io/PaposWorld/`

## File Structure

```
PaposWorld/
├── index.html          # Main HTML file
├── images/             # All images and assets
│   ├── *.png          # Token images, ingredient images
│   ├── *.mp4          # Video files
│   └── ...
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## Important Notes

- **Images Path**: All image references use relative paths like `images/filename.png`
- **Google Maps API**: Make sure your Google Maps API key is set in `index.html`
- **Public Repository**: GitHub Pages requires a public repo for free hosting

## Collaborating

Once your repository is on GitHub:
1. Share the repository URL with your collaborator
2. They can clone it: `git clone https://github.com/YOUR_USERNAME/PaposWorld.git`
3. Or they can access the live site at: `https://YOUR_USERNAME.github.io/PaposWorld/`

## Local Development

If you want to run locally:
```bash
npm install
node server.js
```
Then visit `http://localhost:3000`

