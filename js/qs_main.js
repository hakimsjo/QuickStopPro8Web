var kmlPath = "pois/";
var poiAreDownloaded = false;

var showWeather = "false";
var showPIOS = "true";
var useCelcius = "true";
var showMapCanvas = "false";
var myCountry = "SE";
var useZoomFactor = "8";
var showMyLocation = "false";
var showStreetViewControl = "true";
var kmlFullPath = kmlPath+"pois.kml"; //"https://www.quickstoppro.se/pois/2015/alla_stallplatser.kml";//kmlPath+myCountry+".kml";
var cookieTimeOut = "0";
var fullRefresh = "true";
var pinIcon = "images/campingcar.png";
var pinMyLocationImg = "images/smiley_happy.png";
var poiAreDownloaded = "false";

var manLat="57.751809"; //= getParameterStingValue('manLat');
var manLon="14.170990"; //= getParameterStingValue('manLon');

var myLatlng;
var directionDisplay;
var curLatLong;
var clickedPixel;
var contextmenu;
var map;
var gMarkers = [];
var gPoiMarkers = [];
var infowindow;

//var directionsService = new google.maps.DirectionsService();

function initialize() {
	    console.log("path: "+kmlFullPath);
      //alert("path: "+kmlFullPath);
		  
      //Wait...
		  //document.getElementById("info_canvas").innerHTML="<img src='images/loading.gif' width=100px height=100px>";
			//document.getElementById("info_canvas").innerHTML="<i class='fa fa-spinner fa-spin fa-5x'></i>";
	  
		  //Hide stuff
		  //document.getElementById("map_canvas").style.display="none";
		  //document.getElementById("divider_canvas").style.display="none";
		  //document.getElementById("map_info_canvas").style.display="none";
		  //document.getElementById("street_canvas").style.display="none";
		  //document.getElementById("search_canvas").style.display="none";
		 
		   	      
		  //Test if GPS is available and get position
	    if (manLat.length>4 && manLon.length>4) {
	      //alert("load"+manLat+manLon);
	  	  console.log("LoadMap");
	  	  LoadMap(new google.maps.LatLng(manLat,manLon));
	  		
	    } else {
	  
	    	  if(navigator.geolocation) {
	    		  
	    		  if (showMyLocation=="true") {
	        		//alert("gotgps");
	    			  navigator.geolocation.getCurrentPosition(
	    					  gotPosition,
	    					  errorGettingPosition,
	    					  {'enableHighAccuracy':true,'timeout':500000,'maximumAge':0});
	    		 
	    		  } else {
	    			  //alert("gotgps");
	    			  navigator.geolocation.getCurrentPosition(
	    					  gotPosition,
	    					  errorGettingPosition,
	    					  {'enableHighAccuracy':false,'timeout':500000,'maximumAge':0});
	    		 
	    		  }
	    		  
	    	  } else {
	    		  
	    		  //alert("Device not supported. Cant access location information.");
	    		  
	    	  }
	  }
	}

