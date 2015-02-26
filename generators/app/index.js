var generators = require('yeoman-generator');
var inquirer = require('inquirer');
var _ = require('lodash');
var cdnLibs = require('./cdnLibs.js');


var TEST_MODE = false;

module.exports = generators.Base.extend({

	testing : function(){
		if(TEST_MODE){
			this.log('\n!!!YOU ARE IN TEST MODE!!!\n');
			this.destinationRoot(this.destinationPath('test'))
		}
	},

	prompting : {
		projectName : function () {
			var done = this.async();
			this.prompt({
				type    : 'input',
				name    : 'projectName',
				message : 'Your project name',
				default : this.appname
			}, function (answer) {
				this.rawProjectName = answer.projectName
				this.projectName = _.camelCase(answer.projectName);
				this.ProjectName = _.capitalize(this.projectName);
				this.PROJECTNAME = this.projectName.toUpperCase();
				done();
			}.bind(this));
		},
		projectDescription : function () {
			var done = this.async();
			this.prompt({
				type    : 'input',
				name    : 'projectDescription',
				message : 'Your project description',
				default : 'A super rad project!',
			}, function (answer) {
				this.projectDescription = answer.projectDescription;
				done();
			}.bind(this));
		},
		projectType  : function(){
			var done = this.async();
			this.prompt({
				type    : 'list',
				name    : 'projectType',
				message : 'Your project type',
				choices : [
					{
						value : 'WEB_APP',
						name : "Web App - Creates template files for the server to use."
					},
					{
						value : 'STATIC',
						name : "Static - Creates a static HTML file for the server."
					},
					{
						value : 'SERVER',
						name : "Server - No client-side structure is needed. Back-end all day baby."
					}
				]
			}, function (answer) {
				this.projectType = answer.projectType;
				done();
			}.bind(this));
		},
		askForPalette : function(){
			if(this.projectType === 'SERVER'){
				this.usePalette = false;
				return;
			}
			var done = this.async();
			this.prompt([{
				type: 'confirm',
				name: 'palette',
				message: 'Would you like to use Palette?',
				default: true
			}], function (answer) {
				this.usePalette = answer.palette
				done();
			}.bind(this));
		},
		askForStockpiler : function(){
			var done = this.async();
			this.prompt([{
				type: 'confirm',
				name: 'stockpiler',
				message: 'Would you like to use Stockpiler?',
				default: true
			}], function (answer) {
				this.useStockpiler = answer.stockpiler
				done();
			}.bind(this));
		},
		getCDN : function(){
			if(this.projectType === 'SERVER') return;

			var done = this.async();
			var base = [];
			var optional = [];
			_.each(cdnLibs, function(lib, libName){
				if(lib.base){
					base.push({
						value : libName,
						name : libName,
						checked : true
					})
				}else if(lib.base === false){
					optional.push({
						value : libName,
						name : libName,
						checked : false
					})
				}
			});
			this.prompt({
				type: 'checkbox',
				name: 'cdn',
				message: 'Which libraries would you like to include?',
				choices: _.union(base, [new inquirer.Separator('---')], optional)
			}, function(answers){
				this.cdn = _.map(answers.cdn, function(libName){
					return cdnLibs[libName];
				});

				if(this.useStockpiler){
					this.cdn.push(cdnLibs.stockpiler);
				}


				done();
			}.bind(this));
		}

	},




	writing : {
		makeBaseComponent : function(){
			if(this.projectType === 'SERVER') return;

			this.fs.copyTpl(
				this.templatePath('baseJsx.jsx'),
				this.destinationPath('client/' + this.projectName + '/' + this.projectName + '.jsx'),
				this
			);
			this.fs.copyTpl(
				this.templatePath('baseLess.less'),
				this.destinationPath('client/' + this.projectName + '/' + this.projectName + '.less'),
				this
			);
		},
		makeGulpFile : function(){
			var targetFile = 'gulpfile.client.js';
			if(this.projectType === 'SERVER'){
				targetFile = 'gulpfile.server.js';
			}
			this.fs.copyTpl(
				this.templatePath(targetFile),
				this.destinationPath('gulpfile.js'),
				this
			);
		},
		makeGitignore : function(){
			this.fs.copyTpl(
				this.templatePath('gitignore'),
				this.destinationPath('.gitignore'),
				this
			);
		},
		makeProjectModule : function(){
			this.fs.copyTpl(
				this.templatePath('dummy'),
				this.destinationPath('node_modules/' + this.projectName + '/Project files go here'),
			this);
		},
		makeTemplate : function(){
			if(this.projectType === 'SERVER') return;

			this.fs.copyTpl(
				this.templatePath('template.hbs'),
				this.destinationPath('client/template.hbs'),
			this);
		},
		makeReadMe : function(){
			this.fs.copyTpl(
				this.templatePath('readme.md'),
				this.destinationPath('README.md'),
			this);
		},
		makePackage : function(){
			this.fs.copyTpl(
				this.templatePath('package.json'),
				this.destinationPath('package.json'),
			this);
		},
		setupConfig : function(){
			if(this.useStockpiler){

				this.fs.copyTpl(
					this.templatePath('default.json'),
					this.destinationPath('config/default.json'),
				this);
				this.fs.copyTpl(
					this.templatePath('default.json'),
					this.destinationPath('config/development.json'),
				this);

				if(this.projectType === 'WEB_APP'){
					this.fs.copyTpl(
						this.templatePath('config.js'),
						this.destinationPath('node_modules/' + this.projectName + '/config.js'),
					this);
				}
			}
		},
		makeServer : function(){
			var serverType;
			if(this.projectType === 'WEB_APP'){
				serverType = 'server.webapp.js';
			}else if(this.projectType === 'STATIC'){
				serverType = 'server.static.js';
			}else{
				serverType = 'server.backend.js';
			}

			this.fs.copyTpl(
				this.templatePath(serverType),
				this.destinationPath('server.js'),
			this);

			//create server folder
			this.fs.copyTpl(
				this.templatePath('dummy'),
				this.destinationPath('server/Server files go here'),
			this);
		},

	},

	install : {
		installPackages : function(){
			if(TEST_MODE) return;

			this.log('Installing packages...');
			if(this.projectType === 'SERVER'){
				this.npmInstall(['vitreum', 'lodash', 'express', 'gulp'], {save : true});
			}else{
				this.npmInstall(['vitreum', 'lodash', 'react', 'express', 'gulp', 'node-jsx'], {save : true});
			}
			if(this.usePalette){
				this.npmInstall(['git+ssh://git@github.com:thalmic/palette.git'], {save : true});
			}
			if(this.useStockpiler){
				this.npmInstall(['stockpiler'], {save : true});
			}
		}
	},

	end : {
		goodBye : function(){
			this.log("\n\n\nAll done! Happy Coding ༼ つ ◕_◕ ༽つ");
		}
	}
});