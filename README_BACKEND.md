# PAPO'S World - Backend Setup Guide

This guide will help you set up the backend server for PayPal integration.

## Prerequisites

- Node.js (v14 or higher) installed on your system
- PayPal Developer Account with Client ID and Secret

## Setup Instructions

### 1. Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and add your PayPal Secret:
   ```
   PAYPAL_SECRET=your_actual_paypal_secret_here
   ```

   **Important:** 
   - Get your PayPal Secret from: https://developer.paypal.com/dashboard/
   - Never commit the `.env` file to version control
   - The `.env` file is already in `.gitignore`

### 3. Get Your PayPal Secret

1. Go to https://developer.paypal.com/dashboard/
2. Log in with your PayPal Developer account
3. Navigate to "My Apps & Credentials"
4. Find your app (or create a new one)
5. Click "Show" next to "Secret" to reveal your secret
6. Copy the secret and paste it into your `.env` file

### 4. Start the Server

Run the server:

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 5. Update Frontend (if needed)

If your backend is running on a different port or URL, update the fetch URLs in `index.html`:

- Search for `/paypal-api/` in the code
- Update the base URL if needed (default assumes same origin)

## API Endpoints

The server provides the following endpoints:

### POST `/paypal-api/client-token`
Generates a PayPal client token for SDK authentication.

**Request Body:**
```json
{
  "clientId": "your_client_id"
}
```

**Response:**
```json
{
  "clientToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST `/paypal-api/checkout/orders/create`
Creates a PayPal order.

**Request Body:**
```json
{
  "intent": "CAPTURE",
  "purchase_units": [...]
}
```

**Response:**
```json
{
  "id": "ORDER_ID",
  "status": "CREATED",
  ...
}
```

### POST `/paypal-api/checkout/orders/:orderId/capture`
Captures a PayPal order after approval.

**Response:**
```json
{
  "id": "ORDER_ID",
  "status": "COMPLETED",
  ...
}
```

## Testing

1. Make sure the server is running
2. Open your website in a browser
3. Add items to cart
4. Go to checkout
5. Select PayPal as payment method
6. The PayPal buttons should appear and work

## Production Deployment

For production:

1. Update `.env` file:
   ```
   PAYPAL_BASE_URL=https://api-m.paypal.com
   ```

2. Update the PayPal SDK URL in `index.html`:
   ```html
   <script src="https://www.paypal.com/web-sdk/v6/core" ...>
   ```

3. Deploy your backend server (Heroku, AWS, etc.)

4. Update CORS settings if needed for your domain

## Troubleshooting

### "PayPal secret not configured"
- Make sure you've created a `.env` file
- Verify `PAYPAL_SECRET` is set in the `.env` file
- Restart the server after adding the secret

### "Failed to get PayPal access token"
- Verify your PayPal Client ID and Secret are correct
- Check that you're using the correct environment (sandbox vs production)
- Make sure your PayPal app is active in the developer dashboard

### CORS errors
- The server includes CORS middleware
- If you still get CORS errors, check your browser console
- Make sure the frontend is making requests to the correct server URL

## Security Notes

- Never commit `.env` file to version control
- Keep your PayPal Secret secure
- Use environment variables for all sensitive data
- In production, use HTTPS for all API calls




