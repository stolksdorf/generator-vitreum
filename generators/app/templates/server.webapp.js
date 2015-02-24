'use strict';
var vitreum = require('vitreum');
var express = require("express");
var app = express();
app.use(express.static(__dirname + '/build'));
<% if(useStockpiler){ %>
var Config = require('stockpiler')({
	envPrefix: "<%= PROJECTNAME %>"
});
<% } %>

require('node-jsx').install();

app.get('/', function (req, res) {
	vitreum.render({
		page: './build/<%= projectName %>/bundle.hbs',
		<% if(useStockpiler){ %>config : Config.client, <% } %>
		prerenderWith : './client/<%= projectName %>/<%= projectName %>.jsx',
		initialProps: {
			url: req.originalUrl
		},
	}, function (err, page) {
		return res.send(page)
	});
});

<% if(useStockpiler){ %>
var port = process.env.PORT || Config.port;
<% }else{ %>
var port = process.env.PORT || 8000;
<% } %>
app.listen(port);
console.log('Listening on localhost:' + port);