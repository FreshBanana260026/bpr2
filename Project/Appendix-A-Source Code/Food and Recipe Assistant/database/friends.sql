CREATE TABLE Friends (
useremail VARCHAR(40) NOT NULL,
friendemail VARCHAR(40) NOT NULL,
PRIMARY KEY (useremail, friendemail),
FOREIGN KEY (useremail) REFERENCES UserLogin(email),
FOREIGN KEY (friendemail) REFERENCES UserLogin(email)
)