package server;
import objects.RecentRecipe;
import objects.Recipe;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class RecipeController {

    final String URL = "http://localhost:8081";
    DAO d = DAO.getInstance();

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/getRecipes", method = RequestMethod.GET)
    public ArrayList<Recipe> getRecipes(@RequestParam(value = "email") String email) {
        return d.getRecipes(email);
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/recipe", method = RequestMethod.GET)
    public Recipe getRecipe(@RequestParam(value = "id") String id) {
        return d.getRecipe(id);
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/addNewRecipe", method = RequestMethod.POST, consumes = "application/json")
    public String addNewRecipe(@RequestBody Recipe recipe) {
        return d.addRecipe(recipe.getEmail(), recipe.getRecipename(), recipe.getCategory(),
                recipe.getRecipetext(), recipe.getIngredients(), recipe.getPreparation(), recipe.getCooking());
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/recipe", method = RequestMethod.DELETE)
    public boolean removeOldRecipe(@RequestParam(value="id", defaultValue="") String id, @RequestParam(value = "email") String email){
        IImageManager manager = new ImageManager();
        manager.removeImage(email, id);
        return d.removeRecipe(id);
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/updateRecipe", method = RequestMethod.PUT, consumes = "application/json")
    public boolean updateOldRecipe(@RequestBody Recipe recipe){
        return d.updateRecipe(recipe.getRecipeid(),recipe.getRecipetext(), recipe.getRecipename(), recipe.getCategory(), recipe.getIngredients(), recipe.getPreparation(), recipe.getCooking());
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/recentRecipes", method = RequestMethod.POST, consumes = "application/json")
    public boolean addItem(@RequestBody RecentRecipe recipe) {
        return d.addRecentRecipe(recipe.getEmail(), recipe.getRecipeid());
    }

    @CrossOrigin(origins = URL)
    @RequestMapping(path = "/recentRecipes", method = RequestMethod.GET)
    public ArrayList<RecentRecipe> getRecentRecipes(@RequestParam(value = "email") String email) {
        return d.getRecentRecipes(email);
    }
}
