module.exports = {
	serverId: '6086342433866530417',
	routerUrl: 'http://study.merlion.ru/custom_web_template.html?object_id=6135330846971222087',
	defaultPath: this.routerUrl.concat('&server_id='.concat(this.serverId)),
	getPath: function(obj){
		return this.defaultPath + Object.keys(obj).map(function(k){
			return '&'.concat(k).concat('=').concat(obj[k]);
		}).join('');
	}
};