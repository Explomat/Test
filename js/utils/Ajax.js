var Promise = require('es6-promise').Promise;
var QuestionData = require('../data/QuestionData');
var StructureData = require('../data/StructureData');
var Storage = require('./Storage');
var AJAX_TIME_OVER = 10000;

module.exports = {

    getQuestionData: function() {
        return new Promise(function(resolve, reject){
            QuestionData.init();

            //imitatation loading
            setTimeout(function(){
                resolve(Storage.getItem('question'));
            }, 100);
        });
    },

    saveQuestionData: function(data) {
        return new Promise(function(resolve, reject){
            //imitatation loading
            setTimeout(function(){
                Storage.setItem('question', data);
                resolve();
            }, 100);
        });
    },

    getStructureData: function() {
        return new Promise(function(resolve, reject){
            StructureData.init();

            //imitatation loading
            setTimeout(function(){
                resolve(Storage.getItem('structure'));
            }, 100);
        });
    },

    getXmlHttp: function(){
        var xmlHttp;
        try { xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) {
            try { xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); }
            catch (err) { xmlHttp = false; }
        }
        if (!xmlHttp && typeof(XMLHttpRequest) != 'undefined')
            xmlHttp = new XMLHttpRequest();
        return xmlHttp;
    },

    uploadFiles: function(eventTarget, url) {
        return new Promise(function(resolve, reject){
            if (!url)
                reject(Error("Unknown url"));
            var files = FileAPI.getFiles(eventTarget);
            clearTimeout(timeout);
            var xmlHttp = FileAPI.upload({
                url: url,
                files: { file_upload: files },
                complete: function (err, xhr){
                    if (err){
                        reject(err);
                    }
                    else {
                        resolve(JSON.parse(xhr.responseText));
                    }
                }
            });
             var timeout = setTimeout( function(){ 
                xmlHttp.abort();
                reject("Upload file time over");
            }, AJAX_TIME_OVER);
        });
    },

    sendRequest: function(url, data, isSync, xmlHttpRequest, requestType) {
        return new Promise(function(resolve, reject){
            if (!url)
                reject(Error("Unknown url"));
            xmlHttp = xmlHttpRequest || this.getXmlHttp();
            requestType = requestType || 'GET';
            isSync = isSync || true;

            xmlHttp.open(requestType, url, isSync);
            xmlHttp.onreadystatechange = function() {
              if (xmlHttp.readyState == 4) {
                if (timeout)
                    clearTimeout(timeout);

                if(xmlHttp.status == 200){
                   resolve(xmlHttp.responseText);
                }
                else {
                    console.log(xmlHttp.status);
                    reject(xmlHttp.statusText || "Ajax request error");
                }
              }
            };
             xmlHttp.onerror = function() {
              reject("Network Error");
            };

            xmlHttp.send(data || null);

            if (isSync){
                var timeout = setTimeout( function(){ 
                    xmlHttp.abort();
                    reject("Ajax request time over");
                }, AJAX_TIME_OVER);
            }
        }.bind(this));
    }
}     
