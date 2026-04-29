import pool from '../config/db.js';

export const getUsers = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, username, email, balance, role, status, spent, joined_at, referral_code FROM users ORDER BY joined_at DESC');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const [orders] = await pool.query(`
      SELECT o.*, u.username, s.name as service_name, s.platform 
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN services s ON o.service_id = s.id
      ORDER BY o.created_at DESC
    `);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const [payments] = await pool.query(`
      SELECT p.*, u.username 
      FROM payments p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `);
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updatePaymentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'approved' or 'rejected'

  try {
    const [payments] = await pool.query('SELECT * FROM payments WHERE id = ?', [id]);
    if (payments.length === 0) return res.status(404).json({ error: 'Payment not found' });
    
    const payment = payments[0];
    if (payment.status !== 'pending') {
      return res.status(400).json({ error: 'Payment already processed' });
    }

    await pool.query('UPDATE payments SET status = ? WHERE id = ?', [status, id]);

    if (status === 'approved') {
      await pool.query('UPDATE users SET balance = balance + ? WHERE id = ?', [payment.usd_amount, payment.user_id]);
    }

    res.json({ message: `Payment ${status} successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'active' or 'suspended'

  try {
    await pool.query('UPDATE users SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: `User status updated to ${status}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const addService = async (req, res) => {
  const { name, platform, category, price, min_order, max_order, delivery_time, quality, smm_provider_id } = req.body;

  try {
    await pool.query(`
      INSERT INTO services (name, platform, category, price, min_order, max_order, delivery_time, quality, smm_provider_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, platform, category, price, min_order, max_order, delivery_time, quality, smm_provider_id]);
    
    res.status(201).json({ message: 'Service added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: `Order status updated to ${status}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
