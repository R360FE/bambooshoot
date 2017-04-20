var express = require('express');
var router = express.Router();
var fs = require("fs");
var baseDir = global.baseDir;

function readJsonFile(fp){
	var data = fs.readFileSync(fp);

	data = data.toString();

	try{
		data = JSON.parse(data);
	}catch(e){
		data = {};
	}
	
	return data;
}

function formatDate(d) {
    var date1 = new Date(d);
    var y = date1.getFullYear();
    var m = (date1.getMonth()+1);
    var d = date1.getDate();
    var h = date1.getHours();
    var mm = date1.getMinutes();
    var s = date1.getSeconds();

    return y + '年' + formatNumber(m) + '月' + formatNumber(d) + '日 ' + formatNumber(h) + ':' + formatNumber(mm) + ':' + formatNumber(s);
}

function formatNumber(n){
	if(n < 10){
		n =  "0" + n;
	}
	return n;
}

/**
 * 接口管理 - 首页
 */
router.get('/', function (req, res, next){

	var mapPath = baseDir + "/mockdata/map.json";
	var mapData = readJsonFile(mapPath);

	// 数据长度
	var count = mapData.list.length || 0;
	// 每页显示条数
	var limit = 10;
	// 计算总页数
	var pages = Math.ceil(count/limit);
	// 当前页
	var page = Number(req.query.page) || 1;
	// 数据开始查询位置
	var start = Math.max(0, (page-1) * limit);

	var list = mapData.list.splice(start, limit);

	// 日期格式化
	list.forEach(function(item, index){
		item.postTime = formatDate(item.postTime);
	});

    res.render("main/mockdata_index", {
    	page: page,
    	pages: pages,
    	limit: limit,
    	count: count,
    	list: list
    });

});

/**
 * 接口管理 - 编辑
 */
router.get('/edit', function (req, res, next){

	var queryName = req.query.name || "";
	var mapPath = baseDir + "/mockdata/map.json";
	var mapData = readJsonFile(mapPath);
	
	var mock = mapData.list.find(function(item){
		return item.name == queryName;
	});

	if(mock){
		var name = mock.name;
		var desc = mock.desc;
		
		var mockdata_filename = queryName.replace(/\//gi,"__");
		var mockDataPath = baseDir + "/mockdata/" + mockdata_filename + ".json";
		var json = readJsonFile(mockDataPath);

		res.render("main/mockdata_edit", {
			name: name,
			desc: desc,
			json: JSON.stringify(json)
		});
	}else{
		res.redirect("/mockdata");
	}

});

/**
 * 接口管理 - 添加
 */
router.get('/add', function (req, res, next){

	res.render("main/mockdata_add");

});

/**
 * 接口管理 - 查询
 */
router.get('/search', function (req, res, next){

	res.render("main/mockdata_search");

});

module.exports = router;
