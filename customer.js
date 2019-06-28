var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "storeDB"
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    menu();
});


var items = [];
var invent = [];




var storefront = function() {
    connection.query("SELECT * FROM shop", function(err,res) {
        if (err) throw err;
        // console.log(res);
        var table = new Table({
            head: ['Item','Category','Price','Stock'],
            colWidths: [20,20,15,10]
        });
        for (n=0;n<res.length;n++) {
            var prod = res[n].product;
            var dep = res[n].department;
            var price = res[n].price;
            var stock = res[n].stock;

            table.push(
                [prod,dep,price,stock]
            );

            items.push(prod);
            invent.push(stock);
        };
        console.log(table.toString());
        shopQuery();
    })
}

var menu = function() {
    inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: "Welcome, would you like to purchase something?",
            choices: ["Yes","No"]
        }
    ]).then(function(resp) {
        if (resp.menu === "Yes") {
            storefront();
        }
        else if (resp.menu === "No") {
            console.log("Have a nice day!");
            connection.end();
        }
    })
}

var shopQuery = function() {   
    inquirer.prompt([
        {
            type: "list",
            name: "shop",
            message: "What would you like to purchase?",
            choices: items
        }
    ]).then(function(resp) {
        for (n=0;n<items.length;n++) {
            if (resp.shop === items[n]) {
                if (invent[n] > 0) {
                    console.log("You have bought a(n)" + resp.shop);
                    var num = invent[n] - 1;
                    stockDecrement(num,resp.shop)
                }
                else if (invent[n] === 0) {
                    console.log(resp.shop + " is out of stock.");
                    shopQuery();
                }
            }
        }

    })
}

var stockDecrement = function(value,item) {
    connection.query("UPDATE shop SET ? WHERE  ?", [
        {
            stock: value
        },
        {
            product: item
        }
    ], function(err,res) {
        if (err) throw err;
        console.log("Stock logs updated!");
        inquirer.prompt([
            {
                type: "list",
                name: "again",
                message: "Would you like to buy something else?",
                choices: ["Yes","No"]
            }
        ]).then(function(resp) {
            if (resp.again === "Yes") {
                storefront();
            }
            else if (resp.again === "No") {
                console.log("Have a nice day!");
                connection.end();
            }
        })
    })
}