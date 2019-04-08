var express = require('express');
var app = express();

app.use(express.static('public'));

var multer = require('multer')({
    dest: 'public/photos'
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/upload', [multer.fields([{ name: 'original' }, { name: 'edited' }])], function (req, res, next) {
    res.send('Ok!');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

