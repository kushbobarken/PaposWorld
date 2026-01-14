# Quick Start Guide - GitHub Pages Setup

## Step 1: Enable GitHub Pages (You're Here!)

1. In the GitHub Pages settings page you're viewing:
   - **Select branch:** Choose `main` (not "None")
   - **Select folder:** Choose `/ (root)` 
   - Click **"Save"**

2. Wait 1-2 minutes for GitHub to build your site

3. Your site will be live at:
   ```
   https://kushbobarken.github.io/PaposWorld/
   ```

## Step 2: Connect Custom Domain (paposdesnac.com)

After GitHub Pages is enabled:

1. In the same GitHub Pages settings page, scroll down to **"Custom domain"**
2. Enter: `paposdesnac.com`
3. Click **"Save"**
4. GitHub will show you DNS verification instructions

5. Go to your domain registrar (where you bought paposdesnac.com) and add these DNS records:

   **A Records (4 of them):**
   ```
   Type: A
   Name: @ (or leave blank)
   Value: 185.199.108.153
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   ```

6. Wait 5-60 minutes for DNS to propagate

7. Visit `https://paposdesnac.com` - your site should be live!

## Step 3: Ecommerce Setup (Optional)

Since GitHub Pages is static-only, you'll need to use client-side payment solutions:

- **Easiest:** Stripe Payment Links (no code changes)
- **Full cart:** Snipcart or PayPal Smart Buttons

See `ECOMMERCE_GITHUB_PAGES.md` for details.

## Troubleshooting

**Site not loading?**
- Wait a few more minutes (first deployment can take 2-5 minutes)
- Check the "Actions" tab in GitHub to see if there are any build errors

**Custom domain not working?**
- DNS can take up to 24 hours (usually 5-60 minutes)
- Verify DNS records are correct at your registrar
- Check DNS propagation: https://dnschecker.org

**Need help?**
- Check `CUSTOM_DOMAIN_SETUP.md` for detailed domain setup
- Check `ECOMMERCE_GITHUB_PAGES.md` for payment options


