package server;
import objects.Item;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class ShoppingListController {

    final String URL = "http://localhost:8081";
    DAO d = DAO.getInstance();

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/item", method = RequestMethod.POST, consumes = "application/json")
    public boolean addItem(@RequestBody Item item) {
        return d.addItem(item.getEmail(), item.getIngredient(), item.getQuantity());
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/item", method = RequestMethod.DELETE)
    public boolean deleteItem(@RequestParam(value = "id") String id) {
        return d.deleteItem(id);
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/items", method = RequestMethod.GET)
    public ArrayList<Item> getItems(@RequestParam(value = "email") String email) {
        return d.getItems(email);
    }
}
