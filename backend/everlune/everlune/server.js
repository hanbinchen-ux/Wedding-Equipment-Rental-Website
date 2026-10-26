
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON request bodies
app.use(express.json());

// Serve static frontend files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const products = [
  {
    id: 'wd-01',
    name: 'Classic White Wedding Dress',
    category: 'dresses',
    price: 500,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Elegant classic white wedding dress'
  },
  {
    id: 'wd-02',
    name: 'Princess Ball Gown',
    category: 'dresses',
    price: 650,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Beautiful princess-style wedding gown'
  },
  {
    id: 'wd-03',
    name: 'Lace Mermaid Wedding Dress',
    category: 'dresses',
    price: 580,
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Elegant mermaid wedding dress'
  },
  {
    id: 'wd-04',
    name: 'Satin A-Line Wedding Dress',
    category: 'dresses',
    price: 450,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Simple satin A-line wedding dress'
  },
  {
    id: 'wd-05',
    name: 'Off-Shoulder Wedding Gown',
    category: 'dresses',
    price: 620,
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Romantic off-shoulder bridal gown'
  },
  {
    id: 'wd-06',
    name: 'Vintage Lace Wedding Dress',
    category: 'dresses',
    price: 550,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Vintage-inspired wedding dress'
  },
  {
    id: 'tx-01',
    name: 'Classic Black Tuxedo',
    category: 'tuxedos',
    price: 300,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Classic black tuxedo'
  },
  {
    id: 'tx-02',
    name: 'Navy Blue Tuxedo',
    category: 'tuxedos',
    price: 320,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Modern navy blue tuxedo'
  },
  {
    id: 'tx-03',
    name: 'White Dinner Jacket',
    category: 'tuxedos',
    price: 350,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Elegant white dinner jacket'
  },
  {
    id: 'tx-04',
    name: 'Charcoal Grey Suit',
    category: 'tuxedos',
    price: 280,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Charcoal grey formal suit'
  },
  {
    id: 'tx-05',
    name: 'Burgundy Velvet Tuxedo',
    category: 'tuxedos',
    price: 380,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Luxury burgundy velvet tuxedo'
  },
  {
    id: 'tx-06',
    name: 'Beige Wedding Suit',
    category: 'tuxedos',
    price: 290,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Light beige wedding suit'
  },
  {
    id: 'bq-01',
    name: 'Classic Rose Bouquet',
    category: 'bouquets',
    price: 80,
    sizes: ['Standard'],
    description: 'White and pink rose bouquet'
  },
  {
    id: 'bq-02',
    name: 'Luxury Bridal Bouquet',
    category: 'bouquets',
    price: 120,
    sizes: ['Standard'],
    description: 'Premium mixed-flower bouquet'
  },
  {
    id: 'pk-01',
    name: 'Complete Wedding Package',
    category: 'packages',
    price: 950,
    sizes: ['Standard'],
    description: 'Wedding dress, tuxedo and bouquet package'
  }
];

const orders = [];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  res.json(product);
});

// Simulated checkout API endpoint
app.post('/api/checkout', (req, res) => {
  const { customer, items, paymentMethod } = req.body || {};

  if (
    !customer ||
    typeof customer.name !== 'string' ||
    !customer.name.trim() ||
    typeof customer.email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)
  ) {
    return res.status(400).json({
      success: false,
      message: 'Invalid customer information.'
    });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Shopping cart is empty.'
    });
  }

  if (paymentMethod !== 'bank_transfer' && paymentMethod !== 'cod') {
    return res.status(400).json({
      success: false,
      message: 'Invalid payment method.'
    });
  }

  let total = 0;
  const orderItems = [];

  for (const item of items) {
    if (!item || typeof item !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid item.'
      });
    }

    const product = products.find(p => p.id === item.id);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: `Product ${item.id} not found.`
      });
    }

    const quantity = item.quantity ?? item.qty ?? 1;

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      return res.status(400).json({
        success: false,
        message: 'Invalid quantity.'
      });
    }

    const size = item.size ?? (
      product.sizes.length === 1 ? product.sizes[0] : null
    );

    if (!product.sizes.includes(size)) {
      return res.status(400).json({
        success: false,
        message: `Invalid size for ${product.name}.`
      });
    }

    const subtotal = product.price * quantity;
    total += subtotal;

    orderItems.push({
      id: product.id,
      name: product.name,
      size,
      quantity,
      price: product.price,
      subtotal
    });
  }

  // Generate mock Order Reference
  const orderId = 'EVL-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

  const order = {
    orderId,
    customer,
    items: orderItems,
    paymentMethod,
    total,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  orders.push(order);

  console.log('New order received:', orderId);
  console.log('Order total:', total);

  // Return success payload with Australian bank transfer placeholders if selected
  res.status(201).json({
    success: true,
    message: 'Order placed successfully.',
    orderId,
    total,
    paymentMethod,
    bankDetails: paymentMethod === 'bank_transfer' ? {
      accountName: 'DEMO ONLY - DO NOT PAY',
      commBank: {
        bsb: 'NOT SET',
        acc: 'NOT SET',
        bank: 'Commonwealth Bank (Demo)'
      },
      nab: {
        bsb: 'NOT SET',
        acc: 'NOT SET',
        bank: 'NAB (Demo)'
      },
      westpac: {
        bsb: 'NOT SET',
        acc: 'NOT SET',
        bank: 'Westpac (Demo)'
      },
      anz: {
        bsb: 'NOT SET',
        acc: 'NOT SET',
        bank: 'ANZ (Demo)'
      },
      reference: orderId
    } : null
  });
});

app.get('/api/orders/count', (req, res) => {
  res.json({
    success: true,
    count: orders.length
  });
});

app.listen(PORT, () => {
  console.log(`Everlune server running at http://localhost:${PORT}`);
});
