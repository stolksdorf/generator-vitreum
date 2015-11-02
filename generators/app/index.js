var generators = require('yeoman-generator');
var inquirer = require('inquirer');
var _ = require('lodash');
var libs = require('./libs.js');


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
		getLibs : function(){
			var done = this.async();

			var libsSplit = _.partition(libs, function(lib){
				return lib.checked
			});

			this.prompt({
				type: 'checkbox',
				name: 'libs',
				message: 'Which client libraries would you like to include?',
				choices: _.union(libsSplit[0], [new inquirer.Separator('---')], libsSplit[1])
			}, function(answers){
				this.libs = answers.libs;

				console.log(this.libs);

				done();
			}.bind(this));
		},
		askForConfig : function(){
			var done = this.async();
			this.prompt([{
				type: 'confirm',
				name: 'config',
				message: 'Would you like to setup configs, using stockpiler?',
				default: true
			}], function (answer) {
				this.useConfig = answer.config
				done();
			}.bind(this));
		},
	},


	writing : {
		makeBaseComponent : function(){
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
			this.fs.copyTpl(
				this.templatePath('gulpfile.js'),
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
				this.destinationPath('shared/' + this.projectName + '/Project files go here'),
			this);
		},
		makeTemplate : function(){
			this.fs.copyTpl(
				this.templatePath('template.dot'),
				this.destinationPath('client/template.dot'),
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
			if(!this.useConfig) return;

			if(this.useStockpiler){
				this.fs.copyTpl(
					this.templatePath('default.json'),
					this.destinationPath('config/default.json'),
				this);
				this.fs.copyTpl(
					this.templatePath('default.json'),
					this.destinationPath('config/development.json'),
				this);

				this.fs.copyTpl(
					this.templatePath('config.js'),
					this.destinationPath('shared/' + this.projectName + '/config.js'),
				this);
			}
		},
		makeServer : function(){
			this.fs.copyTpl(
				this.templatePath('server.js'),
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
			this.log('Installing packages...');
			this.npmInstall(['vitreum', 'express', 'gulp'], {save : true});
			this.npmInstall(this.libs, {save : true});
			if(this.useConfig){
				this.npmInstall(['browserify-stockpiler', 'stockpiler'], {save : true});
			}
		}
	},

	end : {
		goodBye : function(){
			this.log("\n\n\nAll done! Happy Coding ༼ つ ◕_◕ ༽つ");
		}
	}
});
