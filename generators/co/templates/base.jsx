var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var <%= ComponentName %> = React.createClass({

	render : function(){
		var self = this;
		return(
			<div className='<%= componentName %>'>
				<%= ComponentName %> Ready!
			</div>
		);
	}
});

module.exports = <%= ComponentName %>;
