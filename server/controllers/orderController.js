import pool from '../config/db.js';
import { createSmmOrder } from '../services/smmService.js';

export const getServices = async (req, res) => {
  try {
    const [services] = await pool.query('SELECT * FROM services');
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createOrder = async (req, res) => {
  const { serviceId, link, quantity } = req.body;
  const userId = req.user.id;

  try {
    // 1. Get service details
    const [services] = await pool.query('SELECT * FROM services WHERE id = ?', [serviceId]);
    if (services.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    const service = services[0];

    // 2. Validate quantity
    if (quantity < service.min_order || quantity > service.max_order) {
      return res.status(400).json({ error: `Quantity must be between ${service.min_order} and ${service.max_order}` });
    }

    // 3. Calculate total price
    const servicePrice = parseFloat(service.price);
    const totalPrice = parseFloat(((quantity / 1000) * servicePrice).toFixed(4));

    // 4. Check user balance
    const [users] = await pool.query('SELECT balance FROM users WHERE id = ?', [userId]);
    const user = users[0];
    if (parseFloat(user.balance) < totalPrice) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // 5. Deduct balance
    await pool.query('UPDATE users SET balance = balance - ?, spent = spent + ? WHERE id = ?', [totalPrice, totalPrice, userId]);

    // 6. Send request to 3rd party SMM API
    let providerOrderId = null;
    try {
      providerOrderId = await createSmmOrder(service.smm_provider_id || service.id, link, quantity);
    } catch (smmError) {
      // Refund user if API fails
      await pool.query('UPDATE users SET balance = balance + ?, spent = spent - ? WHERE id = ?', [totalPrice, totalPrice, userId]);
      return res.status(500).json({ error: 'Failed to place order with provider. Balance refunded.' });
    }

    // 7. Save order in database
    const orderId = `ORD-${Date.now()}`;
    await pool.query(
      'INSERT INTO orders (id, user_id, service_id, link, quantity, price, status, smm_api_order_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [orderId, userId, serviceId, link, quantity, totalPrice, 'processing', providerOrderId]
    );

    res.status(201).json({
      message: 'Order placed successfully',
      orderId,
      status: 'processing',
      price: totalPrice
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const [orders] = await pool.query(`
      SELECT o.*, s.name as service_name, s.platform 
      FROM orders o
      JOIN services s ON o.service_id = s.id
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
    `, [req.user.id]);
    
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const addFunds = async (req, res) => {
  const { amount, method, proof } = req.body;
  const userId = req.user.id;

  try {
    if (!amount || !method || !proof) {
      return res.status(400).json({ error: 'Please provide amount, method, and proof' });
    }

    const usdAmount = amount / 280; // Assuming 1 USD = 280 PKR for now
    const paymentId = `PAY-${Date.now()}`;

    await pool.query(
      'INSERT INTO payments (id, user_id, amount, usd_amount, method, proof, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [paymentId, userId, amount, usdAmount, method, proof, 'pending']
    );

    res.status(201).json({ message: 'Payment submitted for approval', paymentId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
