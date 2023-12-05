const express = require('express');
const router = express.Router();

// ROUTER: /api/v1/robots
router.use('/robots', require('./robots.cjs'));

// ROUTER: /api/v1/tasks
router.use('/tasks', require('./tasks.cjs'));

module.exports = router;