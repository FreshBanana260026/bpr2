package DAOs;

import objects.RecentRecipe;
import objects.Recipe;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

public class RecipeDAO {

    private Connection connection;

    public RecipeDAO() {
        connection = DBConnector.getInstance().getConnection();
    }

    public ArrayList<Recipe> getRecipes(String emailValue) {
        try{
            Statement stmt = connection.createStatement();
            String sql = "select  * from assistant.recipes where email = \"" + emailValue + "\"";
            ResultSet rs = stmt.executeQuery(sql);
            ArrayList<Recipe> resultList = new ArrayList<>();
            while(rs.next())
                resultList.add(new Recipe(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getInt(7), rs.getInt(8)));
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

    public String addRecipe(String emailValue, String name, String category, String text, String ingredients, int preparation, int cooking) {
        try{
            Statement stmt = connection.createStatement();
            String sql = "INSERT INTO assistant.recipes (email, recipename, category, recipetext, ingredients, preparation, cooking) " +
                    "VALUES (\"" + emailValue + "\", \"" + name + "\", \"" + category + "\", \"" + text + "\",\""+ ingredients + "\", \"" + preparation + "\", \"" + cooking + "\")";
            stmt.executeUpdate(sql);
            Statement stmt2 = connection.createStatement();
            String sql2 = "SELECT LAST_INSERT_ID();";
            ResultSet rs2 = stmt2.executeQuery(sql2);
            rs2.next();
            return rs2.getString(1);
        }catch(Exception e){ System.out.println(e); return "";}
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
