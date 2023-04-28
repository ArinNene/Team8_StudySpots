
public class Review {
	int id;
	int locationId;
	int userId;
	int rating;
	String locationReview;
	
	public Review(int i, int l, int u, int rating, String r) {
		id = i;
		locationId = l;
		userId = u;
		this.rating = rating;
		locationReview = r;
	}
}
