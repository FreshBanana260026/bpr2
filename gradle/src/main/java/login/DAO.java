package login;
import java.sql.*;
import java.util.ArrayList;

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

    public ArrayList<Recipe> getRecipes(String emailValue) {
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/assistant","root","Pass123!");
            Statement stmt = con.createStatement();
            String sql = "select  * from assistant.recipes where email = \"" + emailValue + "\"";
            ResultSet rs = stmt.executeQuery(sql);
            ArrayList<Recipe> resultList = new ArrayList<>();
            while(rs.next())
                resultList.add(new Recipe(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6)));
                //System.out.println(rs.getString(5));
                //result = rs.getString(1);
            con.close();
            return resultList;
        }catch(Exception e){ System.out.println(e); return new ArrayList<>();}
    }

    public boolean addRecipe(String emailValue, String name, String category, String text, String ingredients) {
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/assistant","root","Pass123!");
            Statement stmt = con.createStatement();
            String sql = "INSERT INTO assistant.recipes (email, recipename, category, recipetext, ingredients) " +
                    "VALUES (\"" + emailValue + "\", \"" + name + "\", \"" + category + "\", \"" + text + "\",\""+ ingredients +"\")";
            stmt.executeUpdate(sql);
            return true;
        }catch(Exception e){ System.out.println(e); return false;}
    }

    public boolean removeRecipe(String id) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/assistant", "root", "Pass123!");
            Statement stmt = con.createStatement();
            String sql = "DELETE FROM assistant.recipes WHERE recipeid = \"" + id + "\"";
            stmt.executeUpdate(sql);
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }

    public boolean updateRecipe(String id, String recipeText, String recipename, String category, String ingredients) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/assistant", "root", "Pass123!");
            Statement stmt = con.createStatement();
            String sql = "UPDATE assistant.recipes SET recipename = "+recipename+", category ="+ category +" recipetext = " +recipeText+ ", ingredients = "+ ingredients +" WHERE recipe id ="+ id +"";
            stmt.executeUpdate(sql);
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }
}
