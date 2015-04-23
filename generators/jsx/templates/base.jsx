/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');

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
