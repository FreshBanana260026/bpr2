package server;

public class Recipe {

    private final String recipeid;
    private final String email;
    private final String recipename;
    private final String category;
    private final String recipetext;
    private final String ingredients;
    private final int preparation;
    private final int cooking;


    public Recipe(String recipeid, String email, String recipename, String category, String recipetext, String ingredients, int preparation, int cooking) {
        this.recipeid = recipeid;
        this.email = email;
        this.recipename = recipename;
        this.category = category;
        this.recipetext = recipetext;
        this.ingredients = ingredients;
        this.preparation = preparation;
        this.cooking = cooking;
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

    public String getIngredients() {
        return ingredients;
    }

    public int getPreparation() {
        return preparation;
    }

    public int getCooking() {
        return cooking;
    }
}
