var index = require("../api/index.js"),
	add = require("../api/add.js"),
	remove = require("../api/remove"),
	save = require("../api/save"),
	search = require("../api/search");

var routes = function(app){
	app.get('/', index); //home page
	app.get('/add',add); //add or edit an interface
	app.post('/save',save);  //save an interface
	app.post('/remove',remove);	//remove an interface
	app.post('/search',search);  //search an interface
}

module.exports = routes