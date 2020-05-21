package DAOs;

import java.io.File;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class LoginDAO {

    private Connection connection;

    public LoginDAO() {
        connection = DBConnector.getInstance().getConnection();
    }

    public boolean register(String emailValue, String password, String nickname) {
        try{
            Statement stmt = connection.createStatement();
            String sql = "INSERT INTO assistant.userlogin (email, userpassword, nickname) " +
                    "VALUES (\"" + emailValue + "\", \"" + password + "\", \"" + nickname + "\")";
            stmt.executeUpdate(sql);
            new File("C:\\assistant\\pictures\\" + emailValue).mkdirs();
            return true;
        }catch(Exception e){ System.out.println(e); return false;}
    }

    public boolean login(String emailValue, String password) {
        try{
            Statement stmt = connection.createStatement();
            String sql = "select  userpassword from assistant.userlogin where email = \"" + emailValue + "\"";
            ResultSet rs = stmt.executeQuery(sql);
            rs.next();
            String result = rs.getString(1);
            return result.equals(password);
        }catch(Exception e){ System.out.println(e); return false;}
    }

    public String getNick(String email) {
        try {
            Statement stmt = connection.createStatement();
            String sql = "select nickname from assistant.userlogin where email = \"" + email + "\"";
            ResultSet rs = stmt.executeQuery(sql);
            rs.next();
            return rs.getString(1);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

        public boolean updateProfile(String email, String password, String nick) {
            try {
                Statement stmt = connection.createStatement();
                String sql = "UPDATE assistant.userlogin SET userpassword = \"" + password +  "\", nickname = \"" + nick + "\" WHERE email = \"" + email + "\";";
                stmt.executeUpdate(sql);
                return true;
            } catch (Exception e) {
                System.out.println(e);
                return false;
            }
        }
}
