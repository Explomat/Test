<%

function stringifyWT(obj) {
	var type = DataType(obj);
	var curObj = obj;
	var outStr = '';

	if (obj == null || obj == undefined) 
		return 'null';
	if (type == 'string' || type == 'integer')
		return '\"' + obj + '\"'  
	if (type == 'bool')
		return obj;

	if (IsArray(obj)) {
		var temp = '';
		for (prop in obj) {
			temp += stringifyWT(prop) + ',';
		}
		temp = temp.substr(0, temp.length - 1);
		outStr += '[' + temp +']';
	}
	else {
		var temp = '';
		for (prop in obj) {
			temp += '"' + prop + '":' + stringifyWT(obj[prop]) + ',';
		}
		temp = temp.substr(0, temp.length - 1);
		outStr +='{' + temp + '}';
	}
	return outStr;
}

function getExt(fileName) {
	if (fileName == undefined)
		return '';
	var index = fileName.indexOf('.');
	return index == -1 ? '' : fileName.substr(index + 1, fileName.length - index);
}

function uploadFile(queryObjects) {
	try {
		var name = queryObjects.Form.file_upload[0] + '';
		var data = queryObjects.Form.file_upload;
		var ext = getExt(name);

		var userDoc = OpenDoc(UrlFromDocID(curUserID));
		var docResource = OpenNewDoc( 'x-local://wtv/wtv_resource.xmd' ); 
		docResource.TopElem.person_id = 6070152459256493433; 
		docResource.TopElem.allow_unauthorized_download = true; 
		docResource.TopElem.allow_download = true; 
		docResource.TopElem.file_name = name;
		docResource.TopElem.name = name;
		docResource.TopElem.type = ext;
		docResource.TopElem.person_fullname = userDoc.TopElem.lastname + ' ' + userDoc.TopElem.firstname + ' ' + userDoc.TopElem.middlename;
		docResource.BindToDb();
		docResource.TopElem.put_str(data, name); 
		docResource.Save();
		
		return stringifyWT({
			id: docResource.DocID,
			name: name,
			error: null
		});
			
	}
	catch(e){
		alert(e);
		return false;
	}
}

function removeImage(queryObjects) {
	var id = Int(queryObjects.id);
	try {
		DeleteDoc(UrlFromDocID(id));
	}
	catch(e) {
		alert(e);
		return false;
	}
	return true;
}
%>