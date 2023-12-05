const client = require('./client');

const createRobotTask = async (robotId, taskId) => {
	try {
		await client.query(`
			INSERT INTO robots_tasks (robot_id, task_id)
			VALUES (${robotId}, ${taskId})
		`)
	} catch (err) {
		console.log(err);
	}
}

module.exports = {createRobotTask}