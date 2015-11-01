var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var <%= ProjectName %> = React.createClass({

	render : function(){
		var self = this;
		return(
			<div className='<%= projectName %>'>
				Project Ready!
			</div>
		);
	}
});

module.exports = <%= ProjectName %>;
