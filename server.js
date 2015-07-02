<%
function getExt(fileName) {
	if (fileName == undefined)
		return null;
	var index = fileName.indexOf('.');
	return index == -1 ? null : fileName.substr(index + 1, fileName.length - index);
}

function saveFile(queryObjects) {
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
}
%>