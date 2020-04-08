package server;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class NotificationController {
    final String URL = "http://localhost:8081";
    DAO d = DAO.getInstance();

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
}
