var fs = require("fs");
var mapJson = require("../mockdata/map.json");

var search = function(req, res, next) {
	var name = req.body.name;
	var faces = mapJson.list.filter(function(item,index){
		return item.name.indexOf(name)>-1;
	});
	res.json({
		status: 0,
		data: {
			total: faces.length,
			list: faces
		},
		msg: "success"
	});
}

module.exports = search;
