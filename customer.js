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

var table = new Table({
    head: ['Item','Category','Price','Stock'],
    colWidths: [20,20,15,10]
});

var items = [];

var storefront = function() {
    connection.query("SELECT * FROM shop", function(err,res) {
        if (err) throw err;
        // console.log(res);
        for (n=0;n<res.length;n++) {
            var prod = res[n].product;
            var dep = res[n].department;
            var price = res[n].price;
            var stock = res[n].stock;

            table.push(
                [prod,dep,price,stock]
            );

            items.push(prod);
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
        console.log(resp.shop)
    })
}