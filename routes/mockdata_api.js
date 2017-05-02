var express = require('express');
var router = express.Router();
var baseDir = global.baseDir;
var util = require('../lib/util.js');
var Promise = require("bluebird");
var fs = require("fs");

Promise.promisifyAll(fs); // Now you can use fs as if it was designed to use bluebird promises from the beginning

/**
 * api mockdata 保存
 */
router.post('/save', function (req, res, next){

	var name = req.body.name;
	var desc = req.body.desc;
	var json = req.body.json;
	var mapPath = baseDir + "/mockdata/map.json";
	var mapData = util.readJsonFile(mapPath);
	var list = mapData.list || [];
	var filename = name.match(/\/?(\S+)/)[1];
	var hasFace = true;

	var mock = list.find(function(item){
		return item.name == filename;
	});

	if(mock){
		// 接口存在，更新已有接口数据
		mock.name = filename;
		mock.desc = desc;
	}else{
		// 接口不存在，追加新数据
		list.push({
			name: filename,
			desc: desc,
			postTime: new Date().getTime()
		});

		hasFace = false;
	}

	// 增加id编号
	list.forEach(function(item, index){
		item.id = index+1;
	});

	var mockdata_filename = filename.replace(/\//gi,"__");

	Promise.all([

		fs.writeFileAsync(baseDir + "/mockdata/" + mockdata_filename + ".json", json),

		fs.writeFileAsync(baseDir + "/mockdata/map.json", JSON.stringify(mapData))

	]).spread(function(err1, err2){

		if(!err1 && !err2){
			res.json({
				status: 1,
				msg: hasFace?"接口修改已成功保存！":"创建接口成功！"
			});
		}else{
			res.json({
				status: 0,
				msg: "保存接口出错，检查后重试~"
			});
		}

	});

});

/**
 * api mockdata 查询
 */
router.post('/search', function (req, res, next){

	var name = req.body.name;
	var mapPath = baseDir + "/mockdata/map.json";
	var mapData = util.readJsonFile(mapPath);
	var list = mapData.list || [];
	var filename = name.match(/\/?(\S+)/)[1];

	var mockArr = list.filter(function(item){
		return item.name.toLowerCase().indexOf(filename.toLowerCase())>-1;
	});

	// 修改id编号
	mockArr.forEach(function(item, index){
		item.id = index+1;
		item.postTime = util.formatDate(item.postTime);
	});

	res.json({
		data: mockArr
	});
});

/**
 * api mockdata 删除
 */
router.post('/delete', function (req, res, next){

	var name = req.body.name;
	var mapPath = baseDir + "/mockdata/map.json";
	var mapData = util.readJsonFile(mapPath);
	var list = mapData.list || [];
	var filename = name.match(/\/?(\S+)/)[1];

	var index = list.findIndex(function(item, index, list){
		return item.name == filename;
	});

	if(index < 0){
		res.json({status:0, msg: "您所要删除的接口不存在，请检查后重试！"});
	}else{
		list.splice(index, 1);
	}

	// 增加id编号
	list.forEach(function(item, index){
		item.id = index+1;
	});

	var json = {
		list: list
	};

	var mockdata_filename = filename.replace(/\//gi,"__");

	Promise.all([

		fs.unlink(baseDir + "/mockdata/" + mockdata_filename + ".json"),
		fs.writeFileAsync(baseDir + "/mockdata/map.json", JSON.stringify(mapData))

	]).spread(function(err1, err2){

		if(!err1 && !err2){
			res.json({
				status: 1,
				msg: "删除成功"
			});
		}else{
			res.json({
				status: 0,
				msg: "保存接口出错，检查后重试~"
			});
		}

	});

});

module.exports = router;