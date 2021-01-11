/*Загрузка файла на сервер: создайте форму для загрузки файла на сервер.
Напишите скрипт, который примет загружаемый файл и разместит его на сервере*/

let http = require('http');
let fs = require('fs');
let formidable = require('formidable');

http.createServer((req, res) => {
    if(req.url == '/upload') {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            let newPath = 'C:/Users/TroRG/Desktop/node/uploads/' + files.filename.name;
            let oldPath = files.filename.path;
            fs.rename(oldPath, newPath, err => {
                if (err) {throw err;}
                res.writeHead(200, {'Content-type':'text/html; charset=UTF-8'});
                res.end('Файл загружен и перемещен!');
            });
        })
    } else {
        res.writeHead(200, {'Content-type':'text/html'});
        res.write(`
        <form method=POST action=upload enctype="multipart/form-data" >
            <input type=file name=filename /><br />
            <input type=submit />
        </form>
        `)
    }
}).listen(8080);