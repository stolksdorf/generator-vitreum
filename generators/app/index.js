var generators = require('yeoman-generator');
var inquirer = require('inquirer');
var _ = require('lodash');
var cdnLibs = require('./cdnLibs.js');

module.exports = generators.Base.extend({

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
						value : 'STAND_ALONE',
						name : "Stand Alone - Creates a single HTML file. Doesn't need a server."
					}
				]
			}, function (answer) {
				this.projectType = answer.projectType;
				done();
			}.bind(this));
		},
		askForPalette : function(){
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
			var done = this.async();
			var base = [];
			var optional = [];
			_.each(cdnLibs, function(lib){
				if(lib.base){
					base.push({
						value : lib.id,
						name : lib.id,
						checked : true
					})
				}else{
					optional.push({
						value : lib.id,
						name : lib.id,
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
				this.cdn = _.map(answers.cdn, function(libId){
					return cdnLibs[libId];
				});
				done();
			}.bind(this));
		}


	},




	writing : {
		makeBaseComponent : function(){
			this.fs.copyTpl(
				this.templatePath('baseJsx.jsx'),
				this.destinationPath('test/client/' + this.projectName + '/' + this.projectName + '.jsx'),
				this
			);
			this.fs.copyTpl(
				this.templatePath('baseLess.less'),
				this.destinationPath('test/client/' + this.projectName + '/' + this.projectName + '.less'),
				this
			);
		},
		makeGulpFile : function(){
			this.fs.copyTpl(
				this.templatePath('gulpfile.js'),
				this.destinationPath('test/gulpfile.js'),
				this
			);
		},
		makeGitignore : function(){
			this.fs.copyTpl(
				this.templatePath('gitignore'),
				this.destinationPath('test/.gitignore'),
				this
			);
		},
		makeProjectModule : function(){
			this.fs.copyTpl(
				this.templatePath('dummy'),
				this.destinationPath('test/node_modules/' + this.projectName + '/Project files go here'),
			this);
		},
		makeTemplate : function(){
			this.fs.copyTpl(
				this.templatePath('template.hbs'),
				this.destinationPath('test/client/template.hbs'),
			this);
		},
		makeReadMe : function(){
			this.fs.copyTpl(
				this.templatePath('readme.md'),
				this.destinationPath('test/README.md'),
			this);
		},
		makePackage : function(){
			this.fs.copyTpl(
				this.templatePath('package.json'),
				this.destinationPath('test/package.json'),
			this);
		},
		setupConfig : function(){
			if(this.useStockpiler){
				this.npmInstall(['stockpiler'], {save : true});
				this.fs.copyTpl(
					this.templatePath('default.json'),
					this.destinationPath('test/config/default.json'),
				this);
				this.fs.copyTpl(
					this.templatePath('default.json'),
					this.destinationPath('test/config/development.json'),
				this);
			}
		},
		makeServer : function(){
			var serverType;
			if(this.projectType === 'WEB_APP'){
				serverType = 'server.webapp.js';
			}else if(this.projectType === 'STATIC'){
				serverType = 'server.static.js';
			}else{
				serverType = 'server.standalone.js';
			}

			this.fs.copyTpl(
				this.templatePath(serverType),
				this.destinationPath('test/server.js'),
			this);

			//create server folder
			this.fs.copyTpl(
				this.templatePath('dummy'),
				this.destinationPath('test/server/Server files go here'),
			this);
		},

	},

	install : {
		installPackages : function(){
			this.log('Installing packages...');
			this.npmInstall(['vitreum', 'lodash', 'react', 'express', 'gulp', 'node-jsx'], {save : true});
			if(this.usePalette){
				this.npmInstall(['git+ssh://git@github.com:thalmic/palette.git'], {save : true});
			}
		}
	},

	end : {
		goodBye : function(){
			this.log("All done! Happy Coding ༼ つ ◕_◕ ༽つ");
		}
	}
});