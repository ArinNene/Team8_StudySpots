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
			  const marker = new google.maps.Marker({
			    position: { lat: 34.02204940396223, lng: -118.28288224629772 },
			    map : map,
			    title: "Leavey Library",
			    icon: image
			  });
			  search(data[1].url, marker, data[1].id);
			  
			  const marker2 = new google.maps.Marker({
			    position: { lat: 34.02672700908403, lng: -118.27787745112164 },
			    map : map,
			    title: "Starbucks",
			    icon: image
			  });
			  search(data[0].url, marker2, data[0].id);
			  
			  const marker3 = new google.maps.Marker({
			    position: { lat: 34.02280700654238, lng: -118.29219754150525 },
			    map : map,
			    title: "It's Boba Time!",
			    icon: image
			  });
			  search(data[2].url, marker3, data[2].id);
			  
			  const marker4 = new google.maps.Marker({
			    position: { lat: 34.02952079190507, lng: -118.27671604256105 },
			    map : map,
			    title: "St. Vincent de Paul Roman Catholic Church",
			    icon: image
			  });
			  search(data[3].url, marker4, data[3].id);
			  
			  const marker5 = new google.maps.Marker({
			    position: { lat: 34.04155023682147, lng: -118.23265898862519 },
			    map : map,
			    title: "Verve Coffee",
			    icon: image
			  });
			  search(data[4].url, marker5, data[4].id);
			  
			  const marker6 = new google.maps.Marker({
			    position: { lat: 34.02543959124908, lng: -118.28529505463163 },
			    map : map,
			    title: "Dulce",
			    icon: image
			  });
			  search(data[5].url, marker6, data[5].id);
			  
			  const marker7 = new google.maps.Marker({
			    position: { lat: 34.02518619024948, lng: -118.28449970330696 },
			    map : map,
			    title: "CAVA",
			    icon: image
			  });
			  search(data[6].url, marker7, data[6].id);
		}
	}
}
initMap();

        function search(mapsURL, marker, id){
		// function search(const loc){
			// const location = loc;

           
			$.ajax({
				url: mapsURL,
				dataType: 'json',
				success: function(data) {
					console.log(data);


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
  		createString(place, id, function(contentString) {
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
  });
}

function createString(place, id, callback) {
  var rxhttp = new XMLHttpRequest();
  rxhttp.open("GET", "LocationServlet?method=REVIEWS&locationId=" + id, true);
  rxhttp.onreadystatechange = function() {
    if (rxhttp.readyState === rxhttp.DONE) {
      var data = JSON.parse(rxhttp.responseText);
      var openText = place.opening_hours.open_now ? "Open Now" : "Closed";
      var contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        `<h1 id="firstHeading" class="firstHeading">${place.name}</h1>` +
        '<div id="bodyContent">' +
        `<p> ${place.formatted_address}, ${place.rating}/5 </p>` +
        `<p> Open Now: ${place.opening_hours.open_now} </p>` +
        `<p>Attribution: GoogleMaps API </p>` +
        '<h2>Reviews:</h2>';
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
