const fs = require('fs'),
	path = require('path'),
	os = require('os'),
	Canvas = require('canvas'),
	uuid = require('uuid');

const W = 384;
const H = 384;

const intFromRange = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const S1 = intFromRange(50, 100);
const S2 = intFromRange(100, 150);
const S3 = intFromRange(150, 200);
const S4 = intFromRange(200, 250);
const S5 = intFromRange(250, 300);
const squares = [S1, S2, S3, S4, S5];

const drawSquares = (ctx) => {
	squares.forEach((square) => {
		ctx.save();
		ctx.lineWidth = intFromRange(3, 20);
		ctx.translate(W/2, H/2);
		ctx.rotate(intFromRange(0, 90)*Math.PI/180);
		ctx.strokeRect(-(W-square)/2, -(H-square)/2, W-square, H-square);
		ctx.restore();
	});
};

const getData = (cb) => {
	console.log('Squares');
	const canvas = new Canvas(W, H);
	const ctx = canvas.getContext('2d');
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, W, H);
	ctx.fillStyle = "#000000";
	ctx.lineWidth = 20;
	ctx.strokeRect(20/2, 20/2, W-20, H-20);
	drawSquares(ctx);

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
