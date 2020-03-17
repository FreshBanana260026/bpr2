package login;

public class Notification {
    private final String category;
    private final String recipient;
    private final String origin;
    private final String content;

    public Notification(String category, String recipient, String origin, String content) {
        this.category = category;
        this.recipient = recipient;
        this.origin = origin;
        this.content = content;
    }

    public String getCategory() {
        return category;
    }

    public String getRecipient() {
        return recipient;
    }

    public String getOrigin() {
        return origin;
    }

    public String getContent() {
        return content;
    }
}
