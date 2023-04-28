window.onload = function() {
  var url = window.location.origin + "/Location.java";
  var data = {
    userId: sessionStorage.getItem("user_id")
  };
  fetch(url, {
    method: 'POST', // Changed to a valid HTTP method
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data.length == 0) {
      alert("You have no reviews!");
    } else {
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
      });
    }
  });
};
