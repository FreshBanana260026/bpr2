package login;

public class RecentRecipe {

    private final int id;
    private final String email;
    private final String recipeid;

    public RecentRecipe(int id, String email, String recipeid) {
        this.id = id;
        this.email = email;
        this.recipeid = recipeid;
    }

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getRecipeid() {
        return recipeid;
    }
}
