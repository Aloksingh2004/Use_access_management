const express = require('express');
const router = express.Router();
const { submitRequest, approveOrRejectRequest, listPendingRequests } = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Employee submits request
router.post('/', authMiddleware, roleMiddleware(['Employee']), submitRequest);
// Manager approves/rejects
router.patch('/:id', authMiddleware, roleMiddleware(['Manager']), approveOrRejectRequest);
// Manager lists pending
router.get('/pending', authMiddleware, roleMiddleware(['Manager']), listPendingRequests);

module.exports = router; 