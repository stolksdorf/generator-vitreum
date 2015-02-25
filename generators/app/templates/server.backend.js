var fs = require('fs');
var express = require("express");
var app = express();
<% if(useStockpiler){ %>
var Config = require('stockpiler')({
	envPrefix: "<%= PROJECTNAME %>"
});
<% } %>

app.get('/', function(req, res){
	console.log('=== Received request! ===');
	return res.sendStatus(200);
});


<% if(useStockpiler){ %>
var port = process.env.PORT || Config.port;
<% }else{ %>
var port = process.env.PORT || 8000;
<% } %>
app.listen(port);
console.log('Listening on localhost:' + port);