var express = require('express');
var fs = require('fs');
var path = require('path');
var multer = require('multer');

var app = express();

app.use(express.static('public'));

var storage = multer.diskStorage(
  {
      destination: './public/photos/',
      filename: function ( req, file, cb ) {
        var dir = path.join('./public/photos', req.body.name);
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
        var filename = file.fieldname + file.originalname.slice(file.originalname.lastIndexOf('.'));
        cb(null, path.join(req.body.name, filename));
      }
  }
);

var upload = multer( { storage: storage } );

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/upload', [upload.fields([{ name: 'original' }, { name: 'edited' }])], function (req, res, next) {
  res.send('Ok!');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

