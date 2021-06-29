var express = require('express');
var cors = require('cors');
require('dotenv').config()
fs = require('fs')
const bodyParser = require('body-parser');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single('upfile'), function (req,res,next){
  file = req.file;
  if(file){
  var response = {"name": file.originalname, "type":file.mimetype, "size": file.size};
  // console.log(response);
  res.send(response);
  }else{
    res.send('You Must Choose a File!');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});


