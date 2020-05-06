package server;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static server.ImageManager.*;

@RestController
public class ImageController {
    final String URL = "http://localhost:8081";

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
