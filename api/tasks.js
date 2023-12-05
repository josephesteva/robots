const {getAllTasks} = require('../db/tasks.js')

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	const tasks = await getAllTasks();
	res.send(tasks)
});

module.exports = router;