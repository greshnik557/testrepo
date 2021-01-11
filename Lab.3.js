/*Использование пользовательских событий: Создайте вебсервер на порту 8002
 и на событии request назначьте функцию обратного вызова, которая отдаст на вывод
  пользователю URL-запроса и метод запроса. В функции обратного вызова пропишите условие:
   при запросе содержащем /page1, должно происходить перенаправление на /page2*/

let http = require('http');
let app = http.createServer().listen(8002);

app.on('request', (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    console.log(request);
    let url = new URL('http://localhost:8002' + request.url);

    if (request.url == '/page1') {
        response.write(`<b>Метод: </b>${request.method}<br><b>URL: </b>${url}`);
        response.write('<meta http-equiv="refresh" content="3;URL=http://localhost:8002/page2"/>');
    }
    else {response.write(`<b>Метод: </b>${request.method}<br><b>URL: </b>${url}`);}
    response.end();
});