function LoadMap(LatLng){
	
	var myOptions;
	//Logg
	console.log("loadmaptstart");
	console.log("Zoomfactor: " + useZoomFactor);
	
	switch (useZoomFactor){
	
	case "4":
			if (showStreetViewControl=="true") {
				myOptions = {
		          	    zoom: 4,
		          	    center: LatLng,
		          	    streetViewControl: true,
		          	    mapTypeControl: true,
		          	    disableDefaultUI: false,
		          	    zoomControl: true,
		          	    scaleControl: true,
		          	    mapTypeId: google.maps.MapTypeId.ROADMAP
		          	  };
			} else {
				myOptions = {
		          	    zoom: 4,
		          	    center: LatLng,
		          	    streetViewControl: false,
		          	    mapTypeControl: true,
		          	    disableDefaultUI: false,
		          	    zoomControl: true,
		          	    scaleControl: true,
		          	    mapTypeId: google.maps.MapTypeId.ROADMAP
		          	  };
			}
		
		
		break;
		
	case "8":
    //alert("case8");
		if (showStreetViewControl=="true") {
				myOptions = {
		          	    zoom: 8,
		          	    center: LatLng,
		          	    streetViewControl: true,
		          	    mapTypeControl: true,
		          	    disableDefaultUI: false,
		          	    zoomControl: true,
		          	    scaleControl: true,
		          	    mapTypeId: google.maps.MapTypeId.ROADMAP
		          	  };
			} else {
				myOptions = {
		          	    zoom: 8,
		          	    center: LatLng,
		          	    streetViewControl: false,
		          	    mapTypeControl: true,
		          	    disableDefaultUI: false,
		          	    zoomControl: true,
		          	    scaleControl: true,
		          	    mapTypeId: google.maps.MapTypeId.ROADMAP
		          	  };
			}
		break;
	
	case "10":
		if (showStreetViewControl=="true") {
				myOptions = {
		          	    zoom: 10,
		          	    center: LatLng,
		          	    streetViewControl: true,
		          	    mapTypeControl: true,
		          	    disableDefaultUI: false,
		          	    zoomControl: true,
		          	    scaleControl: true,
		          	    mapTypeId: google.maps.MapTypeId.ROADMAP
		          	  };
			} else {
				myOptions = {
		          	    zoom: 10,
		          	    center: LatLng,
		          	    streetViewControl: false,
		          	    mapTypeControl: true,
		          	    disableDefaultUI: false,
		          	    zoomControl: true,
		          	    scaleControl: true,
		          	    mapTypeId: google.maps.MapTypeId.ROADMAP
		          	  };
			}
		break;
		
	case "15":
		if (showStreetViewControl=="true") {
				myOptions = {
		          	    zoom: " + 15 +",
		          	    center: LatLng,
		          	    streetViewControl: true,
		          	    mapTypeControl: true,
		          	    disableDefaultUI: false,
		          	    zoomControl: true,
		          	    scaleControl: true,
		          	    mapTypeId: google.maps.MapTypeId.ROADMAP
		          	  };
			} else {
				myOptions = {
		          	    zoom: 15,
		          	    center: LatLng,
		          	    streetViewControl: false,
		          	    mapTypeControl: true,
		          	    disableDefaultUI: false,
		          	    zoomControl: true,
		          	    scaleControl: true,
		          	    mapTypeId: google.maps.MapTypeId.ROADMAP
		          	  };
			}
		
		break;
		
	case "6":
		if (showStreetViewControl=="true") {
				myOptions = {
		          	    zoom: 6,
		          	    center: LatLng,
		          	    streetViewControl: true,
		          	    mapTypeControl: true,
		          	    disableDefaultUI: false,
		          	    zoomControl: true,
		          	    scaleControl: true,
		          	    mapTypeId: google.maps.MapTypeId.ROADMAP
		          	  };
			} else {
				myOptions = {
		          	    zoom: 6,
		          	    center: LatLng,
		          	    streetViewControl: false,
		          	    mapTypeControl: true,
		          	    disableDefaultUI: false,
		          	    zoomControl: true,
		          	    scaleControl: true,
		          	    mapTypeId: google.maps.MapTypeId.ROADMAP
		          	  };
			}
	}
  //alert("createmap");
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  
  var weatherLayer;
  
	if (showWeather=="true") {
		
			if (useCelcius=="true") {
			
				  weatherLayer = new google.maps.weather.WeatherLayer({
				  temperatureUnits: google.maps.weather.TemperatureUnit.CELCIUS
				});
				
			} else {
				
				  weatherLayer = new google.maps.weather.WeatherLayer({
				  temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
				});
				
			}
		
			weatherLayer.setMap(map);
			
			var cloudLayer = new google.maps.weather.CloudLayer();
			cloudLayer.setMap(map);
		    		
	}
	
	if (showPIOS=="true") {
			
			plotMarkersFromFile();
	
	} else {
		 	//Hide info canvas
			//document.getElementById("info_canvas").style.display="none";
	}

	if (showMyLocation=="true") {
		//Add current location marker
      var image = pinMyLocationImg;
    	var beachMarker = new google.maps.Marker({position: curLatLng,map: map,icon: image});
	}

		//Show map
	  	document.getElementById("map_canvas").style.display="block";
	    map.setCenter(LatLng);
	  // alert("mapshown");
	 
	    // Create the search box and link it to the UI element.
		var input = /** @type {HTMLInputElement} */(
		document.getElementById('pac-input'));
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
		  
		var searchBox = new google.maps.places.SearchBox(/** @type {HTMLInputElement} */(input));
		
		// Listen for the event fired when the user selects an item from the
		// pick list. Retrieve the matching places for that item.
		var imarkers = [];
		
		
		google.maps.event.addListener(searchBox, 'places_changed', function() {
			  var places = searchBox.getPlaces();
		
		    if (places.length === 0) {
		      return;
		    }
		    
		    for (var i = 0, imarker; imarker = imarkers[i] ;i++) {
		      imarker.setMap(null);
			  }
		
			 // For each place, get the icon, place name, and location.
	      imarkers = [];
	    	var bounds = new google.maps.LatLngBounds();
	    	
	    	for (var j = 0, place; place = places[j]; j++)
	    	{
	      	  var image = {
	        	url: place.icon,
	        	size: new google.maps.Size(71, 71),
	        	origin: new google.maps.Point(0, 0),
	        	anchor: new google.maps.Point(17, 34),
	        	scaledSize: new google.maps.Size(25, 25)
	      	};
	
	      	// Create a marker for each place.
      	  imarker = new google.maps.Marker({
	       	  map: map,
	       	  icon: image,
	       	  title: place.name,
	       	  position: place.geometry.location
	      	});
	
	      	imarkers.push(imarker);
		
		      bounds.extend(place.geometry.location);
	     	}
	     	
	      	map.fitBounds(bounds);
	      	map.setZoom(parseInt(useZoomFactor));
	      	map.setCenter(bounds.getCenter(), map.getBoundsZoomLevel(bounds));
	
		  });

		  // Bias the SearchBox results towards places that are within the bounds of the
	  	  // current map's viewport.
	  	  google.maps.event.addListener(map, 'bounds_changed', function() {
	      	var bounds = map.getBounds();
	      	searchBox.setBounds(bounds);
	  	  });
	  	        
}

