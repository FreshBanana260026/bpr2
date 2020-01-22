package login;

public class Login {

    private final String email;
    private final String password;
    private final String nick;

    public Login(String email, String password, String nick) {
        this.email = email;
        this.password = password;
        this.nick = nick;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getNick() {
        return nick;
    }
}
