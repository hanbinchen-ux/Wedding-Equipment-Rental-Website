const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON request bodies
app.use(express.json());

// Serve static frontend files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Simulated checkout API endpoint
app.post('/api/checkout', (req, res) => {
  const { customer, items, paymentMethod, total } = req.body;

  if (!customer || !items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid order data.' });
  }

  // Generate mock Order Reference
  const orderId = 'EVL-' + Math.floor(100000 + Math.random() * 900000);

  // Return success payload with Australian bank transfer placeholders if selected
  res.json({
    success: true,
    orderId,
    total,
    paymentMethod,
    bankDetails: paymentMethod === 'bank_transfer' ? {
      accountName: 'Everlune Bridal Pty Ltd',
      commBank: { bsb: '062-000', acc: '1234 5678', bank: 'Commonwealth Bank of Australia' },
      nab: { bsb: '082-001', acc: '8765 4321', bank: 'National Australia Bank' },
      westpac: { bsb: '032-002', acc: '2468 1357', bank: 'Westpac Banking Corporation' },
      anz: { bsb: '012-003', acc: '1357 2468', bank: 'ANZ Bank' },
      reference: orderId
    } : null
  });
});

app.listen(PORT, () => {
  console.log(`Everlune server running at http://localhost:${PORT}`);
});