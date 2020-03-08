package login;

public class Recipe {

    private final int recipeId;
    private final String email;
    private final String recipeName;
    private final String recipeText;

    public Recipe(int recipeId,String email,String recipeName,String recipeText){
        this.recipeId = recipeId;
        this.email = email;
        this.recipeName = recipeName;
        this.recipeText = recipeText;
    }

    public String getEmail(){return email;}

    public int getRecipeId(){}
}
