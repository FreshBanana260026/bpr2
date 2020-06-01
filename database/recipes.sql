CREATE TABLE Recipes (
recipeid int PRIMARY KEY NOT NULL AUTO_INCREMENT,
email VARCHAR(40) NOT NULL,
recipename VARCHAR(70) NOT NULL,
category VARCHAR(25) NOT NULL,
recipetext TEXT NOT NULL,
ingredients VARCHAR(100) NOT NULL,
preparation int(11) NOT NULL,
cooking int (11) NOT NULL,
FOREIGN KEY (email) REFERENCES UserLogin(email)
)