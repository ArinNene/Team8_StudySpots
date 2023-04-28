
public class Review {
	int id;
	int locationId;
	int userId;
	int rating;
	String locationReview;
	String username;
	String locationName;
	
	public Review(int i, int l, int u, String r, String us) {
		id = i;
		locationId = l;
		userId = u;
		locationReview = r;
		username = us;
	}
	public Review(int i, int l, int u, int rate, String r, String us) {
		id = i;
		locationId = l;
		userId = u;
		locationReview = r;
		this.rating = rate;
		username = us;
		this.locationName = us;
	}
}
