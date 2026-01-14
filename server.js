const express = require('express');
const cors = require('cors');
const axios = require('axios');
const stripe = require('stripe');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// PayPal configuration
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || 'AXAzi9txkuDcg3jPwu8ooaMCG0PWjAy01RAq9_BPznGD4hIdLTqbUJC1djj95cb8m8OVFmTymJaIqc73';
const PAYPAL_SECRET = process.env.PAYPAL_SECRET; // Must be set in .env file
const PAYPAL_BASE_URL = process.env.PAYPAL_BASE_URL || 'https://api-m.sandbox.paypal.com';

// Flavor data (matching frontend FLAVORS object)
const FLAVORS = {
  granola: { name: "Granola Cereal Fox-Nut", price: "$15.00" },
  jamaican: { name: "Jamaican Jungle Flame", price: "$15.00" },
  cafe: { name: "Café Con Crunch", price: "$15.00" },
  zaatar: { name: "Za'atar", price: "$15.00" },
  pumpkin: { name: "Candied Pumpkin", price: "$15.00" },
  orange: { name: "Orange Maple", price: "$15.00" },
  pearlz: { name: "Pearlz", price: "$15.00" },
  tomatoeouy: { name: "Tomatoe'ouy", price: "$15.00" },
  evergreenglow: { name: "Evergreen Glow", price: "$15.00" },
  totallynutz: { name: "Totally Nutz", price: "$15.00" },
  barbecue: { name: "Barbecue", price: "$15.00" },
  bagel: { name: "Everything Bagel", price: "$15.00" },
};

// Stripe configuration
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'YOUR_STRIPE_SECRET_KEY'; // Replace with your Stripe key or set via environment variable
const stripeClient = stripe(STRIPE_SECRET_KEY);

// Get PayPal access token
async function getPayPalAccessToken() {
  try {
    if (!PAYPAL_SECRET) {
      throw new Error('PAYPAL_SECRET is not set in environment variables');
    }

    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
    
    console.log('Requesting PayPal access token from:', `${PAYPAL_BASE_URL}/v1/oauth2/token`);
    
    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (!response.data.access_token) {
      throw new Error('No access token in PayPal response');
    }

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting PayPal access token:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('No response received:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    throw new Error(`Failed to get PayPal access token: ${error.response?.data?.error_description || error.message}`);
  }
}

// Generate PayPal client token
async function generatePayPalClientToken(accessToken) {
  try {
    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v1/identity/generate-token`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.client_token;
  } catch (error) {
    console.error('Error generating PayPal client token:', error.response?.data || error.message);
    throw new Error('Failed to generate PayPal client token');
  }
}

// Endpoint: Get PayPal client token
app.post('/paypal-api/client-token', async (req, res) => {
  try {
    console.log('Received request for client token');
    
    if (!PAYPAL_SECRET) {
      console.error('PAYPAL_SECRET is not set');
      return res.status(500).json({ 
        error: 'PayPal secret not configured. Please set PAYPAL_SECRET in .env file.' 
      });
    }

    console.log('PAYPAL_SECRET is set, getting access token...');
    
    // Get access token
    const accessToken = await getPayPalAccessToken();
    console.log('Access token received, generating client token...');
    
    // Generate client token
    const clientToken = await generatePayPalClientToken(accessToken);
    console.log('Client token generated successfully');

    res.json({ clientToken });
  } catch (error) {
    console.error('Error in /paypal-api/client-token:', error);
    res.status(500).json({ 
      error: 'Failed to generate client token',
      message: error.message 
    });
  }
});

// Endpoint: Create PayPal order (for Expanded Checkout)
app.post('/api/orders', async (req, res) => {
  try {
    console.log('Received request to create PayPal order');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    if (!PAYPAL_SECRET) {
      console.error('PAYPAL_SECRET is not set');
      return res.status(500).json({ 
        error: 'PayPal secret not configured. Please set PAYPAL_SECRET in .env file.' 
      });
    }

    const { cart } = req.body;

    if (!cart || cart.length === 0) {
      console.error('Cart is empty or missing');
      return res.status(400).json({ 
        error: 'Cart is empty',
        message: 'Please add items to cart before checkout' 
      });
    }

    // Calculate order total from cart
    let total = 0;
    const items = [];
    
    cart.forEach(item => {
      // Find the flavor to get price
      const flavor = FLAVORS[item.id];
      if (flavor) {
        const price = parseFloat(flavor.price?.replace('$', '') || '15.00');
        const quantity = parseInt(item.quantity) || 1;
        total += price * quantity;
        
        items.push({
          name: flavor.name,
          quantity: quantity.toString(),
          unit_amount: {
            currency_code: "USD",
            value: price.toFixed(2)
          }
        });
      } else {
        console.warn(`Flavor not found for item ID: ${item.id}`);
      }
    });

    if (total <= 0) {
      console.error('Total is 0 or negative');
      return res.status(400).json({ 
        error: 'Invalid total',
        message: 'Order total must be greater than 0' 
      });
    }

    // Build order payload
    const orderPayload = {
      intent: "CAPTURE",
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: total.toFixed(2),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: total.toFixed(2)
            }
          }
        },
        items: items
      }]
    };

    console.log('Order payload:', JSON.stringify(orderPayload, null, 2));

    // Get access token
    console.log('Getting PayPal access token...');
    const accessToken = await getPayPalAccessToken();
    console.log('Access token received');

    // Create order with PayPal
    console.log('Creating order with PayPal...');
    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v2/checkout/orders`,
      orderPayload,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Order created successfully:', response.data.id);
    res.json(response.data);
  } catch (error) {
    console.error('Error creating PayPal order:');
    console.error('Error message:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
      res.status(error.response.status || 500).json({ 
        error: 'Failed to create order',
        message: error.response.data || error.message 
      });
    } else if (error.request) {
      console.error('No response received from PayPal');
      res.status(500).json({ 
        error: 'Failed to create order',
        message: 'No response from PayPal API' 
      });
    } else {
      console.error('Error setting up request:', error.message);
      res.status(500).json({ 
        error: 'Failed to create order',
        message: error.message 
      });
    }
  }
});

