/**
 * 
 */

 function handleRegister() {
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
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
		else {
			 sessionStorage.setItem("user_id", response)
			 alert("Registration successful.")
             window.location.href = "index.html";
		}
	}
	}
	xhttp.send();
}