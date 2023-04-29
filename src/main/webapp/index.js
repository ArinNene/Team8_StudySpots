let map;

async function initMap() {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  var xhttp = new XMLHttpRequest();
  	xhttp.open("GET", "LocationServlet?method=LOCATIONS", true);
  	xhttp.send(); 
  	xhttp.onreadystatechange = function() {
		if (xhttp.readyState === xhttp.DONE) {
			var data = JSON.parse(xhttp.responseText);

			  map = new Map(document.getElementById("map"), {
			    center: { lat: 34.02127561489714, lng: -118.2866354425022 },
			    zoom: 15,
			    options : {disableDefaultUI: true,
					  clickableIcons: false,
					  mapId: "f3947d79eba2c6f"}
			  });
			  const image = "img/purple_Marker.png"
			  for (var i = 0; i < data.length; i++) {
				  const marker = new google.maps.Marker;
				  search(data[i].url,marker,data[i].id);
			  }
		}
	}
}
initMap();

        function search(mapsURL, marker, id){
		// function search(const loc){
			// const location = loc;
		mapsURL = "https://proxy.cors.sh/" + mapsURL.substring(36);
           
			$.ajax({
				url: mapsURL,
				headers: { 'x-cors-api-key': 'temp_d89d42176f2e61a5067d9d71846ac18b' },
				dataType: 'json',
				success: function(data) {
					createPopUp(data.candidates[0], marker, id);

				},
				error: function(e) {
					alert("AJAX error")
					console.log(e)
					
				}
			})


			return false;
		}
		
	function createPopUp(place, marker, id) {
		var url_string = window.location;
			var url = new URL(url_string);
			const locationId = url.searchParams.get("locationId");
  		createString(place, id, marker.title, function(contentString) {
    	const infowindow = new google.maps.InfoWindow({
      content: contentString,
      ariaLabel: place.name,
    });

    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map: map,
      });
    });
    
    if(locationId && locationId == id) {
		infowindow.open({
        	anchor: marker,
       	 	map: map,
      	});
	}
  });
}

function createString(place, id, name, callback) {
  var rxhttp = new XMLHttpRequest();
  rxhttp.open("GET", "LocationServlet?method=REVIEWS&locationId=" + id, true);
  rxhttp.onreadystatechange = function() {
    if (rxhttp.readyState === rxhttp.DONE) {
      var data = JSON.parse(rxhttp.responseText);
      var openText = place.opening_hours.open_now ? "Open Now" : "Closed";
      var reviewText = data.length == 0 ? "No reviews yet" : "Reviews:"
      var contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        `<h1 id="firstHeading" class="firstHeading">${name}</h1>` +
        '<div id="bodyContent">' +
        `<p> ${place.formatted_address}, ${place.rating}/5 </p>` +
        `<p> ${openText} </p>` +
        `<p>Attribution: GoogleMaps API </p>` +
        `<a href = "./AddReview.html?locationId=` + id + `&location_name=` + name + `">Add Review</a></p>` +
        `<h2>${reviewText}</h2>`;
      for (var i = 0; i < data.length; i++) {
	contentString += '<div class="user_review">';
        contentString += '<h3>' + data[i].username + ': </h3>';
        contentString += '<p>' + data[i].locationReview + '</p>';
	contentString += "</div>";
      }
      contentString += "</div>" + "</div>";
      callback(contentString);
    }
  };
  rxhttp.send();
}
