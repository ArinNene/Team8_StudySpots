function handleLogin() {
	event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

	var xhttp = new XMLHttpRequest(); 
  	//xhttp.open("GET", "LoginServlet?firstName=" + firstName + "&lastName=" + lastName + "&email=" + email + "&password=" + password);
  	xhttp.open("GET", "LoginServlet?email=" + email + "&password=" + password, true);
  	xhttp.onreadystatechange = function() {
  	if (xhttp.readyState === xhttp.DONE) {
		var response = JSON.parse(this.responseText);
		if (response.success == "false") {
			alert("Could not login");
		} else {
                // Redirect to index.html on successful login
                sessionStorage.setItem("user_id", response.success)
                window.location.href = "index.html";
            }
	}
	}
	xhttp.send();
}/**
 * 
 */