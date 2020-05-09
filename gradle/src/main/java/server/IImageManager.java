package server;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface IImageManager {
     boolean save(MultipartFile file, String path);
     Resource getImage(String path);
     void removeImage(String email, String id);
}
