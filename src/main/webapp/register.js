/**
 * 
 */

 function handleRegister() {
	 event.preventDefault();
	//console.log(document.getElementById("firstname").value);
    const firstName = document.getElementById("firstname").value;
    
    const lastName = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

	var xhttp = new XMLHttpRequest(); 
  	xhttp.open("GET", "RegisterServlet?firstName=" + firstName + "&lastName=" + lastName + "&email=" + email + "&password=" + password);
  	xhttp.onreadystatechange = function() {
  	if (xhttp.readyState === xhttp.DONE) {
		var response = JSON.parse(this.responseText);
		if (response.success == "false") {
			alert("Username or Email already taken");
		}
		else {
                // Redirect to index.html on successful registration
                sessionStorage.setItem("user_id", response.success)
                window.location.href = "index.html";
            }
	}
	}
	xhttp.send();
}