package DAOs;

import objects.Item;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

public class ShoppingListDAO {

    private Connection connection;

    public ShoppingListDAO() {
        connection = DBConnector.getInstance().getConnection();
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
}
