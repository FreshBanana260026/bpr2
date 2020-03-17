package login;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;

@RestController
public class LoginController {

    DAO d = DAO.getInstance();

    /*@CrossOrigin(origins = "http://localhost:8081")
    @RequestMapping(path = "/login2", method = RequestMethod.GET)
    public Login greeting(@RequestParam(value="userName", defaultValue="Stranger") String userName) {
        System.out.println(userName);
        d.connect(userName, "passito", "nick");
        return new Login(userName, "", "");
    }*/

    @CrossOrigin(origins = "http://localhost:8081")
    @RequestMapping(path = "/register", method = RequestMethod.POST, consumes = "application/json")
    public boolean register(@RequestBody Login login) {
        return d.connect(login.getEmail(), login.getPassword(), login.getNick());
    }

    @CrossOrigin(origins = "http://localhost:8081")
    @RequestMapping(path = "/login", method = RequestMethod.POST, consumes = "application/json")
    public boolean login(@RequestBody Login login) {
        d.getRecipes(login.getEmail());
        return d.login(login.getEmail(), login.getPassword());
    }

    @CrossOrigin(origins = "http://localhost:8081")
    @RequestMapping(path = "/getRecipes", method = RequestMethod.GET)
    public ArrayList<Recipe> getRecipes(@RequestParam(value = "email") String email) {
        return d.getRecipes(email);
    }

    @CrossOrigin(origins = "http://localhost:8081")
    @RequestMapping(path = "/addNewRecipe", method = RequestMethod.POST, consumes = "application/json")
    public boolean addNewRecipe(@RequestBody Recipe recipe) {
        return d.addRecipe(recipe.getEmail(), recipe.getRecipename(), recipe.getCategory(), recipe.getRecipetext(), recipe.getIngredients());
    }

    @CrossOrigin(origins = "http://localhost:8081")
    @RequestMapping(path = "/recipe", method = RequestMethod.DELETE)
    public boolean removeOldRecipe(@RequestParam(value="id", defaultValue="") String id){
        return d.removeRecipe(id);
    }

    @CrossOrigin(origins = "http://localhost:8081")
    @RequestMapping(path = "/updateRecipe", method = RequestMethod.PUT, consumes = "application/json")
    public boolean updateOldRecipe(@RequestBody Recipe recipe){
        return d.updateRecipe(recipe.getRecipeid(),recipe.getRecipetext(), recipe.getRecipename(), recipe.getCategory(), recipe.getIngredients());
    }

    @CrossOrigin(origins = "http://localhost:8081")
    @RequestMapping(path = "/friend", method = RequestMethod.POST, consumes = "application/json")
    public boolean addFriend(@RequestBody Friend friend) {
        return d.addFriend(friend.getUserEmail(), friend.getFriendEmail());
    }

    @CrossOrigin(origins = "http://localhost:8081")
    @RequestMapping(path = "/notifications", method = RequestMethod.GET)
    public ArrayList<Friend> getFriends(@RequestParam(value = "email") String email) {
        return d.getFriends(email);
    }

    @CrossOrigin(origins = "http://localhost:8081")
    @RequestMapping(path = "/notification", method = RequestMethod.POST, consumes = "application/json")
    public boolean createNotification(@RequestBody Notification notification) {
        return d.createNotification(notification.getCategory(), notification.getRecipient(), notification.getOrigin(), notification.getContent());
    }

    @CrossOrigin(origins = "http://localhost:8081")
    @RequestMapping(path = "/notifications", method = RequestMethod.GET)
    public ArrayList<Notification> getNotifications(@RequestParam(value = "email") String email) {
        return d.getNotifications(email);
    }
}
