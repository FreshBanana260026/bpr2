package login;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

import static login.ImageManager.*;

@RestController
public class LoginController {

    final String URL = "http://localhost:8081";
    DAO d = DAO.getInstance();

    /*@CrossOrigin(origins = "http://localhost:8081")
    @RequestMapping(path = "/login2", method = RequestMethod.GET)
    public Login greeting(@RequestParam(value="userName", defaultValue="Stranger") String userName) {
        System.out.println(userName);
        d.connect(userName, "passito", "nick");
        return new Login(userName, "", "");
    }*/

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/register", method = RequestMethod.POST, consumes = "application/json")
    public boolean register(@RequestBody Login login) {
        return d.connect(login.getEmail(), login.getPassword(), login.getNick());
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/login", method = RequestMethod.POST, consumes = "application/json")
    public boolean login(@RequestBody Login login) {
        d.getRecipes(login.getEmail());
        return d.login(login.getEmail(), login.getPassword());
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/nick", method = RequestMethod.GET)
    public Login getNick(@RequestParam(value = "email") String email) {
        return new Login("", "", d.getNick(email));
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/profile", method = RequestMethod.PUT, consumes = "application/json")
    public boolean updatePassword(@RequestBody Login data){
        return d.updateProfile(data.getEmail(), data.getPassword(), data.getNick());
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/getRecipes", method = RequestMethod.GET)
    public ArrayList<Recipe> getRecipes(@RequestParam(value = "email") String email) {
        return d.getRecipes(email);
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/recipe", method = RequestMethod.GET)
    public Recipe getRecipe(@RequestParam(value = "id") String id) {
        return d.getRecipe(id);
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/addNewRecipe", method = RequestMethod.POST, consumes = "application/json")
    public String addNewRecipe(@RequestBody Recipe recipe) {
        String res = d.addRecipe(recipe.getEmail(), recipe.getRecipename(), recipe.getCategory(), recipe.getRecipetext(), recipe.getIngredients(), recipe.getPreparation(), recipe.getCooking());
        return res;
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/recipe", method = RequestMethod.DELETE)
    public boolean removeOldRecipe(@RequestParam(value="id", defaultValue="") String id, @RequestParam(value = "email") String email){
        ImageManager.removeImage(email, id);
        return d.removeRecipe(id);
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/updateRecipe", method = RequestMethod.PUT, consumes = "application/json")
    public boolean updateOldRecipe(@RequestBody Recipe recipe){
        return d.updateRecipe(recipe.getRecipeid(),recipe.getRecipetext(), recipe.getRecipename(), recipe.getCategory(), recipe.getIngredients(), recipe.getPreparation(), recipe.getCooking());
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/friend", method = RequestMethod.POST, consumes = "application/json")
    public boolean addFriend(@RequestBody Friend friend) {
        d.addFriend(friend.getFriendEmail(), friend.getUserEmail());
        return d.addFriend(friend.getUserEmail(), friend.getFriendEmail());
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/friends", method = RequestMethod.GET)
    public ArrayList<Friend> getFriends(@RequestParam(value = "email") String email) {
        return d.getFriends(email);
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/notification", method = RequestMethod.POST, consumes = "application/json")
    public boolean createNotification(@RequestBody Notification notification) {
        return d.createNotification(notification.getCategory(), notification.getRecipient(), notification.getOrigin(), notification.getContent());
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/notifications", method = RequestMethod.GET)
    public ArrayList<Notification> getNotifications(@RequestParam(value = "email") String email) {
        return d.getNotifications(email);
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/notifications", method = RequestMethod.DELETE)
    public boolean deleteNotification(@RequestParam(value = "id") String id) {
        return d.deleteNotification(id);
    }

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

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/recentRecipes", method = RequestMethod.POST, consumes = "application/json")
    public boolean addItem(@RequestBody RecentRecipe recipe) {
        return d.addRecentRecipe(recipe.getEmail(), recipe.getRecipeid());
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/recentRecipes", method = RequestMethod.GET)
    public ArrayList<RecentRecipe> getRecentRecipes(@RequestParam(value = "email") String email) {
        return d.getRecentRecipes(email);
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/image", method = RequestMethod.POST, consumes = "multipart/form-data")
    public boolean saveImage(@RequestParam("file") MultipartFile file, @RequestParam(value = "email") String email) {
        return save(file, "C:\\assistant\\pictures\\" + email);
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/image", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public Resource getImage(@RequestParam(value = "email") String email, @RequestParam(value = "id") String id) {
        return  new ImageManager().getImage("file:C:\\assistant\\pictures\\" + email + "\\" + id);
    }
}
