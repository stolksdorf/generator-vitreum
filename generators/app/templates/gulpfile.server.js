"use strict";

var vitreum = require("vitreum");
var gulp    = require("gulp");


var gulp = vitreum.tasks(gulp, {
	DEV: true,

	serverWatchPaths: ["server"],
	serverScript: "./server.js",

	projectType : 'SERVER',

	projectModules: ["./node_modules/<%= projectName %>"]
});

gulp.task('default', ['server']);
