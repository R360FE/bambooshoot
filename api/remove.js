var Promise = require("bluebird");
var fs = require("fs");
Promise.promisifyAll(fs); 
var faces = require("../mockdata/map.json").list;

var remove = function(req, res, next) {
	var name = req.body.name;
	var idx;//要删除的接口index
	for(var i=0,j=faces.length; i<j; i++){
		if(faces[i].name == name){
			idx = i;
			break;
		}
	}
	if(idx<0) res.json({status: 1,msg:"您所要删除的接口不存在，请检查后重试！"});
	faces.splice(idx,1);
	var json = {
		"list": faces
	};
	Promise.all([
	    fs.writeFile("./mockdata/map.json",JSON.stringify(json)),
	    fs.unlink("./mockdata/"+name.replace(/\//gi,"_")+".json")
	]).spread(function(err1, err2) {
	    if(!err1 && !err2){
	    	res.json({
	    		status: 0,
	    		msg: "success"
	    	})
	    }else{
	    	res.json({
	    		status: 1,
	    		msg: "fail"
	    	})
	    }
	});
}

module.exports = remove;