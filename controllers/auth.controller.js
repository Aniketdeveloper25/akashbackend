const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Log request data (excluding password)
    console.log('Registration attempt:', { name, email, phone });

    // Validate input
    if (!name || !email || !password || !phone) {
      console.log('Registration failed: Missing required fields');
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if email already exists
    const [existingUsers] = await db.query(
      'SELECT * FROM users WHERE email = ?', [email]
    );

    if (existingUsers.length > 0) {
      console.log('Registration failed: Email already exists -', email);
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create new user
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, phone]
    ).catch(err => {
      console.error('Database error during user insertion:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: "Email already exists!" });
      }
      throw err;
    });
    if (!result) {
      console.error('No result returned from database insertion');
      return res.status(500).json({ message: "Failed to create user!" });
    }

    console.log('User created successfully with ID:', result.insertId);

    // Create JWT token
    const token = jwt.sign(
      { id: result.insertId, email, role: 'user' },
      process.env.JWT_SECRET || 'aakash-salon-secret-key',
      { expiresIn: '24h' }
    );

    return res.status(201).json({
      message: "User registered successfully!",
      token,
      user: {
        id: result.insertId,
        name,
        email,
        phone,
        role: 'user'
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      message: "Server error during registration!",
      error: error.message 
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required!" });
    }

    // Find user by email
    const [users] = await db.query(
      'SELECT * FROM users WHERE email = ?', [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    const user = users[0];

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'aakash-salon-secret-key',
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error during login!" });
  }
};