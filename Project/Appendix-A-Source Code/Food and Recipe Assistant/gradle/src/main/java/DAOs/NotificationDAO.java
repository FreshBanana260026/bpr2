package DAOs;

import objects.Notification;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

public class NotificationDAO {

    private Connection connection;

    public NotificationDAO() {
        connection = DBConnector.getInstance().getConnection();
    }

    public boolean createNotification(String category, String recipient, String origin, String content) {
        try{
            Statement stmt = connection.createStatement();
            String sql = "INSERT INTO assistant.notifications (category, recipient, origin, content) " +
                    "VALUES (\"" + category + "\", \"" + recipient + "\", \"" + origin + "\", \"" + content + "\")";
            stmt.executeUpdate(sql);
            return true;
        }catch(Exception e){ System.out.println(e); return false;}
    }

    public ArrayList<Notification> getNotifications (String emailValue) {
        try{
            Statement stmt = connection.createStatement();
            String sql = "select  * from assistant.notifications where recipient = \"" + emailValue + "\"";
            ResultSet rs = stmt.executeQuery(sql);
            ArrayList<Notification> resultList = new ArrayList<>();
            while(rs.next())
                resultList.add(new Notification(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5)));
            return resultList;
        }catch(Exception e){ System.out.println(e); return new ArrayList<>();}
    }

    public boolean deleteNotification(String id) {
        try {
            Statement stmt = connection.createStatement();
            String sql = "DELETE FROM assistant.notifications WHERE id = \"" + id + "\"";
            stmt.executeUpdate(sql);
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }
}
