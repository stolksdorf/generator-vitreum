module.exports = {
	"react": {
		id : "react/addons",
		inCode : "window.React",
		tag: "<script src='//cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react-with-addons.min.js'></script>",
		base : true
	},
	"jquery": {
		id : "jquery",
		inCode : "window.jQuery",
		tag: "<script src='//code.jquery.com/jquery-1.11.0.min.js'></script>",
		base : true
	},
	"lodash": {
		id : "lodash",
		inCode : "window._",
		tag: "<script src='//cdnjs.cloudflare.com/ajax/libs/lodash.js/3.3.0/lodash.min.js'></script>",
		base : true
	},

	"moment": {
		id : "moment",
		inCode : "window.moment",
		tag: "<script src='//cdnjs.cloudflare.com/ajax/libs/moment.js/2.7.0/moment.min.js'></script>",
		base : false
	},
	"flot" : {
		id : "flot",
		inCode : "window.$.plot",
		tag: "<script src='//cdnjs.cloudflare.com/ajax/libs/flot/0.8.2/jquery.flot.min.js'></script>",
		base : false
	},
	"isotope" : {
		id : "isotope",
		inCode : "window.Isotope",
		tag: "<script src='//cdnjs.cloudflare.com/ajax/libs/jquery.isotope/2.1.0/isotope.pkgd.min.js'></script>",
		base : false
	},
	"three"   : {
		id : "three",
		inCode : "window.THREE",
		tag: "<script src='//cdnjs.cloudflare.com/ajax/libs/three.js/r70/three.min.js'></script>",
		base : false
	}
}