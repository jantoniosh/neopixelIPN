const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");
const { SerialPort, ReadlineParser } = require('serialport');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const baud = 115200;

const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: baud }, function (err) {
    if (err) {
        return console.log('Error: ', err.message)
    }
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("colorNeopixel", (msg) => {
        let msgJson = JSON.stringify(msg);
        // console.log(msgJson);
        port.write(msgJson + '\n', (err) => {
            if (err) {
                return console.log('Error on write: ', err.message)
            }
        })
    });

    parser.on("data", (msg) => {
        console.log(msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

function scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
