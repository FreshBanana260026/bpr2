package login;
import java.sql.*;
import java.util.ArrayList;

public class DAO {

    private static DAO instance = null;
    private Connection connection;

    private DAO() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/assistant","root","Pass123!");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static DAO getInstance() {
        if (instance == null) {
            instance = new DAO();
        }
        return instance;
    }

    public boolean connect(String emailValue, String password, String nickname) {
        try{
            Statement stmt = connection.createStatement();
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
            Statement stmt = connection.createStatement();
            String sql = "select  userpassword from assistant.userlogin where email = \"" + emailValue + "\"";
            ResultSet rs = stmt.executeQuery(sql);
            rs.next();
            String result = rs.getString(1);
            return result.equals(password);
        }catch(Exception e){ System.out.println(e); return false;}
    }

    public ArrayList<Recipe> getRecipes(String emailValue) {
        try{
            Statement stmt = connection.createStatement();
            String sql = "select  * from assistant.recipes where email = \"" + emailValue + "\"";
            ResultSet rs = stmt.executeQuery(sql);
            ArrayList<Recipe> resultList = new ArrayList<>();
            while(rs.next())
                resultList.add(new Recipe(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getInt(7), rs.getInt(8)));
                //System.out.println(rs.getString(5));
                //result = rs.getString(1);
            //connection.close();
            return resultList;
        }catch(Exception e){ System.out.println(e); return new ArrayList<>();}
    }

    public Recipe getRecipe(String id) {
        try{
            Statement stmt = connection.createStatement();
            String sql = "select * from assistant.recipes where recipeid = \"" + id + "\"";
            ResultSet rs = stmt.executeQuery(sql);
            rs.next();
            return new Recipe(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getInt(7), rs.getInt(8));
        }catch(Exception e){ System.out.println(e); return null;}
    }

    public boolean addRecipe(String emailValue, String name, String category, String text, String ingredients, int preparation, int cooking) {
        try{
            Statement stmt = connection.createStatement();
            String sql = "INSERT INTO assistant.recipes (email, recipename, category, recipetext, ingredients, preparation, cooking) " +
                    "VALUES (\"" + emailValue + "\", \"" + name + "\", \"" + category + "\", \"" + text + "\",\""+ ingredients + "\", \"" + preparation + "\", \"" + cooking + "\")";
            stmt.executeUpdate(sql);
            return true;
        }catch(Exception e){ System.out.println(e); return false;}
    }

    public boolean removeRecipe(String id) {
        try {
            Statement stmt = connection.createStatement();
            String sql = "DELETE FROM assistant.recipes WHERE recipeid = \"" + id + "\"";
            stmt.executeUpdate(sql);
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }

    public boolean updateRecipe(String id, String recipeText, String recipename, String category, String ingredients, int preparation, int cooking) {
        try {
            Statement stmt = connection.createStatement();
            String sql = "UPDATE assistant.recipes SET recipename = \"" + recipename + "\", category = \"" + category + "\", recipetext = \"" + recipeText + "\", ingredients = \"" + ingredients + "\", preparation = \"" + preparation + "\", cooking = \"" + cooking + "\" WHERE recipeid = \"" + id + "\";";
            stmt.executeUpdate(sql);
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
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

    public boolean addItem(String email, String ingredient, String quantity) {
        try{
            Statement stmt = connection.createStatement();
            String sql = "INSERT INTO assistant.shoppinglistitems (email, ingredient, quantity) " +
                    "VALUES (\"" + email + "\", \"" + ingredient + "\", \"" + quantity + "\")";
            stmt.executeUpdate(sql);
            return true;
        }catch(Exception e){ System.out.println(e); return false;}
    }

    public boolean deleteItem(String id) {
        try {
            Statement stmt = connection.createStatement();
            String sql = "DELETE FROM assistant.shoppinglistitems WHERE id = \"" + id + "\"";
            stmt.executeUpdate(sql);
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }

    public ArrayList<Item> getItems(String email) {
        try{
            Statement stmt = connection.createStatement();
            String sql = "select  * from assistant.shoppinglistitems where email = \"" + email + "\"";
            ResultSet rs = stmt.executeQuery(sql);
            ArrayList<Item> resultList = new ArrayList<>();
            while(rs.next())
                resultList.add(new Item(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4)));
            return resultList;
        }catch(Exception e){ System.out.println(e); return new ArrayList<>();}
    }

    public boolean addRecentRecipe(String email, String recipeId) {
        try{
            Statement stmt = connection.createStatement();
            String sql = "INSERT INTO assistant.recentrecipes (email, recipeid) " +
                    "VALUES (\"" + email + "\", \"" + recipeId + "\")";
            stmt.executeUpdate(sql);
            return true;
        }catch(Exception e){ e.printStackTrace(); return false;}
    }

    public ArrayList<RecentRecipe> getRecentRecipes(String email) {
        try{
            Statement stmt = connection.createStatement();
            String sql = "select  * from assistant.recentrecipes where email = \"" + email + "\"";
            ResultSet rs = stmt.executeQuery(sql);
            ArrayList<RecentRecipe> resultList = new ArrayList<>();
            while(rs.next())
                resultList.add(new RecentRecipe(rs.getInt(1), rs.getString(2), rs.getString(3)));
            return resultList;
        }catch(Exception e){ System.out.println(e); return new ArrayList<>();}
    }
}
