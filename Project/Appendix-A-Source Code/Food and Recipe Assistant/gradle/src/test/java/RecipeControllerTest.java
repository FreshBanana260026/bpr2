/*
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.impl.client.HttpClientBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class RecipeControllerTest {

    private HttpResponse response;

    @BeforeEach
    public void init() throws IOException {
        HttpUriRequest request = new HttpGet( "http://localhost:8080/getRecipes?email=mail@test.com" );
        response = HttpClientBuilder.create().build().execute( request );
    }

    @Test
    public void mimeType() {
        assertEquals( "application/json", response.getEntity().getContentType().getElements()[0].toString() );
    }

    @Test
    public void statusCode() {
        assertEquals( response.getStatusLine().getStatusCode(), HttpStatus.SC_OK );
    }
}*/
