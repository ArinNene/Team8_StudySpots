
public class Review {
	int id;
	int locationId;
	int userId;
	String locationReview;
	String username;
	
	public Review(int i, int l, int u, String r, String us) {
		id = i;
		locationId = l;
		userId = u;
		locationReview = r;
		username = us;
	}
}
