function handleAddReview() {
	    const locationId = document.getElementById("locationId").value;
	    const userId = sessionStorage.getItem("userId");
	    const rating = document.getElementById("rating").value;
	    const review = document.getElementById("review-text").value;

		var xhttp = new XMLHttpRequest(); 
	  	xhttp.open("GET", "LocationServlet?method=ADD_REVIEW&locationId=" + locationId + "&userId=" + userId + "&rating=" + rating + "&review=" + review);
	  	xhttp.onreadystatechange = function() {
	  	if (xhttp.readyState === xhttp.DONE) {
			var response = xhttp.responseText;
			if (response === '1') {
				alert("Successfully added review!");
				window.location.href = "index.html";
			}
			else {
				alert("Error adding review.");
				window.location.href = "index.html";
			}
		}
		}
		xhttp.send();
	}