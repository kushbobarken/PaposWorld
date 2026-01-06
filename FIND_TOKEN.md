# How to Find Personal Access Token on GitHub

## Step-by-Step Instructions:

1. **Go to GitHub Settings**
   - Click your profile picture (top right corner)
   - Click **"Settings"** from the dropdown menu

2. **Navigate to Developer Settings**
   - Scroll down in the left sidebar
   - Look for **"Developer settings"** (at the very bottom of the left menu)
   - Click it

3. **Go to Personal Access Tokens**
   - Click **"Personal access tokens"** in the left sidebar
   - Then click **"Tokens (classic)"**

4. **Generate New Token**
   - Click the green button **"Generate new token"**
   - Select **"Generate new token (classic)"**

5. **Configure Token**
   - **Note**: Give it a name like "PaposWorld" or "My Computer"
   - **Expiration**: Choose how long it should last (90 days, or custom)
   - **Select scopes**: Check the box for **"repo"** (this gives full repository access)
   - Scroll down and click **"Generate token"**

6. **Copy the Token**
   - **IMPORTANT**: Copy the token immediately - you won't be able to see it again!
   - It will look like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

7. **Use the Token**
   - When you run `git push`, use this token as your password
   - Username: your GitHub username
   - Password: paste the token

## Quick Navigation Path:
```
GitHub.com → Your Profile Picture → Settings → 
Developer settings (bottom left) → 
Personal access tokens → Tokens (classic) → 
Generate new token (classic)
```

