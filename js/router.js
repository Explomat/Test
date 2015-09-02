
function Router(config) {
	var config = config || {};
    var routes = [], currentHash = '';
    var callBack = config.callBack || function(){};
    var defaultRoute = ('#' + config.defaultRoute) || '#';
    var interval = config.interval || 100;

    this.addRoute = function(route, callBack){
    	routes.push({route: '#' + route, callBack: callBack});
    	return this;
    }
    
    //callBack - function called each time when hash changed and controller is loaded
    this.startRouting = function(){
        window.location.hash = window.location.hash || defaultRoute;
        clearInterval(this.intervalId);
        this.intervalId = setInterval(hashCheck, interval);
        return this;
    }

    this.navigate = function(route, args){
    	for (var i = 0, currentRoute; currentRoute = routes[i++];){
    		if (currentRoute.route == route){
    			if (callBack) callBack();
    			currentRoute.callBack(args);
    			break;
    		}
    	}
    }
    
    function hashCheck(){
    	console.log(1);
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
}

module.exports = Router;
    