var serverId = '6086342433866530417';
var routerUrl = 'http://study.merlion.ru/custom_web_template.html?object_id=6135330846971222087';

var url = {
	defaultPath: routerUrl.concat('&server_id='.concat(serverId)),
	createPath: function(obj){
		return this.defaultPath.concat(Object.keys(obj).map(function(k){
			return '&'.concat(k).concat('=').concat(obj[k]);
		}).join(''));
	}
}

module.exports = {
	url: url
};