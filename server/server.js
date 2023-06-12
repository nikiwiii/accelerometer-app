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
    // console.log(ws);

    //reakcja na komunikat od klienta

    ws.onmessage = (message) => {
        console.log('serwer odbiera: ', message.data);
        wss.clients.forEach((client) => {//wyslij do klienta nie bedacego telefonem
            if (client !== ws) {
                client.send(message.data)
            }
        })
    }
});