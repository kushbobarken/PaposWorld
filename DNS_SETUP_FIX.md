# Fix DNS Configuration for paposdesnac.com

## The Problem
GitHub is showing: **"DNS check unsuccessful"** because your domain isn't pointing to GitHub's servers yet.

## The Solution
Add DNS A records at your domain registrar (where you bought the domain).

## Step-by-Step Instructions

### Step 1: Find Your Domain Registrar

Your domain is registered at one of these places:
- **GoDaddy**
- **Namecheap**
- **Google Domains**
- **Cloudflare**
- **Network Solutions**
- **Other registrar**

Check your email for purchase confirmation, or log into common registrars you use.

### Step 2: Access DNS Management

Once you're logged into your domain registrar:

**GoDaddy:**
1. Go to "My Products"
2. Find `paposdesnac.com`
3. Click "DNS" or "Manage DNS"

**Namecheap:**
1. Go to "Domain List"
2. Click "Manage" next to `paposdesnac.com`
3. Go to "Advanced DNS" tab

**Google Domains:**
1. Go to "My domains"
2. Click on `paposdesnac.com`
3. Click "DNS" in left sidebar

**Cloudflare:**
1. Select your domain
2. Go to "DNS" → "Records"

### Step 3: Add A Records

Delete any existing A records for `@` (or root domain), then add these **4 A records**:

```
Type: A
Name: @ (or leave blank, or "paposdesnac.com")
Value: 185.199.108.153
TTL: 3600 (or default/auto)

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

**Important Notes:**
- The "Name" field might be `@`, blank, or `paposdesnac.com` depending on your registrar
- Add all 4 records (GitHub uses multiple IPs for reliability)
- Keep any existing CNAME, MX, or TXT records (don't delete those)

### Step 4: Save and Wait

1. **Save** the DNS changes
2. **Wait 5-60 minutes** for DNS to propagate
3. Go back to GitHub and click **"Check again"** button
4. The error should clear and HTTPS will become available

### Step 5: Verify DNS Propagation

You can check if DNS is working:
- Visit: https://dnschecker.org
- Enter: `paposdesnac.com`
- Select: "A" record type
- Check if it shows the GitHub IPs (185.199.108.x, 109.x, 110.x, 111.x)

## Common Issues

**"Name field" confusion:**
- Some registrars use `@` for root domain
- Some use blank/empty field
- Some require `paposdesnac.com`
- Check your registrar's documentation

**DNS not updating:**
- Can take up to 24 hours (usually 5-60 minutes)
- Clear your browser cache
- Try different DNS servers (8.8.8.8, 1.1.1.1)

**Still not working after 24 hours:**
- Double-check all 4 A records are added
- Make sure no conflicting CNAME records exist for `@`
- Contact your registrar's support

## After DNS Works

Once GitHub's DNS check passes:
1. ✅ The red error will disappear
2. ✅ "Enforce HTTPS" checkbox will become available
3. ✅ Check "Enforce HTTPS" to enable SSL
4. ✅ Your site will be live at `https://paposdesnac.com`

## Quick Reference: GitHub Pages IPs

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

These are the 4 IP addresses you need to point your domain to.


