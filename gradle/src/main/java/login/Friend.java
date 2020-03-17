package login;

public class Friend {
    private final String userEmail;
    private final String friendEmail;

    public Friend(String userEmail, String friendEmail) {
        this.userEmail = userEmail;
        this.friendEmail = friendEmail;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getFriendEmail() {
        return friendEmail;
    }
}
