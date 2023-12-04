const client = require('./client.js');

const createTask = async (name) => {
	try {
		const { rows: [task] } = await client.query(`
			INSERT INTO tasks (name)
			VALUES ('${name}')
			RETURNING *;
		`)
		return task;
	} catch (err) {
		console.log(err);
	}
}

module.exports = { createTask };