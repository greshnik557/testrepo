/*Использование фреймворка Express
npm install json_xml
Дать возможность пользователю вносить на нашем адресе запрос,
который будет парсится, запрашиваться курс валюты на ЦБРФ и выводить его на экран*/

const request = require('request');
const json_xml = require('json_xml');
const express = require('express');
const app = express();
let arr = [];
app.listen(8080);
app.set('views', __dirname);
app.set('view engine', 'pug');
app.get('/:id', (req, res) => {
    res.set('Content-type', 'text/html; charset=utf-8');
    const url = 'http://cbr.ru/scripts/XML_daily.asp?date_req=22/08/2020';
    request(url, (err, response, body) => {
        let items = json_xml.xml2json(body).ValCurs.Valute;
        for (i in items) {
            let {Value, CharCode} = items[i];
            Value = (req.params.id / parseFloat(Value)).toFixed(2);
            arr.push(CharCode + ':___' + Value);
        }
        res.render('form.pug', {ar: arr});
		arr = [];
    });
});


