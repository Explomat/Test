var Ajax = {

    getXmlHttp: function(){
        var xmlHttp;
        try { xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) {
            try { xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); }
            catch (err) { xmlHttp = false; }
        }
        if (!xmlHttp && typeof XMLHttpRequest!='undefined')
            xmlHttp = new XMLHttpRequest();
        return xmlHttp;
    },

    sendRequest: function(url, isSync, callBack, data, xmlHttpRequest, requestType) {
        if (!url)
            return;
        xmlHttp = xmlHttpRequest || this.getXmlHttp();
        requestType = requestType || 'GET';
        isSync = isSync || true;

        xmlHttp.open(requestType, url, isSync);
        xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4) {
            if(xmlHttp.status == 200 && callBack){
               callBack(xmlHttp.responseText);
            }
          }
        };
        xmlHttp.send(data || null);
    }
}
    
    
module.exports = Ajax;        
