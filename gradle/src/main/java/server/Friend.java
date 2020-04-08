package server;

public class Friend {
    private final String useremail;
    private final String friendemail;

    public Friend(String useremail, String friendemail) {
        this.useremail = useremail;
        this.friendemail = friendemail;
    }

    public String getUserEmail() {
        return useremail;
    }

    public String getFriendEmail() {
        return friendemail;
    }
}
