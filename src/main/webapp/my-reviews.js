window.onload = function() {
  var data;
  var userId = sessionStorage.getItem("user_id")
  var xhttp = new XMLHttpRequest();
  var requestStr = "LocationServlet?userId=" + userId;
  xhttp.open("POST",requestStr,true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
	  if (xhttp.readyState === xhttp.DONE) {
		  var data = JSON.parse(xhttp.responseText);
		  data.forEach(function(review) {
		        var card = document.createElement('div');
		        card.classList.add('card');
		
		        var row1 = document.createElement('div');
		        row1.classList.add('row1');
		        card.appendChild(row1);
		
		        // Add the event details to the card
		        var name = document.createElement('h4');
		        name.textContent = review.location_name; // Fixed variable name
		        row1.appendChild(name);
		
		        var rating = document.createElement('p');
		        rating.textContent = review.rating; // Fixed variable name
		        row1.appendChild(rating);
		
		        var row2 = document.createElement('div');
		        row2.classList.add('row2');
		        card.appendChild(row2);
		
		        var reviewText = document.createElement('p');
		        reviewText.textContent = review.location_review; // Fixed variable name
		        row2.appendChild(reviewText);
		        
		        var container = document.getElementById('review-container');
		        container.appendChild(card);
	      });
	  }
  }

};
