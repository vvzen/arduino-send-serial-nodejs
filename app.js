const SerialPort = require('serialport');

// the path to your second arduino
const ARDUINO_ADDRESS = '/dev/tty.wchusbserial1410';

// this needs to match the baud rate on your arduino
const BAUD_RATE = 9600;

var port_2 = new SerialPort(ARDUINO_ADDRESS, { autoOpen: false, baudRate: BAUD_RATE });

// to convert the received data to a string
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();

// open the port
port_2.open(function(err){
    if (err) return console.log('Error opening port: ', err.message);

    console.log("port open!");
});

port_2.pipe(parser);
parser.on('data', function(data){
    console.log(`received data:\n\t${data}`);
    
    // remove whitespaces and newlines chars
    let message = data.replace(/\r?\n|\r/g, "");

    // if the arduino is ready then send him a message
    if (message === 'ready'){
        console.log('arduino is ready, I will send some data to him!');
        console.log('sending "hello my dear arduino"');
        port_2.write('hello my dear arduino\n');
    }
});

// Open errors will be emitted as an error event
port_2.on('error', function(err) {
    console.log('Error: ', err.message);
});


