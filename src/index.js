const SerialPort = require('serialport'),
	Printer = require('thermalprinter'),
	serialPort = new SerialPort('/dev/ttyUSB0', {
		baudrate: 19200
	}),
	opts = {
		maxPrintingDots: 15,
		heatingTime: 150,
		heatingInterval: 2,
		commandDelay: 3
	};

const intFromRange = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const services = [
	require('./services/edwardlear'),
	require('./services/newyorker'),
	require('./services/lines'),
	require('./services/rosace'),
	require('./services/squares'),
	require('./services/badlydrawnrappers'),
];

const getRandomService = (cb) => {
	services[intFromRange(5, 5)](cb);
	// services[intFromRange(0, services.length - 1)](cb);
};

serialPort.on('open', () => {
	const printer = new Printer(serialPort, opts);
	printer.on('ready', () => {
		getRandomService((img, lines) => {
			if (img) {
				console.log(img);
				printer.printImage(img);
			}
			if (lines) {
				console.log(lines);
				printer.center();
				lines.forEach((line) => {
					printer.printLine(line);
				});
			}
			printer
				.lineFeed(2)
				.print(() => {
					console.log('done');
					process.exit();
				});
		});
	});
});
