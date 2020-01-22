package login;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class LoginController {

    DAO d = new DAO();

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
        return d.login(login.getEmail(), login.getPassword());
    }
}
