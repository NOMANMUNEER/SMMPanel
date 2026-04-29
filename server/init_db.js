import mysql from 'mysql2/promise';

async function initDB() {
  console.log("Initializing database...");
  
  // Connect without database selected first to create it
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
  });

  try {
    await connection.query('CREATE DATABASE IF NOT EXISTS smmpanel;');
    console.log("Database created or already exists.");
    
    await connection.query('USE smmpanel;');
    
    // Create Users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        balance DECIMAL(10, 2) DEFAULT 0.00,
        role ENUM('user', 'admin') DEFAULT 'user',
        status ENUM('active', 'suspended') DEFAULT 'active',
        spent DECIMAL(10, 2) DEFAULT 0.00,
        referral_code VARCHAR(20),
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Create Services table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        platform VARCHAR(50) NOT NULL,
        category VARCHAR(50) NOT NULL,
        price DECIMAL(10, 4) NOT NULL,
        min_order INT NOT NULL,
        max_order INT NOT NULL,
        delivery_time VARCHAR(50),
        quality VARCHAR(50),
        smm_provider_id INT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Create Orders table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(50) PRIMARY KEY,
        user_id INT NOT NULL,
        service_id INT NOT NULL,
        link VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
        smm_api_order_id VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (service_id) REFERENCES services(id)
      );
    `);
    
    // Create Payments table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id VARCHAR(50) PRIMARY KEY,
        user_id INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        usd_amount DECIMAL(10, 2) NOT NULL,
        method VARCHAR(50) NOT NULL,
        proof VARCHAR(100) NOT NULL,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);

    console.log("Tables created successfully.");

    // Insert dummy admin if no admin exists
    const [admins] = await connection.query("SELECT * FROM users WHERE role = 'admin'");
    if (admins.length === 0) {
      // password is 'admin123'
      const bcrypt = await import('bcryptjs');
      const hash = await bcrypt.hash('admin123', 10);
      await connection.query(`
        INSERT INTO users (username, email, password, role) 
        VALUES ('admin', 'admin@smmpanel.pk', ?, 'admin')
      `, [hash]);
      console.log("Admin user created (admin / admin123)");
    }
    
    // Insert some default services
    const [services] = await connection.query("SELECT * FROM services");
    if (services.length === 0) {
        await connection.query(`
            INSERT INTO services (name, platform, category, price, min_order, max_order, delivery_time, quality) VALUES
            ('Instagram Followers', 'instagram', 'Followers', 0.8, 100, 50000, '0-1 hour', 'High'),
            ('Instagram Likes', 'instagram', 'Likes', 0.3, 50, 100000, 'Instant', 'Real'),
            ('TikTok Followers', 'tiktok', 'Followers', 0.9, 100, 50000, '0-2 hours', 'Real'),
            ('YouTube Subscribers', 'youtube', 'Subscribers', 2.5, 50, 10000, '1-12 hours', 'Real')
        `);
        console.log("Default services created.");
    }

  } catch (error) {
    console.error("Database initialization failed:", error);
  } finally {
    await connection.end();
  }
}

initDB();
