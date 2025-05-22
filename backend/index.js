require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createConnection } = require('typeorm');
const User = require('./entities/User');
const Software = require('./entities/Software');
const Request = require('./entities/Request');
const authRoutes = require('./routes/authRoutes');
const softwareRoutes = require('./routes/softwareRoutes');
const requestRoutes = require('./routes/requestRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('User Access Management System API');
});

app.use('/api/auth', authRoutes);
app.use('/api/software', softwareRoutes);
app.use('/api/requests', requestRoutes);

createConnection({
  ...require('./ormconfig'),
  entities: [User, Software, Request],
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Database connection error:', error);
}); 