function plotMarkersFromFile(){
	try{
		
		poiAreDownloaded = false;//getCookie("poiAreDownloaded");
		
		//Raderar cookie och localstorage om den gått ur tiden
		if (fullRefresh=="true" || cookieTimeOut=="0") {
			setCookie("poiAreDownloaded","",cookieTimeOut);
			poiAreDownloaded="false";
			clearLocalStorage();
		}
		
		if (poiAreDownloaded!="true") {
       //downloadFromFile();
       console.log("Download started " + kmlFullPath);
       downloadUrl(kmlFullPath, function(doc) {
				  gMarkers = doc.documentElement.getElementsByTagName("Placemark");
				  placeMarkers();
	     });
		
    } else {

			placeLocalMarkers();
			
		}

	      } catch(err){
	    	  console.log(err.message);
	      }
}

function placeMarkers() {
		console.log("Placemarkers:" + gMarkers.length);
		if (gMarkers.length > 1 ) {
			
    for (var i = 0; i < gMarkers.length; i++) {

			try {
				 var label = GXml.value(gMarkers[i].getElementsByTagName("name")[0]);
	             var latlngSplit = GXml.value(gMarkers[i].getElementsByTagName("coordinates")[0]).split(",");
	             var lat =parseFloat(latlngSplit[1]);
	             var lng =parseFloat(latlngSplit[0]);
	             
				 var point = new google.maps.LatLng(lat,lng);
   	
	             // create the marker on map
	             var marker = placeMarker(point,lat,lng,label);

	             // saves poi to localstorage up to 5mb if cashing selected
      	 saveToLocalStorage("poimarker"+i,label+";"+lat+","+lng);

			} catch (err) {
				 setCookie("poiAreDownloaded","false",cookieTimeOut);
			  console.log(err.message);
			}
	}

	setCookie("poiAreDownloaded","true",cookieTimeOut);
	  	poiAreDownloaded="true";

} else {
	//Markers not stored in localstorage
	poiAreDownloaded="false";
	plotMarkersFromFile();
}
	
	 //Hide info canvas
//document.getElementById("info_canvas").style.display="none";
					
	 //Show map
document.getElementById("map_canvas").style.display="block";
//document.getElementById("search_canvas").style.display="block";
}

function placeLocalMarkers() {
		
    for (var i = 0; i < localStorage.length; i++) {

			try {
				 console.log("plase");
				 var sMarker = localStorage.getItem("poimarker"+i);
				 var n = sMarker.split(";");
				 
				 var label = parseString(n[0]);
	             var latlngSplit = n[1].split(",");
	             var lat =parseFloat(latlngSplit[0]);
	             var lng =parseFloat(latlngSplit[1]);
	             
				 var point = new google.maps.LatLng(lat,lng);
	
		         // create the marker
		         placeMarker(point,lat,lng,label);
	         
			} catch (err) {
				//alert("Localstorage error. Is this map to big to store localy(max 5MB). Please select an other map. " + err.message);
				setCookie("poiAreDownloaded","",cookieTimeOut);
			poiAreDownloaded="false";
				clearLocalStorage();
				plotMarkersFromFile();
				
			}
	 }
	 
	//Hide info canvas
	//document.getElementById("info_canvas").style.display="none";
	
		//Show map
	document.getElementById("map_canvas").style.display="block";
	document.getElementById("search_canvas").style.display="block";
}

