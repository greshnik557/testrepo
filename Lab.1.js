/*Создание и использование веб-сервера: Подключите модуль http и создайте вебсервер на порту 8001.
 Сервер должен асинхронно читать файл index.html и отдавать файл в качестве результата.
  Опционально: создайте на возможность скачать файл при нажатии на ссылку (Content-Disposition)*/

const fs = require('fs');
fs.readFile('sha.txt', (err/*сначала обработка ошибок*/, code) => {
    console.log(code.toString());
});
const http = require('http');
const fn = (request, response) => {
    response.setHeader('Content-type', 'text/html; charset=utf-8');
    response.write('<p></p><a href="index.html" download>Download file!</a></p>');
    //или так, чтоб скачивание происходило сразу при переходе по ссылке
    //response.setHeader('Content-Disposition', 'attachment; filename="index.html"');
    response.end();
};
let app = http.createServer(fn);
app.listen(8001);