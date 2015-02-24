/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');
var cx = React.addons.classSet;

var <%= ComponentName %> = React.createClass({

	render : function(){
		var self = this;
		return(
			<div className='<%= componentName %>'>
				<%= componentName %> Ready!
			</div>
		);
	}
});

module.exports = <%= ComponentName %>;