// Endpoint: Create PayPal order (legacy endpoint for v6 SDK)
app.post('/paypal-api/checkout/orders/create', async (req, res) => {
  try {
    if (!PAYPAL_SECRET) {
      return res.status(500).json({ 
        error: 'PayPal secret not configured. Please set PAYPAL_SECRET in .env file.' 
      });
    }

    const orderPayload = req.body;

    // Get access token
    const accessToken = await getPayPalAccessToken();

    // Create order with PayPal
    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v2/checkout/orders`,
      orderPayload,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error creating PayPal order:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to create order',
      message: error.response?.data || error.message 
    });
  }
});

// Endpoint: Capture PayPal order (for Expanded Checkout)
app.post('/api/orders/:orderID/capture', async (req, res) => {
  try {
    if (!PAYPAL_SECRET) {
      return res.status(500).json({ 
        error: 'PayPal secret not configured. Please set PAYPAL_SECRET in .env file.' 
      });
    }

    const { orderID } = req.params;

    // Get access token
    const accessToken = await getPayPalAccessToken();

    // Capture order
    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error capturing PayPal order:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to capture order',
      message: error.response?.data || error.message 
    });
  }
});

// Endpoint: Capture PayPal order (legacy endpoint for v6 SDK)
app.post('/paypal-api/checkout/orders/:orderId/capture', async (req, res) => {
  try {
    if (!PAYPAL_SECRET) {
      return res.status(500).json({ 
        error: 'PayPal secret not configured. Please set PAYPAL_SECRET in .env file.' 
      });
    }

    const { orderId } = req.params;

    // Get access token
    const accessToken = await getPayPalAccessToken();

    // Capture order
    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error capturing PayPal order:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to capture order',
      message: error.response?.data || error.message 
    });
  }
});

// Stripe: Create Payment Intent
app.post('/stripe-api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', items } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        error: 'Invalid amount',
        message: 'Amount must be greater than 0' 
      });
    }

    // Create payment intent
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: currency,
      metadata: {
        items: JSON.stringify(items || []),
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ 
      clientSecret: paymentIntent.client_secret 
    });
  } catch (error) {
    console.error('Error creating Stripe payment intent:', error);
    res.status(500).json({ 
      error: 'Failed to create payment intent',
      message: error.message 
    });
  }
});

// Stripe: Confirm Payment Intent (optional - usually handled client-side)
app.post('/stripe-api/confirm-payment-intent', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({ 
        error: 'Payment intent ID is required' 
      });
    }

    const paymentIntent = await stripeClient.paymentIntents.retrieve(paymentIntentId);
    
    res.json({ 
      status: paymentIntent.status,
      paymentIntent 
    });
  } catch (error) {
    console.error('Error confirming Stripe payment intent:', error);
    res.status(500).json({ 
      error: 'Failed to confirm payment intent',
      message: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Serve static files AFTER API routes (so API routes are matched first)
app.use(express.static('.'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`PayPal Client ID: ${PAYPAL_CLIENT_ID}`);
  if (!PAYPAL_SECRET) {
    console.warn('⚠️  WARNING: PAYPAL_SECRET not set. Please add it to your .env file.');
  }
});

