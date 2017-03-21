const path = require('path'),
	nonsense = require('./nonsense');

const intFromRange = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getData = (cb) => {
	console.log('Edward Lear');
	const data = nonsense[intFromRange(0, 26)];
	const filename = path.join(__dirname, 'img', `${data.letter}.png`);
	cb(filename, data.prose);
};

module.exports = getData;
