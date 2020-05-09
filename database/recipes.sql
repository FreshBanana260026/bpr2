CREATE TABLE Recipes (
recipeid int PRIMARY KEY NOT NULL AUTO_INCREMENT,
email VARCHAR(40) NOT NULL,
recipename VARCHAR(70) NOT NULL,
category VARCHAR(25) NOT NULL,
recipetext TEXT,
ingredients VARCHAR(100),
preparation int(11),
cooking int (11),
FOREIGN KEY (email) REFERENCES UserLogin(email)
)
