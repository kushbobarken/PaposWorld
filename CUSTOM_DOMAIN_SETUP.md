# Setting Up Custom Domain (paposdesnac.com) with GitHub Pages

## What is GitHub Pages?

GitHub Pages is a free hosting service from GitHub that turns your repository into a live website. It's perfect for static sites like yours.

## How Custom Domains Work

You can use your custom domain `paposdesnac.com` with GitHub Pages. Instead of `kushbobarken.github.io/PaposWorld`, your site will be accessible at `paposdesnac.com`.

## Setup Steps:

### 1. Add Domain to GitHub Pages

1. Go to your repository: `https://github.com/kushbobarken/PaposWorld`
2. Click **Settings** → **Pages**
3. Under **"Custom domain"**, enter: `paposdesnac.com`
4. Click **Save**
5. GitHub will show you DNS verification instructions

### 2. Configure DNS Records

You need to add DNS records at your domain registrar (where you bought paposdesnac.com). You'll need to add:

**Option A: Apex Domain (paposdesnac.com) - Recommended**

Add these A records pointing to GitHub Pages IPs:
```
Type: A
Name: @ (or leave blank)
Value: 185.199.108.153
TTL: 3600 (or default)

Type: A
Name: @ (or leave blank)
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 185.199.111.153
TTL: 3600
```

**Option B: Subdomain (www.paposdesnac.com)**

Add a CNAME record:
```
Type: CNAME
Name: www
Value: kushbobarken.github.io
TTL: 3600
```

### 3. Verify Domain (if required)

If GitHub asks you to verify:
1. Add the TXT record they provide to your DNS
2. Wait for DNS propagation (can take a few minutes to 24 hours)
3. Click "Verify" in GitHub

### 4. Enable HTTPS (Automatic)

GitHub Pages automatically provides free SSL certificates for custom domains. After DNS is configured:
- Go to Settings → Pages
- Check "Enforce HTTPS" (this will be available after DNS propagates)

## Where to Add DNS Records

Go to your domain registrar (where you bought paposdesnac.com):
- **GoDaddy**: My Products → DNS Management
- **Namecheap**: Domain List → Manage → Advanced DNS
- **Google Domains**: DNS → Custom records
- **Cloudflare**: DNS → Records

## Testing

After adding DNS records:
1. Wait 5-60 minutes for DNS to propagate
2. Visit `https://paposdesnac.com` (or `http://` if HTTPS isn't ready yet)
3. Your site should load!

## Important Notes

- **DNS Propagation**: Can take anywhere from 5 minutes to 48 hours
- **HTTPS**: GitHub automatically provides SSL certificates (free)
- **Both www and non-www**: You can set up both `paposdesnac.com` and `www.paposdesnac.com` if desired
- **CNAME file**: GitHub will create a `CNAME` file in your repo - don't delete it!

## Troubleshooting

**Site not loading?**
- Check DNS propagation: Use `nslookup paposdesnac.com` or `dig paposdesnac.com`
- Verify DNS records are correct
- Wait longer (DNS can be slow)

**HTTPS not working?**
- Wait 24-48 hours after DNS setup for GitHub to provision SSL certificate
- Make sure "Enforce HTTPS" is checked in Pages settings

**Want both www and non-www?**
- Set up both A records (for apex) and CNAME (for www)
- Or use a redirect from one to the other


