/**
* Returns an XMLHttp instance to use for asynchronous
* downloading. This method will never throw an exception, but will
* return NULL if the browser does not support XmlHttp for any reason.
* @return {XMLHttpRequest|Null}
*/
function createXmlHttpRequest() {
 try {
   if (typeof ActiveXObject != 'undefined') {
     console.log("Type: ActiveX");
     return new ActiveXObject('Microsoft.XMLHTTP');
   } else if (window["XMLHttpRequest"]) {
     console.log("Type: XMLHttp");
     return new XMLHttpRequest();
   }
 } catch (e) {
   //changeStatus(e);
	 console.log(e);
 }
 return null;
}

/**
* This functions wraps XMLHttpRequest open/send function.
* It lets you specify a URL and will call the callback if
* it gets a status code of 200.
* @param {String} url The URL to retrieve
* @param {Function} callback The function to call once retrieved.
*/
function downloadUrl(url, callback) {
 console.log("Creating request...");
 var status = -1;
 
 var request = createXmlHttpRequest();
     
 if (!request) {
	 console.log("No request" + e);
   return false;
 }

 request.onreadystatechange = function() {
   if (request.readyState == 4) {
     try {
       status = request.status;
       console.log("Statuskod: " + status);
       
     } catch (e) {
       // Usually indicates request timed out in FF.
    	 console.log("Status error: " + e);
     }
     if (status == 200) {
       callback(request.responseXML, request.status);
       request.onreadystatechange = function() {};
     }
   }
 };
 
  console.log("Open url: " + url);
  request.open('GET', url, true);
  console.log("Setting header...");
  //request.setRequestHeader('Access-Control-Allow-Headers', '*');
  request.setRequestHeader('Access-Control-Allow-Origin', '*');
  console.log("Sending Request...");
  request.send(null);

}

/**
 * Parses the given XML string and returns the parsed document in a
 * DOM data structure. This function will return an empty DOM node if
 * XML parsing is not supported in this browser.
 * @param {string} str XML string.
 * @return {Element|Document} DOM.
 */
function xmlParse(str) {
  if (typeof ActiveXObject != 'undefined' && typeof GetObject != 'undefined') {
    var doc = new ActiveXObject('Microsoft.XMLDOM');
    doc.loadXML(str);
    //alert(str);
    return doc;
  }

  if (typeof DOMParser != 'undefined') {
    return (new DOMParser()).parseFromString(str, 'text/xml');
  }
  //alert("div");
  return createElement('div', null);
}

/**
 * Appends a JavaScript file to the page.
 * @param {string} url
 */
function downloadScript(url) {
  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
}
