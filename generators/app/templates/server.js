'use strict';
var vitreumRender = require('vitreum/render');
var express = require("express");
var app = express();
app.use(express.static(__dirname + '/build'));

<% if(useConfig){ %>
var Config = require('stockpiler')({
	envPrefix: "<%= PROJECTNAME %>"
});
<% } %>


app.get('*', function (req, res) {
	vitreumRender({
		page: './build/<%= projectName %>/bundle.dot',
		globals:{
			<% if(useConfig){ %>config : Config.client, <% } %>
		},
		prerenderWith : './client/<%= projectName %>/<%= projectName %>.jsx',
		initialProps: {
			url: req.originalUrl
		},
		clearRequireCache : process.env.NODE_ENV === 'development',
	}, function (err, page) {
		return res.send(page)
	});
});


var port = process.env.PORT || 8000;
app.listen(port);
console.log('Listening on localhost:' + port);