CREATE TABLE RecentRecipes (
id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
email VARCHAR(40) NOT NULL,
recipeid int NOT NULL,
FOREIGN KEY (email) REFERENCES UserLogin(email),
FOREIGN KEY (recipeid) REFERENCES Recipes(recipeid)
)