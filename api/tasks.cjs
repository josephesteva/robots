const {getAllTasks, getTasksByRobot} = require('../db/tasks.cjs')

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	const tasks = await getAllTasks();
	res.send(tasks);
});

// todo
router.get('/robot/:id', async (req, res) => {
	const tasks = await getTasksByRobot(req.params.id);
	res.send(tasks);
});

module.exports = router;