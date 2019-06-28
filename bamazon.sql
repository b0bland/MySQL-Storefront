DROP DATABASE IF EXISTS storeDB;
CREATE DATABASE storeDB;
USE storeDB;

CREATE TABLE shop (
    id INT AUTO_INCREMENT NOT NULL,
    product VARCHAR(60),
    department VARCHAR(60),
    price VARCHAR(60),
    stock INT,
    PRIMARY KEY(id)
)

INSERT INTO shop (product,department,price,stock)
VALUES ("Poke Ball", "Poke Balls", "$20.00", 1000),
("Great Ball","Poke Balls","$40.00",800),
("Ultra Ball","Poke Balls","$60.00",500),
("Master Ball","Poke Balls","$50000.00",10),
("Potion","Medication","$1.00",2000),
("Super Potion","Medication","$2.00",1500),
("Hyper Potion","Medication","$5.00",800),
("Max Potion","Medication","$10.00",500),
("Revive","Medication","$25.00",250),
("Max Revive","Medication","$75.00",50),
("Rare Candy","Medication","$250.00",100),
("Repel","Exploration","$4.00",600),
("Super Repel","Exploration","$7.00",400),
("Max Repel","Exploration","$12.00",200),
("Escape Rope","Exploration","$20.00",400)