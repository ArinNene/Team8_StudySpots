import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@WebServlet("/LocationServlet")
public class Location extends HttpServlet {
   
	Connection conn = null;
	PreparedStatement pst = null;
	ResultSet rs = null;

	private static final long serialVersionUID = 1L;
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		Connection conn = null;
		Statement st = null;
		ResultSet rs = null;
		
		String method = req.getParameter("method");
		
		Gson gson = new GsonBuilder().create();
		PrintWriter pw = res.getWriter();
		res.setContentType("application/json");
		res.setCharacterEncoding("UTF-8");
		
		if(method == null || method.isBlank()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			String error = "Info missing";
			pw.write(gson.toJson(error));
			pw.flush();
		}
		
		if(method.equals("LOCATIONS")) {
			try {
				conn = DriverManager.getConnection(localproperties.MYSQL_LINK);
				ArrayList<LocationObject> locs = new ArrayList<>();
				st = conn.createStatement();
				rs = st.executeQuery("SELECT * FROM Locations");
				while(rs.next()) locs.add(
						new LocationObject(rs.getInt("location_id"), rs.getString("location_url"), rs.getString("location_name"))
						);
				
				pw.write(gson.toJson(locs));
				pw.flush();
			} catch (SQLException e) {
				System.out.println("SQLError in LOCATIONS");
				System.out.println(e.getMessage());
				pw.write(gson.toJson(-1));
				pw.flush();
			} finally {
				try {
					if(st != null) st.close();
					if(conn != null) conn.close();
					if(rs != null) rs.close();
				} catch (SQLException sqle) {
					System.out.println("SQL Error");
					System.out.println(sqle.getMessage());
				}
			}
		} else if(method.equals("REVIEWS")) {
			try {
				conn = DriverManager.getConnection(localproperties.MYSQL_LINK);
				String locationIdS = req.getParameter("locationId");
				if(locationIdS == null || locationIdS.isBlank()) {
					res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
					String error = "Info missing";
					pw.write(gson.toJson(error));
					pw.flush();
				}
				
				ArrayList<Review> revs = new ArrayList<>();
				int locationId = Integer.parseInt(locationIdS);
				st = conn.createStatement();
				rs = st.executeQuery("SELECT * FROM LocationReview WHERE location_id = " + locationId);
				if(!rs.next()) {
					pw.write(gson.toJson(-1));
					pw.flush();
				} else {
					while(rs.next()) revs.add(new Review(rs.getInt("review_id"), rs.getInt("location_id"), rs.getInt("user_id"), rs.getString("location_review"), rs.getString("username")));
					pw.write(gson.toJson(revs));
					pw.flush();
				}
			} catch (SQLException e) {
				System.out.println("SQLError in REVIEWS");
				System.out.println(e.getMessage());
				pw.write(gson.toJson(-1));
				pw.flush();
			} finally {
				try {
					if(st != null) st.close();
					if(conn != null) conn.close();
					if(rs != null) rs.close();
				} catch (SQLException sqle) {
					System.out.println("SQL Error");
					System.out.println(sqle.getMessage());
				}
			}
		} else if(method.equals("ADD_REVIEW")) {
			try {
				conn = DriverManager.getConnection(localproperties.MYSQL_LINK);
				String locationIdS = req.getParameter("locationId");
				String userIdS = req.getParameter("userId");
				String ratingS = req.getParameter("rating");
				String locationReview = req.getParameter("review");
				if(locationIdS == null || locationIdS.isBlank() ||
					userIdS == null || userIdS.isBlank() ||
					ratingS == null || ratingS.isBlank() ||
					locationReview == null || locationReview.isBlank()
				) {
					res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
					String error = "Info missing";
					pw.write(gson.toJson(error));
					pw.flush();
				}
				
				int locationId = Integer.parseInt(locationIdS);
				int userId = Integer.parseInt(userIdS);
				int rating = Integer.parseInt(ratingS);
				
				st = conn.createStatement();
				rs = st.executeQuery("INSERT INTO LocationReview (location_id, user_id, location_review, rating) VALUES (" + locationId + ", " + userId + ", '" + locationReview + "', " + rating);
				pw.write(gson.toJson(1));
				pw.flush();
			} catch (SQLException e) {
				System.out.println("SQLError in ADD REVIEW");
				System.out.println(e.getMessage());
				pw.write(gson.toJson(-1));
				pw.flush();
			} finally {
				try {
					if(st != null) st.close();
					if(conn != null) conn.close();
					if(rs != null) rs.close();
				} catch (SQLException sqle) {
					System.out.println("SQL Error");
					System.out.println(sqle.getMessage());
				}
			}
		} else if(method.equals("REMOVE_REVIEW")) {
			try {
				conn = DriverManager.getConnection(localproperties.MYSQL_LINK);
				String reviewIdS = req.getParameter("reviewId");
				if(reviewIdS == null || reviewIdS.isBlank()) {
					res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
					String error = "Info missing";
					pw.write(gson.toJson(error));
					pw.flush();
				}
				
				int reviewId = Integer.parseInt(reviewIdS);
				
				st = conn.createStatement();
				st.execute("DELETE FROM LocationReview WHERE review_id = " + reviewId);
				pw.write(gson.toJson(1));
				pw.flush();
			} catch (SQLException e) {
				System.out.println("SQLError in ADD REVIEW");
				System.out.println(e.getMessage());
				pw.write(gson.toJson(-1));
				pw.flush();
			} finally {
				try {
					if(st != null) st.close();
					if(conn != null) conn.close();
					if(rs != null) rs.close();
				} catch (SQLException sqle) {
					System.out.println("SQL Error");
					System.out.println(sqle.getMessage());
				}
			}
		}
	}
	
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		
		Connection conn = null;
		Statement st = null;
		ResultSet rs = null;
		
		Gson gson = new GsonBuilder().create();
		PrintWriter pw = res.getWriter();
		res.setContentType("application/json");
		res.setCharacterEncoding("UTF-8");
		
		try {
			conn = DriverManager.getConnection(localproperties.MYSQL_LINK);
			String userIdS = req.getParameter("userId");
			if(userIdS == null || userIdS.isBlank()) {
				res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				String error = "Info missing";
				pw.write(gson.toJson(error));
				pw.flush();
			}
			
			ArrayList<Review> revs = new ArrayList<>();
			int userId = Integer.parseInt(userIdS);
			st = conn.createStatement();
			rs = st.executeQuery("SELECT USCStudySpots.LocationReview.*, USCStudySpots.Locations.location_name FROM USCStudySpots.LocationReview INNER JOIN USCStudySpots.Locations ON USCStudySpots.LocationReview.location_id=USCStudySpots.Locations.location_id WHERE user_id=" + userId);
			if(!rs.next()) {
				System.out.println("REACHED HERE!");
				pw.write(gson.toJson(-1));
				pw.flush();
			} else {
				while(rs.next()) revs.add(new Review(rs.getInt("review_id"), rs.getInt("location_id"), rs.getInt("user_id"), rs.getInt("rating"), rs.getString("location_review"), rs.getString("location_name")));
				pw.write(gson.toJson(revs));
				pw.flush();
			}
		} catch (SQLException e) {
			System.out.println("SQLError in REVIEWS");
			System.out.println(e.getMessage());
			pw.write(gson.toJson(-1));
			pw.flush();
		} finally {
			try {
				if(st != null) st.close();
				if(conn != null) conn.close();
				if(rs != null) rs.close();
			} catch (SQLException sqle) {
				System.out.println("SQL Error");
				System.out.println(sqle.getMessage());
			}
		}
	}
}