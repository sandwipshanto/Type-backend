const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/users');
const testRoutes = require('./routes/testRoutes');
const settingRoutes = require('./routes/settingRoutes');
const textRoutes = require('./routes/textRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/health', (_req, res) => res.sendStatus(200));
app.use('/api/users', userRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/texts', textRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));