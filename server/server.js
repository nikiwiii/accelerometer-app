var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const app = express()
const port = 4000
const multer = require("multer");
const path = require("path");
const fs = require("fs");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const WebSocket = require('ws');

const wss = new WebSocket.Server(
    { port: 1337 }, () => {
        console.log("ws startuje na porcie 1337")
    });

//reakcja na podłączenie klienta i odesłanie komunikatu

wss.on('connection', (ws, req) => {

    //adres ip klienta

    const clientip = req.connection.remoteAddress;

    //reakcja na komunikat od klienta

    ws.on('message', (message) => {
        console.log('serwer odbiera z klienta ' + clientip + ": ", message);
        ws.send('serwer odsyła do klienta -> ' + message);
    });

});