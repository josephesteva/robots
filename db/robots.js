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

module.exports = { createRobot }