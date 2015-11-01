"use strict";

var vitreumTasks = require("vitreum/tasks");
var gulp = require("gulp");


var gulp = vitreumTasks(gulp, {
	entryPoints: ["./client/<%= projectName %>"],
	DEV: true,

	buildPath: "./build/",
	pageTemplate: "./client/template.dot",

	projectModules: ["./shared/<%= projectName %>"],
	assetExts: ["*.svg", "*.png", "*.jpg", "*.pdf", "*.eot", "*.ttf", "*.woff", "*.woff2", "*.ico"],

	serverWatchPaths: ["server"],
	serverScript: "server.js",
	cdn: {

	},
	libs: [
		<% for(var i=0; i<libs.length; i++){ %>"<%- libs[i] %>",
		<% }; %>
	],
	clientLibs: [],
});


