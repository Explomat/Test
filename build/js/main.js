(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Router() {
    var routes = [{hash:'#settings', controller:'EventSettingsController'},
                  {hash:'#add-users', controller:'AddMembersController'},
                  {hash:'#tests', controller:'AddTestsController'},
                  {hash:'#materials', controller:'AddMaterialsController'},
                  {hash:'#files', controller:'AddFilesController'},
                  {hash:'#finish', controller:'FinishController'}];
    var defaultRoute = '#settings';
    var currentHash = '';
    var callBack;
    
    //callBack - function called each time when hash changed and controller is loaded
    this.startRouting = function(_callBack){
        callBack = _callBack;
        window.location.hash = window.location.hash || defaultRoute;
        setInterval(hashCheck, 100);
    }
    
    function hashCheck(){
        if (window.location.hash != currentHash){
            for (var i = 0, currentRoute; currentRoute = routes[i++];){
                if (window.location.hash == currentRoute.hash)
                    loadController(currentRoute.controller, callBack);
            }
            currentHash = window.location.hash;
        }
    }
    
    function loadController(controllerName, callBack){
        require(['controllers/' + controllerName], function(controller){
            if (callBack) callBack();
            controller.start();
        });
    }
}

module.exports = Router();
    
},{}],2:[function(require,module,exports){
var UI = {

    toggleList: function(ctx, className){
        var lst = document.querySelectorAll('.'+className);
        for (var i = lst.length - 1; i >= 0; i--)
            lst[i].classList.remove(className);
        ctx.classList.add(className);
    },

    getElementByHash: function(rootId, hash) {
        var cont = document.getElementById(rootId);
        if (!cont) 
            return null;
        return cont.querySelector("a[href='"+hash+"']");
    }
}

module.exports = UI;

},{}],3:[function(require,module,exports){
var Router = require('./router.js');
var UI = require('./utils/UI.js');

Router.startRouting(function(){
  var curElem = UI.getElementByHash('app-container', window.location.hash);
  if (curElem && curElem.parentNode)
    UI.toggleList(curElem.parentNode, 'active');
});

},{"./router.js":1,"./utils/UI.js":2}]},{},[3]);
