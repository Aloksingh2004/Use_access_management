const { getRepository } = require('typeorm');
const Software = require('../entities/Software');

const createSoftware = async (req, res) => {
  try {
    const { name, description, accessLevels } = req.body;
    if (!name || !description || !accessLevels) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    const softwareRepo = getRepository('Software');
    const software = softwareRepo.create({ name, description, accessLevels });
    await softwareRepo.save(software);
    res.status(201).json({ message: 'Software created', software });
  } catch (err) {
    res.status(500).json({ message: 'Error creating software', error: err.message });
  }
};

const listSoftware = async (req, res) => {
  try {
    const softwareRepo = getRepository('Software');
    const allSoftware = await softwareRepo.find();
    res.json(allSoftware);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching software', error: err.message });
  }
};

module.exports = { createSoftware, listSoftware }; 