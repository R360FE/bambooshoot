var add = function(req,res,next){
	var name = req.query.name, //接口名
		desc = "",
		json = {},
		edit = false;
	try{
		json = require("../mockdata/"+name.replace(/\//gi,"_") + ".json");
		edit = true;
		desc = require("../mockdata/map.json").list.filter(function(item){
			return item.name == name;
		})[0].desc;
	}catch(e){
		console.log(e.message);
		name = "";
	}
	res.render('add',{name: name,desc: desc,json:JSON.stringify(json),edit:edit});
}

module.exports = add;
