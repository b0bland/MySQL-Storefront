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
    storefront();
    connection.end();
});
var table = new Table({
    head: ['Item','Category','Price','Stock'],
    colWidths: [20,20,15,10]
});

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
            )
        };
        console.log(table.toString());
    })
}