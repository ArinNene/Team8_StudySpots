/**
 * 
 */

 function handleLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

	var xhttp = new XMLHttpRequest(); 
  	xhttp.open("GET", "LoginServlet?firstName=" + firstName + "&lastName=" + lastName + "&email=" + email + "&password=" + password);
  	xhttp.onreadystatechange = function() {
  	if (xhttp.readyState === xhttp.DONE) {
		var response = xhttp.responseText;
		if (response === '404') {
			alert("Could not login");
		}
	}
	}
	xhttp.send();
}/**
 * 
 */