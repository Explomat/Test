var serverId = '6166852566696923932';
var routerUrl = 'http://study.merlion.ru/custom_web_template.html?object_id=6135330846971222087';

var url = {
	defaultPath: routerUrl.concat('&server_id='.concat(serverId)),
	createPath: function(obj){
		return this.defaultPath.concat(Object.keys(obj).map(function(k){
			return '&'.concat(k).concat('=').concat(obj[k]);
		}).join(''));
	}
}

icons = {
	loading: 'react/Tests/build/img/loading.gif'
}

module.exports = {
	url: url, 
	icons: icons
};