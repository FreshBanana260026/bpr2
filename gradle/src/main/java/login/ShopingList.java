package login;

public class ShopingList {

    private final String itemDescription;
    private final String itemID;
    private final String quantity;

    public ShopingList(String itemDescription, String itemID, String quantity) {
        this.itemDescription = itemDescription;
        this.itemID = itemID;
        this.quantity = quantity;
    }

    public String getItemID() {
        return itemID;
    }

    public String getQuantity() {
        return quantity;
    }

    public String getItemDescription() {
        return itemDescription;
    }
}
