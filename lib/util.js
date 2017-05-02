var fs = require('fs');
var util = {};

util.readJSON = function(path){
    var json = _.read(path),
        result = {};
    try {
        result = JSON.parse(json);
    } catch(e){
        fis.log.error('parse json file[' + path + '] fail, error [' + e.message + ']');
    }
    return result;
};
util.readJsonFile = function(fp){
	var data = fs.readFileSync(fp);

	data = data.toString();

	try{
		data = JSON.parse(data);
	}catch(e){
		console.log(e);
		data = {};
	}
	
	return data;
}

util.formatDate = function(d) {
    var date1 = new Date(d);
    var y = date1.getFullYear();
    var m = (date1.getMonth()+1);
    var d = date1.getDate();
    var h = date1.getHours();
    var mm = date1.getMinutes();
    var s = date1.getSeconds();
    var formatNumber = this.formatNumber;

    return y + '年' + formatNumber(m) + '月' + formatNumber(d) + '日 ' + formatNumber(h) + ':' + formatNumber(mm) + ':' + formatNumber(s);
}

util.formatNumber = function(n){
	if(n < 10){
		n =  "0" + n;
	}
	return n;
}


module.exports = util;
