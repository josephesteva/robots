const client = require('./client.js');

const createRobot = async (name, model, company, imgUrl, warrantyMonths, isChildSafe, releaseDate) => {
	try {
		const {rows: [robot] } = await client.query(`
		INSERT INTO robots (name, model, company, img_url, warranty_months, is_child_safe, release_date)
		VALUES ('${name}', '${model}', '${company}', '${imgUrl}', ${warrantyMonths}, ${isChildSafe}, '${releaseDate}')
		RETURNING *;
		`)
		return robot;
	} catch (err) {
		console.log(err);
	}
}

const getAllRobots = async () => {
	try {
		const { rows } = await client.query(`
		SELECT * FROM robots;
		`);
		return rows;
	} catch (err) {
		console.log(err)
	}
}

const getSingleRobot = async (robotId) => {
	try {
		const {rows} = await client.query(`
		SELECT * FROM robots
		WHERE robots.id = ${robotId};
		`);
		return rows;
	} catch (err) {
		console.log(err);
	}
}

const getRobotsbyTask = async (taskId) => {
	try {
		const {rows} = await client.query(`
		SELECT * FROM robots
		JOIN robots_tasks
		ON robots.id = robots_tasks.robot_id
		WHERE robots_tasks.task_id = ${taskId};
		`)
		return rows;
	} catch(err) {
		console.log(err);
	}
}

module.exports = { createRobot, getAllRobots, getSingleRobot, getRobotsbyTask };