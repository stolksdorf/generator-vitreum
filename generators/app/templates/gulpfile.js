"use strict";

var vitreum = require("vitreum"),
	gulp = require("gulp")


var gulp = vitreum.tasks(gulp, {
	entryPoints: ["./client/<%= projectName %>"],
	DEV: true,

	renderStatic : true,

	buildPath: "./build/",
	pageTemplate: "./client/template.hbs",

	projectModules: ["./node_modules/<%= projectName %>", <% if(usePalette){ %> "./node_modules/palette" <% } %>],
	assetExts: ["*.svg", "*.png", "*.jpg", "*.pdf", "*.eot", "*.ttf", "*.woff", "*.woff2"],

	serverWatchPaths: ["server"],
	serverScript: "./server.js",
	cdn: {
		<% _.forEach(cdn, function(lib) { %><%- lib.id %> : ["<%- lib.inCode %>","<%= lib.tag %>"],
		<% }); %>
	},
	libs: [],
});


