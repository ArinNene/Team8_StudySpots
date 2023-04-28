function handleLogin() {
	event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

	var xhttp = new XMLHttpRequest(); 
  	//xhttp.open("GET", "LoginServlet?firstName=" + firstName + "&lastName=" + lastName + "&email=" + email + "&password=" + password);
  	var requestStr = "LoginServlet?email=" + email + "&password=" + password;
  	xhttp.open("GET", requestStr, true);
  	xhttp.onreadystatechange = function() {
  	if (xhttp.readyState === xhttp.DONE) {
		var response = this.responseText;
		if (response === '404') {
			alert("Could not login");
		} else {
                // Redirect to index.html on successful login
                sessionStorage.setItem("user_id", response)
                window.location.href = "index.html";
            }
	}
	}
	xhttp.send();
}/**
 * 
 */