package login;

public class Item {
    private final String id;
    private final String email;
    private final String ingredient;
    private final String quantity;

    public Item(String id, String email, String ingredient, String quantity) {
        this.id = id;
        this.email = email;
        this.ingredient = ingredient;
        this.quantity = quantity;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getIngredient() {
        return ingredient;
    }

    public String getQuantity() {
        return quantity;
    }
}
