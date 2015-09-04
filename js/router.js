var Event = require('./utils/Event');
var routes = [], currentHash = '', callBack = function(){}, defaultRoute = '/', interval = 100;

function hashCheck(){
    if (window.location.hash != currentHash){
        for (var i = 0, currentRoute; currentRoute = routes[i++];){
            var match = window.location.hash.match(currentRoute.route);
            if (match){
                if (callBack) callBack();
                match.shift();
                currentRoute.callBack.apply({}, match);
                break;
            }
        }
        currentHash = window.location.hash;
    }
}

var Router = {

    config: function(cfg){
        cfg = cfg || {};
        callBack = cfg.callBack || callBack;
        defaultRoute = cfg.defaultRoute || defaultRoute;
        interval = cfg.interval || interval;
    },

    addRoute: function(route, callBack){
        routes.push({route: route, callBack: callBack});
        return this;
    },

    removeRoute: function(route){
        for (var i = this.routes.length - 1, r; i >= 0, r = this.routes[i]; i--) {
            if(r.route === route) {
                this.routes.splice(i, 1); 
                return this;
            }
        };
        return this;
    },

    flush: function(){
        routes = [];
        callBack = function(){};
        defaultRoute = '/';
    },
    
    startRouting: function(){
        window.location.hash = window.location.hash || defaultRoute;
        if ("onhashchange" in window) {
            Event.add(window, 'hashchange', hashCheck);
            hashCheck();
        }
        else {
            clearInterval(this.intervalId);
            this.intervalId = setInterval(hashCheck, interval);
        }
        return this;
    },

    navigate: function(route){
        route = route ? route : '';
        window.location.hash = route;
        return this;
        /*for (var i = 0, currentRoute; currentRoute = routes[i++];){
            if (currentRoute.route == route){
                if (callBack) callBack();
                currentRoute.callBack(args);
            }
        }
        return this;*/
    }
}

module.exports = Router;
    