/**
 * 
 */

 function handleRegister() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

	var xhttp = new XMLHttpRequest(); 
  	xhttp.open("GET", "RegisterServlet?firstName=" + firstName + "&lastName=" + lastName + "&email=" + email + "&password=" + password);
  	xhttp.onreadystatechange = function() {
  	if (xhttp.readyState === xhttp.DONE) {
		var response = xhttp.responseText;
		if (response === '404') {
			alert("Username or Email already taken");
		}
	}
	}
	xhttp.send();
}