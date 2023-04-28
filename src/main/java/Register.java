import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonObject;

@WebServlet("/RegisterServlet")
public class Register extends HttpServlet {
	
	Connection conn = null;
	PreparedStatement pst = null;
	ResultSet rs = null;

	private static final long serialVersionUID = 1L;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) {
		
		String firstName = request.getParameter("firstName");
	    String lastName = request.getParameter("lastName");
	    String userEmail = request.getParameter("email");
	    String password = request.getParameter("password");

	 
	    int id = 0;
	    
	    
	    
	    try {
	        //System.out.println("made it here222"); 
	        
	        Class.forName("com.mysql.cj.jdbc.Driver");
	        //System.out.println("made it here" + "fname=" + firstName);
	        
	    	conn = DriverManager.getConnection(localproperties.MYSQL_LINK);
	        
	 
	        String query = "INSERT IGNORE INTO Users (firstName, lastName, password, userEmail) VALUES (?, ?, ?, ?)";
	        pst = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
	        
	        pst.setString(1, firstName);
	        pst.setString(2, lastName);
	        pst.setString(3, password);
	        pst.setString(4, userEmail);
	   

	        int rowsInserted = pst.executeUpdate();
	        if (rowsInserted > 0) {
	        	try {
	        	    //response.setContentType("text/plain");
	        	    rs = pst.getGeneratedKeys();
	        	    if (rs.next()) {
	                    id = rs.getInt(1);
	                }
	        	    System.out.println(id);
	                response.setContentType("application/json");
	                PrintWriter pw = response.getWriter();
	                JsonObject jo = new JsonObject();
	                jo.addProperty("success", id);
	                pw.print(jo.toString());
	                pw.flush();
	                pw.close();
	    		} catch (IOException e) {
	    			e.printStackTrace();
	    		}
        	}
	        else {
	        	try {
	                response.setContentType("application/json");
	                PrintWriter pw = response.getWriter();
	                JsonObject jo = new JsonObject();
	                jo.addProperty("success", "false");
	                pw.print(jo.toString());
	                pw.flush();
	                pw.close();
	    		} catch (IOException e) {
	    			e.printStackTrace();
	    		}
	        }
	        } catch (SQLException sqle) {
	        	System.out.println("SQL Exception: " + sqle.getMessage());
	        } catch (ClassNotFoundException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} finally {
				try {
					if (rs != null) {
						rs.close();
					}
					if (pst != null) {
						pst.close();
					}
					if (conn != null) {
						conn.close();
					}
				} catch (SQLException sqle) {
					System.out.println("SQL Exception: " + sqle.getMessage());
				}
			}
	    
		//System.out.println(id);
	}
}
