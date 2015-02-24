var generators = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');

module.exports = generators.Base.extend({
	constructor: function () {
		generators.Base.apply(this, arguments);
		this.argument('componentName', { type: String, required: true });
		this.componentName = _.camelCase(this.componentName);
		this.ComponentName = _.capitalize(this.componentName);
	},

	writing : {
		makeComponent : function(){
			this.fs.copyTpl(
				this.templatePath('base.jsx'),
				path.resolve(process.cwd(),
					'./' + this.componentName + '/' +  this.componentName + '.jsx'),
			this);
			this.fs.copyTpl(
				this.templatePath('base.less'),
				path.resolve(process.cwd(),
					'./' + this.componentName + '/' +  this.componentName + '.less'),
			this);
		}
	}

});