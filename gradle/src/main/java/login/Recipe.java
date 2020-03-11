package login;

public class Recipe {

    private final String recipeid;
    private final String email;
    private final String recipename;
    private final String category;
    private final String recipetext;
    private final String ingrediences;


    public Recipe(String recipeid, String email, String recipename, String category, String recipetext, String ingrediences) {
        this.recipeid = recipeid;
        this.email = email;
        this.recipename = recipename;
        this.category = category;
        this.recipetext = recipetext;
        this.ingrediences = ingrediences;
    }

    public String getRecipeid() {
        return recipeid;
    }

    public String getEmail() {
        return email;
    }

    public String getRecipename() {
        return recipename;
    }

    public String getCategory() {
        return category;
    }

    public String getRecipetext() {
        return recipetext;
    }

    public String getIngrediences() {
        return ingrediences;
    }
}
