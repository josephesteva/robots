const client = require('./client');

const createRobotCustomer = async (robotId, customerId) => {
	try {
		await client.query(`
			INSERT into robots_customers (robot_id, customer_id)
			VALUES (${robotId}, ${customerId})
		`)
	} catch (err) {
		console.log(err);
	}
}

module.exports = {createRobotCustomer};