function handleAddReview() {
	    const locationId = document.getElementById("locationIdPass").value;
	    const userId = sessionStorage.getItem("user_id");
	    const rating = document.getElementById("rating").value;
	    const review = document.getElementById("review-text").value;
	    const locationName = document.getElementById("review-title").getAttribute("loc_name");

		var xhttp = new XMLHttpRequest();
		var requestStr = "LocationServlet?method=ADD_REVIEW&locationId=" + locationId + "&userId=" + userId + "&rating=" + rating + "&review=" + review + "&locationName=" + locationName; 
	  	xhttp.open("GET", requestStr,true);
	  	xhttp.onreadystatechange = function() {
	  	if (xhttp.readyState === xhttp.DONE) {
			var response = xhttp.responseText;
			if (response === '1') {
				alert("Successfully added review!");
				window.location = `index.html?locationId=${locationId}`;
			}
			else {
				alert("Error adding review.");
				window.location.href = `index.html?locationId=${locationId}`;
			}
		}
		}
		xhttp.send();
		return false;
	}