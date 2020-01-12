package login;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @CrossOrigin(origins = "http://localhost:8081")
    @RequestMapping("/login")
    public Login greeting(@RequestParam(value="userName", defaultValue="Stranger") String userName) {
        System.out.println(userName);
        return new Login(userName, "");
    }
}
