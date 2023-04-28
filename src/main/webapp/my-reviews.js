async function getMyReviews() {
	//fetch details
	
	let url = new URL(window.location.origin + "/Location.java");
	const params = {
		method: "USER_REVIEWS",
		userId: sessionStorage.getItem("user_id")
	}
	url.search = new URLSearchParams(params).toString();
	
	const response = await fetch(url);
	const reviews = response.json();
	return reviews;
	
}