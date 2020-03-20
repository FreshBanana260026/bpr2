CREATE TABLE Notifications (
id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
category VARCHAR(20) NOT NULL,
recipient VARCHAR(40) NOT NULL,
origin VARCHAR(40) NOT NULL,
content TEXT,
FOREIGN KEY (recipient) REFERENCES UserLogin(email)
)