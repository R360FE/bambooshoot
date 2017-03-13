var Promise = require("bluebird");
var fs = require('fs');
Promise.promisifyAll(fs); // Now you can use fs as if it was designed to use bluebird promises from the beginning
var faces = require('../mockdata/map.json');
var path = require("path");

var save = function(req, res, next) {
	var json = req.body.json,
		name = req.body.name,
		desc = req.body.desc,
		filename = name.replace(/\//gi,"_"),
		hasFace = false;

	if(faces.list.every(function(item){//接口不存在
		return item.name !== name;
	})){
		faces.list.push({"name":name,"desc":desc});
	}else{//接口存在，将会修改原来接口
		hasFace = true;
		faces.list = faces.list.map(function(item){
			if(item.name == name){
				item.desc = desc;
			}
		})
	}
	Promise.all([
		    fs.writeFile(path.join(__dirname,"..","/mockdata/"+filename+".json"),json),
		    fs.writeFile(path.join(__dirname,"..","./mockdata/map.json"),JSON.stringify(faces))
		]).spread(function(err1, err2) {
		    if(!err1 && !err2){
		    	res.json({
		    		status: 0,
		    		msg: hasFace?"接口修改已成功保存！":"创建接口成功！",
		    		code: 0
		    	})
		    }else{
		    	res.json({
		    		status: 1,
		    		msg: "保存接口出错，检查后重试~",
		    		code: 0
		    	})
		    }
		});
}

module.exports = save;