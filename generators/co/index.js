var generators = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');

module.exports = generators.Base.extend({
	constructor: function () {
		generators.Base.apply(this, arguments);
		this.argument('rawComponent', { type: String, required: true });

		this.componentPath = path.dirname(this.rawComponent);
		this.componentName = _.camelCase(path.basename(this.rawComponent));
		this.ComponentName = _.capitalize(this.componentName);
	},

	writing : {
		makeComponent : function(){
			this.fs.copyTpl(
				this.templatePath('base.jsx'),
				this.componentPath + '/' + this.componentName + '/' +  this.componentName + '.jsx',
			this);
			this.fs.copyTpl(
				this.templatePath('base.less'),
				this.componentPath + '/' + this.componentName + '/' +  this.componentName + '.less',
			this);
		}
	}

});