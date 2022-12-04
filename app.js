var express = require('express');
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');
var wav = require('wav');

var port = 3700;
var outFile = 'demo.wav';
var app = express();

app.set('views', __dirname + '/tpl');
// app.set('view engine', 'html');
// app.engine('html', require('html').__express);
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'/index.html'));
  ///res.render('index'); 
});

app.listen(port);

console.log('server open on port ' + port);

binaryServer = BinaryServer({port: 9001});

binaryServer.on('connection', function(client) {
  console.log('new connection');

  var fileWriter = new wav.FileWriter(outFile, {
    channels: 1,
    sampleRate: 48000,
    bitDepth: 16
  });

  client.on('stream', function(stream, meta) {
    console.log('new stream');
    stream.pipe(fileWriter);

    stream.on('end', function() {
      fileWriter.end();
      console.log('wrote to file ' + outFile);
    });
  });
});



/// added code from kezia
///const express = require('express');
///const app = express();
///const path = require('path');
///const router = express.Router();

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

//add the router
///app.use('/', router);
///app.listen(process.env.port || 3000);

///console.log('Running at Port 3000');