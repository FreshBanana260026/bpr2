package login;
import java.sql.*;

public class DAO {
    public DAO() {
    }

    public boolean connect(String emailValue, String password, String nickname) {
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/assistant","root","Pass123!");
            Statement stmt = con.createStatement();
            String sql = "INSERT INTO assistant.userlogin (email, userpassword, nickname) " +
                    "VALUES (\"" + emailValue + "\", \"" + password + "\", \"" + nickname + "\")";
            stmt.executeUpdate(sql);
            /*while(rs.next())
                System.out.println(rs.getInt(1)+"  "+rs.getString(2)+"  "+rs.getString(3));
            con.close();*/
            return true;
        }catch(Exception e){ System.out.println(e); return false;}
    }

    public boolean login(String emailValue, String password) {
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/assistant","root","Pass123!");
            Statement stmt = con.createStatement();
            String sql = "select  userpassword from assistant.userlogin where email = \"" + emailValue + "\"";
            ResultSet rs = stmt.executeQuery(sql);
            rs.next();
            String result = rs.getString(1);
            /*while(rs.next())
                //System.out.println(rs.getString(1));
                result = rs.getString(1);*/
            con.close();
            return result.equals(password);
        }catch(Exception e){ System.out.println(e); return false;}
    }

}
