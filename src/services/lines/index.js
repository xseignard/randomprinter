const fs = require('fs'),
	path = require('path'),
	os = require('os'),
	Canvas = require('canvas'),
	uuid = require('uuid');

const WIDTH = 384;
const HEIGHT = 384;

const intFromRange = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const drawLine = (ctx) => {
	const xOrigin = Math.random() > 0.5 ? 0 : WIDTH;
	const yOrigin = intFromRange(0, HEIGHT);
	const yDestination = Math.random() > 0.5 ? 0 : HEIGHT;
	const xDestination = intFromRange(0, WIDTH);
	ctx.lineWidth = intFromRange(1, 5);
	ctx.beginPath();
	ctx.moveTo(xOrigin, yOrigin);
	ctx.lineTo(xDestination, yDestination);
	ctx.stroke();
};

const getData = (cb) => {
	console.log('Lines');
	const canvas = new Canvas(WIDTH, HEIGHT);
	const ctx = canvas.getContext('2d');
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	ctx.strokeRect(0, 0, WIDTH, HEIGHT);
	for (let i = 0; i < intFromRange(100, 250); i++) {
		drawLine(ctx);
	}

	const filename = path.join(os.tmpdir(), `${uuid.v1()}.png`);
	const stream = canvas.pngStream();
	const out = fs.createWriteStream(filename);
	stream.on('data', (chunk) => {
		out.write(chunk);
	});

	stream.on('end', () => {
		const d = new Date();
		const date = `${d.getDate()}/${d.getMonth() +1 }/${d.getFullYear()}`;
		setTimeout(() => {
			cb(filename, [`Généré le ${date}`]);
		}, 100);
	});
};

module.exports = getData;
