var Event = require('./utils/Event');
var instance = null;

function Router(config) {
    if (instance) {
      return instance;
    }

	var config = config || {};
    var routes = [], currentHash = '';
    var callBack = config.callBack || function(){};  //callBack - function called each time when hash changed and controller is loaded
    var defaultRoute = config.defaultRoute || '/';
    var interval = config.interval || 100;

    this.addRoute = function(route, callBack){
    	routes.push({route: route, callBack: callBack});
    	return this;
    }
    
    this.startRouting = function(){
        window.location.hash = window.location.hash || defaultRoute;
        if ("onhashchange" in window) {
            Event.add(window, 'hashchange', hashCheck);
            //window.addEventListener("hashchange", hashCheck, false);
            hashCheck();
        }
        else {
            clearInterval(this.intervalId);
            this.intervalId = setInterval(hashCheck, interval);
        }
        return this;
    }

    this.navigate = function(route, args){
    	for (var i = 0, currentRoute; currentRoute = routes[i++];){
    		if (currentRoute.route == route){
    			if (callBack) callBack();
    			currentRoute.callBack(args);
    		}
    	}
        return this;
    }
    
    function hashCheck(){
        if (window.location.hash != currentHash){
            for (var i = 0, currentRoute; currentRoute = routes[i++];){
                if (window.location.hash == currentRoute.route){
                	if (callBack) callBack();
                	currentRoute.callBack();
                }
            }
            currentHash = window.location.hash;
        }
    }

    instance = this;
}

module.exports = Router;
    