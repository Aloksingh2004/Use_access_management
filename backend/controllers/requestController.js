const { getRepository } = require('typeorm');
const Request = require('../entities/Request');
const User = require('../entities/User');
const Software = require('../entities/Software');

const submitRequest = async (req, res) => {
  try {
    const { softwareId, accessType, reason } = req.body;
    if (!softwareId || !accessType || !reason) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    const userRepo = getRepository('User');
    const softwareRepo = getRepository('Software');
    const requestRepo = getRepository('Request');
    const user = await userRepo.findOne(req.user.id);
    const software = await softwareRepo.findOne(softwareId);
    if (!user || !software) return res.status(404).json({ message: 'User or software not found' });
    const request = requestRepo.create({ user, software, accessType, reason, status: 'Pending' });
    await requestRepo.save(request);
    res.status(201).json({ message: 'Request submitted', request });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting request', error: err.message });
  }
};

const approveOrRejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'Approved' or 'Rejected'
    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const requestRepo = getRepository('Request');
    const request = await requestRepo.findOne(id, { relations: ['user', 'software'] });
    if (!request) return res.status(404).json({ message: 'Request not found' });
    request.status = status;
    await requestRepo.save(request);
    res.json({ message: `Request ${status.toLowerCase()}`, request });
  } catch (err) {
    res.status(500).json({ message: 'Error updating request', error: err.message });
  }
};

const listPendingRequests = async (req, res) => {
  try {
    const requestRepo = getRepository('Request');
    const pending = await requestRepo.find({ where: { status: 'Pending' }, relations: ['user', 'software'] });
    res.json(pending);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching requests', error: err.message });
  }
};

module.exports = { submitRequest, approveOrRejectRequest, listPendingRequests }; 