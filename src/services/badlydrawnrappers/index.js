const path = require('path');

const intFromRange = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getData = (cb) => {
	console.log('Badly drawn rappers');
	const filename = path.join(__dirname, 'img', `${intFromRange(23, 23)}.png`);
	cb(filename);
};

module.exports = getData;
