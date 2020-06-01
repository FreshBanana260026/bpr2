package objects;

public class Notification {

    private final String id;
    private final String category;
    private final String recipient;
    private final String origin;
    private final String content;

    public Notification(String id, String category, String recipient, String origin, String content) {
        this.id = id;
        this.category = category;
        this.recipient = recipient;
        this.origin = origin;
        this.content = content;
    }

    public String getId() {
        return id;
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
