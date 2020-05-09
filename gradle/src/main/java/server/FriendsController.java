package server;
import objects.Friend;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class FriendsController {

    final String URL = "http://localhost:8081";
    DAO d = DAO.getInstance();

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
}
