const SerialPort = require('serialport'),
	Printer = require('thermalprinter'),
	path = require('path'),
	serialPort = new SerialPort('/dev/ttyUSB0', {
		baudrate: 19200
	}),
	opts = {
		maxPrintingDots: 15,
		heatingTime: 150,
		heatingInterval: 2,
		commandDelay: 3
	};

serialPort.on('open', () => {
	const printer = new Printer(serialPort, opts);
	printer.on('ready', () => {
		for (let i = 1; i <= 20; i++) {
			const img = path.join(__dirname, 'img', `img_${i}.png`);
			printer.printImage(img);
			printer.lineFeed(2);
		}
		printer
			.print(() => {
				console.log('done');
				process.exit();
			});
	});
});