function placeMarker(location,lat,lng,label) {

	var html = "<b>" + label + "</b><br/> " +
		           "<a href='http://maps.google.com/?latlng=" + lat + "," + lng +
		           "'><i class='fa fa-location-arrow'></i></a><a href='quickstopapp://addpoi.com?#"+label+"#"+lat+"#"+lng+"'><i class='fa fa-heart'></i></a><a onclick='showStreetView()' href='javascript:void(0);'><i class='fa fa-street-view'></i></a><a onclick='showMapView()' href='javascript:void(0);'><i class='fa fa-times-circle'></i></a>";

  //var html =
        "<div id='Editpoi' class='modal fade' role='dialog'> <div class='modal-dialog'> <div class='modal-content'> <div class='modal-header'> <button type='button' class='close' data-dismiss='modal'>&times;</button> <h4 class='modal-title'>View Poi:</h4> </div> <div class='modal-body'> <div class='form-group'> <label for='name'>Name:</label> &lt;input type='name' class='form-control' id='name'&gt; </div> <div class='form-group'> <label for='desc'>Description:</label> &lt;input type='desc' class='form-control' id='desc'&gt; </div> <div class='form-group'> <label for='adress'>Adress:</label> &lt;input type='adress' class='form-control' id='adress'&gt; </div> <div class='form-group'> <label for='email'>Email:</label> &lt;input type='email' class='form-control' id='email'&gt; </div> <div class='form-group'> <label for='phone'>Phone:</label> &lt;input type='phone' class='form-control' id='phone'&gt; </div> <div class='form-group'> <label for='gps'>GPS:</label> &lt;input type='gps' class='form-control' id='gps'&gt; </div> <div class='fileupload fileupload-new' data-provides='fileupload'> <div class='fileupload-preview thumbnail'  200px; height: 150px;'></div> <div> <span class='btn btn-file'><span class='fileupload-new'>Select image</span><span class='fileupload-exists'>Change</span>&lt;input type='file' /&gt;&lt;/span> <a href='#' class='btn fileupload-exists' data-dismiss='fileupload'>Remove</a> </div> </div> <div class='checkbox'> <label>&lt;input type='checkbox'&gt; <i class='fa fa-glass' aria-hidden='true'></i> Water</label> <label>&lt;input type='checkbox'&gt; <i class='fa fa-trash' aria-hidden='true'></i> Trash</label> <label>&lt;input type='checkbox'&gt; <i class='fa fa-download' aria-hidden='true'></i> Greywaterdump</label> <label>&lt;input type='checkbox'&gt; <i class='fa fa-exclamation-triangle' aria-hidden='true'></i> Blackwaterdump</label> <label>&lt;input type='checkbox'&gt; <i class='fa fa-female' aria-hidden='true'></i><i class='fa fa-male' aria-hidden='true'></i> WC</label> <label>&lt;input type='checkbox'&gt; <i class='fa fa-tint' aria-hidden='true'></i> Duch</label> <label>&lt;input type='checkbox'&gt; <i class='fa fa-wifi' aria-hidden='true'></i> WiFi</label> <label>&lt;input type='checkbox'&gt; <i class='fa fa-shopping-cart' aria-hidden='true'></i> Shopping</label> <label>&lt;input type='checkbox'&gt; <i class='fa fa-cutlery' aria-hidden='true'></i> Restaurant</label> <label>&lt;input type='checkbox'&gt; <i class='fa fa-money' aria-hidden='true'></i> Not free</label> <label>&lt;input type='checkbox'&gt; <i class='fa fa-wheelchair' aria-hidden='true'></i> Disabled</label> <label>&lt;input type='checkbox'&gt; <i class='fa fa-tree' aria-hidden='true'></i> Nature</label> <label>&lt;input type='checkbox'&gt; <i class='fa fa-child' aria-hidden='true'></i> Playground</label> </div> </div> <div class='modal-footer'> <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button> <button type='button' class='btn btn-default' data-dismiss='modal'>Save</button> </div> </div> </div> </div>"


	var marker = new google.maps.Marker({
	      			position: location,
	      			title: label,
	      			flat: true,
	      			icon: pinIcon,
	      			map: map
	  				});

  infowindow = new google.maps.InfoWindow({
    content: html
    });

		google.maps.event.addListener(marker, 'click', function() {showMarkerInfo(location,html,marker);});

}

