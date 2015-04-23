/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
<% if(projectType === 'WEB_APP' && useStockpiler){ %>
var Config = require('<%= projectName %>/config');
<% } %>


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
