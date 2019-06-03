/**
* Helper functions
*/	

function getParameterStingValue( name ) {
          
		  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
          var regexS = "[\\?&]"+name+"=([^&#]*)";
          var regex = new RegExp( regexS );
          var results = regex.exec( window.location.href );
          if( results === null )
            return "";
          else
            return results[1];
        }


function saveToLocalStorage(sName, oValue) {  
	  
	try {
		  
		  if (typeof(localStorage) == "undefined" ) {
		  		
		  		alert("Your browser does not support HTML5 localStorage.");
		  
		  } else {
			 	
    		  	localStorage.setItem(sName, JSON.stringify(oValue));
    		  
	  	}
		  
	  } catch (err) {
		  
			//  alert("Save error, localstorage quota exceeded: " + err);
		  
	  }
}
	  
function removeFromLocalStorage(sName) {
	  
	  try {
		  localStorage.removeItem(sName);
	  } catch(err) {
		  alert(err);
	  }
	  
}

function clearLocalStorage() {
	
	try {
		//if (!localStorage.getItem(key) === null) {
			localStorage.clear();	
		//}
			
	} catch (err) {}
	
}

function isLocalStorage(key) {
	
	try {
		if (localStorage.getItem(key) !== null) {
			return true;	
		} else {
			return false;
		}
			
	} catch (err) {}
	
}

function setCookie(c_name,value,exdays) {
	  
	try {
	  var exdate=new Date();
	  exdate.setDate(exdate.getDate() + parseInt(exdays));
	  var c_value=escape(value) + ((exdays===null) ? "" : "; expires="+exdate.toUTCString());
	  document.cookie=c_name + "=" + c_value;
	} catch (err) {}

}

function getCookie(c_name) {

	var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==c_name)
        {
        return unescape(y);
        }
      }
}