function getDirections(saddr,daddr) {
	 
	  var request = {
			    origin:saddr,
			    destination:daddr,
			    travelMode: google.maps.TravelMode.DRIVING
			  };
			  directionsService.route(request, function(result, status) {
			    if (status == google.maps.DirectionsStatus.OK) {
			      directionsDisplay.setDirections(result);
			    }
			  });
}

function showMarkerInfo(location,html,marker) {
	 
try {

			//Loads panorama image if available
	    panoramaOptions = {position: location};
    	panorama = new  google.maps.StreetViewPanorama(document.getElementById("street_canvas"), panoramaOptions);
  	  map.setStreetView(panorama);
  	  
  	  infowindow.open(map,marker);
  	  
  	  //document.getElementById("Editpoi").style.display="block";
  	 //$("#Editpoi").show();
	
		//Shows infolabels
		//	document.getElementById("divider_canvas").style.display="block";
		//	document.getElementById("divider_canvas").innerHTML=". . .";
							
		//	document.getElementById("map_info_canvas").style.display="block";
		//	document.getElementById("map_info_canvas").innerHTML=html;
							
		//	document.getElementById("map_canvas").style.display="block";
		//	document.getElementById("map_canvas").style.height="80%";
			
		//	document.getElementById("street_canvas").style.display="none";
    	
    //	window.scrollTo(0, document.body.scrollHeight/2);

} catch(err) {
	  console.log(err);
}
    
}
	  
function showStreetView() {
	
	try {
		
			//document.getElementById("map_canvas").style.display="none";
		  //document.getElementById("street_canvas").style.display="block";
		
		
			//panorama.setVisible(true);
		    
			//window.scrollTo(0, document.body.scrollHeight/2);
			
		} catch(err) {
  	  console.log(err);
  }
}

function showMapView() {
		
		try {
		  	
		  //	document.getElementById("map_canvas").style.display="block";
		  //	document.getElementById("map_canvas").style.height="100%";
		  	//document.getElementById("divider_canvas").style.display="none";
		  	//document.getElementById("map_info_canvas").style.display="none";
		//  	document.getElementById("street_canvas").style.display="none";
	
	} catch(err) {
  	  console.log(err);
  }
}

function codeToAddress(lat,lng) {
	    var geocoder = new google.maps.Geocoder();
	    var latlng = new google.maps.LatLng(lat, lng);
	    geocoder.geocode( { 'latLng': latlng}, function(results, status) {
	      if (status == google.maps.GeocoderStatus.OK) {
	        if (results[1]) {
          return results[1].formatted_address;
    } else {
      	return "No adress found";
    }
	       // return results[0].geometry.location;
	      } else {
	      //  alert("Geocode was not successful for the following reason: " + status);
	      }
	    });
	}
	
function gotPosition(pos) {
	try {
	 	curLatLng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
	 	//alert(codeToAddress(pos.coords.latitude,pos.coords.longitude));
	 	LoadMap(curLatLng);
	} catch(err) {
  	  console.log(err);
  }
}

function errorGettingPosition(err) {
	      	if(err.code==1)
	      	{
	    //  		alert("User denied geolocation." + err.message);
	      		curLatLng = new google.maps.LatLng(57.751809,14.170990);
	         	LoadMap(curLatLng);
	      		
	      	}
	      	else if(err.code==2)
	      	{
	      //		alert("Position unavailable." + err.message);
	      		curLatLng = new google.maps.LatLng(57.751809,14.170990);
	         	LoadMap(curLatLng);
	      	}
	      	else if(err.code==3)
	      	{
	      	//	alert("Timeout expired.");
	      		curLatLng = new google.maps.LatLng(57.751809,14.170990);
	         	LoadMap(curLatLng);
	      	}
	      	else
	      	{
	      	//	alert("ERROR: " + err.message);
	      		curLatLng = new google.maps.LatLng(57.751809,14.170990);
	         	LoadMap(curLatLng);
	      	}
}

//Init via listner
//google.maps.event.addDomListener(window, 'load', initialize);

function downloadFromFile(){
	
	
	jQuery.get(kmlFullPath, function(data) {
	  
        gMarkers = data.documentElement.getElementsByTagName("Placemark");
		    placeMarkers();
  
  });
  
}


