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

const getData = (cb) => {
	console.log('Rosace');
	const canvas = new Canvas(W, H);
	const ctx = canvas.getContext('2d');
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, W, H);
	ctx.fillStyle = "#000000";
	ctx.lineWidth = 1;
	ctx.strokeRect(0, 0, W, H);
	ctx.translate(W/2, H/2);

	for (let i = intFromRange(0, 50); i <= intFromRange(200, 380); i = i + 2) {
		ctx.save();
		ctx.rotate(i*Math.PI/180);
		ctx.strokeRect(-(W-i)/2, -(H-i)/2, W-i, H-i);
		ctx.restore();
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
