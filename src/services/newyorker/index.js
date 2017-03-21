const request = require('request'),
	fs = require('fs'),
	os = require('os'),
	path = require('path'),
	uuid = require('uuid'),
	sharp = require('sharp'),
	url = 'http://www.newyorker.com/cartoons/random/randomAPI1';

const getRandom = (cb) => {
	request(url, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			const bodyRes = JSON.parse(body);
			const d = new Date(bodyRes[0].date);
			const date = `${d.getDate()}/${d.getMonth() +1 }/${d.getFullYear()}`;
			cb({ src: bodyRes[0].src, date });
		}
		else {
			console.log(`Got an error: ${error}, status code: ${response.statusCode}`);
		}
	});
};

const getImage = (uri, cb) => {
	const filename = path.join(os.tmpdir(), `${uuid.v1()}`);
	request(uri).pipe(fs.createWriteStream(filename)).on('close', () => { cb(filename) });
};

const getData = (cb) => {
	console.log('New Yorker');
	getRandom((data) => {
		getImage(data.src, (filename) => {
			sharp(filename).resize(384).toFile(`${filename}-s.jpg`, (err) => {
				cb(`${filename}-s.jpg`, [`Publié le ${data.date}`]);
			});
		});
	});
};

module.exports = getData;
