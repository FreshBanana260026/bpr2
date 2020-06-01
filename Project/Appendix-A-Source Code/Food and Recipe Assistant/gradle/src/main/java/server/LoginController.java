package server;
import DAOs.LoginDAO;
import objects.Login;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    final String URL = "http://localhost:8081";
    LoginDAO dao = new LoginDAO();

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/register", method = RequestMethod.POST, consumes = "application/json")
    public boolean register(@RequestBody Login login) {
        return dao.register(login.getEmail(), login.getPassword(), login.getNick());
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/login", method = RequestMethod.POST, consumes = "application/json")
    public boolean login(@RequestBody Login login) {
        return dao.login(login.getEmail(), login.getPassword());
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/nick", method = RequestMethod.GET)
    public Login getNick(@RequestParam(value = "email") String email) {
        return new Login("", "", dao.getNick(email));
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/profile", method = RequestMethod.PUT, consumes = "application/json")
    public boolean updatePassword(@RequestBody Login data){
        return dao.updateProfile(data.getEmail(), data.getPassword(), data.getNick());
    }
}
