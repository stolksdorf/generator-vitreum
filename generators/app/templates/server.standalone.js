var fs = require('fs');
var express = require("express");
var app = express();
app.use(express.static(__dirname + '/build'));


app.get('/', function(req, res){
	return res.send(fs.readFileSync('./build/<%= projectName %>/index.html', 'utf8'));
});


var port = process.env.PORT || 8000;
app.listen(port);
console.log('Listening on localhost:' + port);