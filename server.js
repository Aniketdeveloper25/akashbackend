const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const serviceRoutes = require('./routes/service.routes');
const barberRoutes = require('./routes/barber.routes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/barbers', barberRoutes);

// Simple route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Aakash Salon API' });
});

// Set port
const PORT = process.env.PORT || 8081;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});