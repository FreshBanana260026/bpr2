package server;
import objects.Login;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    final String URL = "http://localhost:8081";
    DAO d = DAO.getInstance();

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
}
