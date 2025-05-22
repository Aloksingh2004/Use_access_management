const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getRepository } = require('typeorm');
const User = require('../entities/User');

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userRepo = getRepository('User');
    const existing = await userRepo.findOne({ where: { username } });
    if (existing) return res.status(400).json({ message: 'Username already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = userRepo.create({ username, password: hashed, role: 'Employee' });
    await userRepo.save(user);
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ message: 'Signup error', error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userRepo = getRepository('User');
    const user = await userRepo.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};

module.exports = { signup, login }; 