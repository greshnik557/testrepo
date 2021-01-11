//npm install xml-js

let convert = require('xml-js');
let xml = require('fs').readFileSync('./test.xml', 'utf8');
let result = convert.xml2json(xml, {compact: true, spaces: 4});
console.log(result);