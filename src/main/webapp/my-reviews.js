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
		  if(data == -1) alert("No reviews yet!");
		  else data.forEach(function(review) {
		        var card = document.createElement('div');
		        card.classList.add('card');
		
		        var row1 = document.createElement('div');
		        row1.classList.add('row1');
		        card.appendChild(row1);
		
		        // Add the event details to the card
		        var name = document.createElement('h4');
		        name.textContent = review.locationName; // Fixed variable name
		        row1.appendChild(name);
		        
		        var starDiv = document.createElement("div");
		        starDiv.setAttribute("class", "star-rating");
		        
		        for(let i = 1; i < 6; i++) {
					let star = document.createElement("span");
					star.setAttribute("class", "fa fa-star fa-fw");
					star.setAttribute("data-rating", i);
					star.style.fontsize = '2em';
					if (i < review.rating) {
				 	   star.style.color = 'gold';
				  	} else {
					    star.style.color = 'gray';
				  	}
					starDiv.appendChild(star);
				}
				
				row1.appendChild(starDiv);
		
		        var row2 = document.createElement('div');
		        row2.classList.add('row2');
		        card.appendChild(row2);
		
		        var reviewText = document.createElement('p');
		        reviewText.textContent = review.locationReview; // Fixed variable name
		        row2.appendChild(reviewText);
		        
		        var container = document.getElementById('review-container');
		        container.appendChild(card);
	      });
	  }
  }

};
