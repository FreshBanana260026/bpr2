package DAOs;

import objects.Friend;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

public class FriendsDAO {

    private Connection connection;

    public FriendsDAO() {
        connection = DBConnector.getInstance().getConnection();
    }

    public boolean addFriend(String userEmail, String friendEmail) {
        try{
            Statement stmt = connection.createStatement();
            String sql = "INSERT INTO assistant.friends (useremail, friendemail) " +
                    "VALUES (\"" + userEmail + "\", \"" + friendEmail + "\")";
            stmt.executeUpdate(sql);
            return true;
        }catch(Exception e){ System.out.println(e); return false;}
    }

    public ArrayList<Friend> getFriends (String emailValue) {
        try{
            Statement stmt = connection.createStatement();
            String sql = "select  * from assistant.friends where useremail = \"" + emailValue + "\"";
            ResultSet rs = stmt.executeQuery(sql);
            ArrayList<Friend> resultList = new ArrayList<>();
            while(rs.next())
                resultList.add(new Friend(rs.getString(1), rs.getString(2)));
            return resultList;
        }catch(Exception e){ System.out.println(e); return new ArrayList<>();}
    }

}
