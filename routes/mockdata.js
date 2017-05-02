var express = require('express');
var router = express.Router();
var fs = require("fs");
var baseDir = global.baseDir;
var util = require('../lib/util.js');

/**
 * 接口管理 - 首页
 */
router.get('/', function (req, res, next){

	var mapPath = baseDir + "/mockdata/map.json";

	var mapData = util.readJsonFile(mapPath);

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
		item.postTime = util.formatDate(item.postTime);
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
	var mapData = util.readJsonFile(mapPath);
	
	var mock = mapData.list.find(function(item){
		return item.name == queryName;
	});

	if(mock){
		var name = mock.name;
		var desc = mock.desc;
		
		var mockdata_filename = queryName.replace(/\//gi,"__");
		var mockDataPath = baseDir + "/mockdata/" + mockdata_filename + ".json";
		var json = util.readJsonFile(mockDataPath);

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
