/*Использование событий http-сервера: напишите скрипт находящий аннуитетный ипотечный платёж*/

let http = require('http');
let app = http.createServer().listen(8080);

app.on('listening', () => {
    console.log('Слушаем...');
});
app.on('request', (request, response)=>{
    response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    let url = new URL('http://localhost:8080/' + request.url);
    let params = url.searchParams;
    let s = params.get('s');
    let p = params.get('p');
    let n = params.get('n');
    let a = 0;

    s = parseFloat(s);
    p = parseFloat(p);
    n = parseFloat(n);
    p /= 1200;
    n *= 12;
    a = s * p / (1 - (p + 1) ** (-n));

    response.write(`<b>Платёж:</b> ${a.toFixed(2)}руб`);
    response.end();

    console.log('Пришел запрос');
    console.log(request.method);
    console.log(new URL(request.url, 'http://localhost:8080'));
});