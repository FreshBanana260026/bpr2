CREATE TABLE Recipes (
recipeid int PRIMARY KEY NOT NULL AUTO_INCREMENT,
email VARCHAR(40) NOT NULL,
recipename VARCHAR(70) NOT NULL,
category VARCHAR(25) NOT NULL,
recipetext TEXT,
ingredients VARCHAR(100),
FOREIGN KEY (email) REFERENCES UserLogin(email)
)