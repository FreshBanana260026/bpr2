package server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;


public class ImageManager {

    @Autowired
    ResourceLoader resourceLoader;

    public ImageManager() {

    }

    public static boolean save(MultipartFile file, String path) {
        Path filepath = Paths.get(path, file.getOriginalFilename());
        try (OutputStream os = Files.newOutputStream(filepath)) {
            os.write(file.getBytes());
            compressImage(filepath.toString(), path);
            return true;
        }
        catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }

    public Resource getImage(String path) {
        try {
            return new DefaultResourceLoader().getResource(path);//  resourceLoader.getResource(path);
        }
        catch (Error error) {
            error.printStackTrace();
            return null;
        }
    }

    private static void compressImage(String path, String directory) throws Exception{
        File target = new File(path);
        File newName = new File(directory + "\\target.jpg");
        target.renameTo(newName);
        File oldImg = new File(directory + "\\target.jpg");
        File newImg = new File(path);
        float quality = 0.6f;

        InputStream inputStream = new FileInputStream(oldImg);
        OutputStream outputStream = new FileOutputStream(newImg);
        BufferedImage bufferedImage = ImageIO.read(inputStream);

        Iterator<ImageWriter> imageWriters = ImageIO.getImageWritersByFormatName("jpg");
        if (!imageWriters.hasNext()) {
            throw new IllegalStateException("No writer found.");
        }

        ImageWriter imageWriter = imageWriters.next();
        ImageOutputStream imageOutputStream = ImageIO.createImageOutputStream(outputStream);
        imageWriter.setOutput(imageOutputStream);
        ImageWriteParam imageWriteParam = imageWriter.getDefaultWriteParam();
        imageWriteParam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
        imageWriteParam.setCompressionQuality(quality);
        imageWriter.write(null, new IIOImage(bufferedImage, null, null), imageWriteParam);

        inputStream.close();
        outputStream.close();
        imageOutputStream.close();
        imageWriter.dispose();
        oldImg.delete();
    }

    public static void removeImage(String email, String id) {
        File image = new File("C:\\assistant\\pictures\\" + email + "\\" + id + ".jpg");
        if (image.exists()) {
            image.delete();
        }
    }
}
