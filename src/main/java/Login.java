

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonObject;

/**
 * Servlet implementation class Login
 */
@WebServlet("/LoginServlet")
public class Login extends HttpServlet {
   
	Connection conn = null;
	PreparedStatement pst = null;
	ResultSet rs = null;

	private static final long serialVersionUID = 1L;
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		//System.out.println("connected to Servlet");
	    String userEmail = request.getParameter("email");
	    String password = request.getParameter("password");
	    int id = 0;
	    
	    try {
	    	Class.forName("com.mysql.cj.jdbc.Driver");
	    	
	    	 conn = DriverManager.getConnection(localproperties.MYSQL_LINK);
	        
	        String query = "SELECT * FROM Users WHERE userEmail=? AND password=?";
	        pst = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);

	        pst.setString(1, userEmail);
	        pst.setString(2, password);

	        ResultSet rs = pst.executeQuery();
	        
	        
	        if (rs.next()) {
	            // login successful
	        	 rs = pst.getGeneratedKeys();
	        	    if (rs.next()) {
	                    id = rs.getInt(1);
	                }  
	                response.setContentType("application/json");
	                PrintWriter pw = response.getWriter();
	                JsonObject jo = new JsonObject();
	                jo.addProperty("success", id);
	                pw.print(jo.toString());
	                pw.flush();
	                pw.close();
	        } else {
	            // login failed
	            // return an error string
                response.setContentType("application/json");
                PrintWriter pw = response.getWriter();
                JsonObject jo = new JsonObject();
                jo.addProperty("success", "false");
                pw.print(jo.toString());
                pw.flush();
                pw.close();
	        }} catch (ClassNotFoundException | SQLException e1) {
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
	        
	    
	    

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	}
}

