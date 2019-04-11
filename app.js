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
        var filename = file.fieldname; // + file.originalname.slice(file.originalname.lastIndexOf('.'));
        cb(null, path.join(req.body.name, filename));
      }
  }
);

var upload = multer( { storage: storage } );

app.get('/users', function (req, res) {
  fs.readdir('./public/photos', function(err, folders) {
    res.send(folders);
  });
});

var fileFields = [{ name: 'original1' }, { name: 'edited1' }, { name: 'original2' }, { name: 'edited2' }];
app.post('/upload', [upload.fields(fileFields)], function (req, res, next) {
  // create text files
  var folder = path.join("public/photos/", req.body.name);
  fs.writeFile(path.join(folder, "1.txt"), req.body.comments1, (err) => {
    if (err) console.log(err);
    fs.writeFile(path.join(folder, "2.txt"), req.body.comments2, (err) => {
      if (err) console.log(err);
      res.send('Ok!');
    });
  });
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

