const express = require('express');
const router = express.Router();

// ROUTER: /api/v1/robots
router.use('/robots', require('./robots'));

// ROUTER: /api/v1/tasks
router.use('/tasks', require('./tasks'));

module.exports = router;