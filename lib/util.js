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

module.exports = util;
