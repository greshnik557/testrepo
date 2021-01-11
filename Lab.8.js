let fs = require('fs');
let crypto = require('crypto');
let hash = crypto.createHash('sha256');
let input = fs.createReadStream('Lab.1.js');
let output = fs.createWriteStream('sha.txt');

input.on('readable', () => {
    const data = input.read();
    if(data) hash.update(data);
    else {
        output.write(hash.digest('hex'));
        output.end;
    };
});


