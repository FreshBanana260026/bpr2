package server;
import DAOs.FriendsDAO;
import objects.Friend;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class FriendsController {

    final String URL = "http://localhost:8081";
    FriendsDAO dao = new FriendsDAO();

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/friend", method = RequestMethod.POST, consumes = "application/json")
    public boolean addFriend(@RequestBody Friend friend) {
        dao.addFriend(friend.getFriendEmail(), friend.getUserEmail());
        return dao.addFriend(friend.getUserEmail(), friend.getFriendEmail());
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/friends", method = RequestMethod.GET)
    public ArrayList<Friend> getFriends(@RequestParam(value = "email") String email) {
        return dao.getFriends(email);
    }
}
