const express = require('express');
const connectDB = require('./db');
const mistakeRoutes = require('./routes/mistakeRoutes');
const textRoutes = require('./routes/textRoutes');
const cors = require('cors')

const app = express();

connectDB();

app.use(cors())

app.use(express.json());

// Use the routes
app.use('/api', mistakeRoutes);
app.use('/api/texts', textRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  