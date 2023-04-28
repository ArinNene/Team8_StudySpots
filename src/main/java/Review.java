
public class Review {
	int id;
	int locationId;
	int userId;
	int rating;
	String locationReview;
	String locationName;
	
	public Review(int i, int l, int u, int rating, String r, String name) {
		id = i;
		locationId = l;
		userId = u;
		this.rating = rating;
		locationReview = r;
		locationName = name;
	}
}
