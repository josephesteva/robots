const { getAllRobots, getSingleRobot, getRobotsbyTask } = require('../db/robots.cjs')

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	const robots = await getAllRobots();
	res.send(robots);
});

router.get('/:id', async (req, res) => {
	const robot = await getSingleRobot(req.params.id);
	res.send(robot);
})

router.get('/task/:id', async (req, res) => {
	const robots = await getRobotsbyTask(req.params.id);
	res.send(robots);
})

module.exports = router;