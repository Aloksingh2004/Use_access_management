const express = require('express');
const router = express.Router();
const { createSoftware, listSoftware } = require('../controllers/softwareController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware(['Admin']), createSoftware);

module.exports = router; 