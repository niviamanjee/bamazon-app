var mysql = require("mysql");
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    // connection.end();
});

function managerPrompt() {
    inquirer
        .prompt([
            {

                type: "list",
                name: "menu",
                message: "Choose a task.",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            }


        ]).then(function (response) {
            console.log(`You chose to: ${response.menu}`)
            if (response.menu === "View Products for Sale") {
                connection.query("SELECT * FROM products", function (err, res) {
                    if (err) throw err;

                    const productList = res.map(res => `\nItem ID: ${res.item_id}` + ` ` + `\nProduct Name: ${res.product_name}`
                        + ` ` + `\nPrice: $${res.price}` + `\nStock Quanitity: ${res.stock_quantity}`)

                    console.log("==============================================");
                    console.log("Products: ");
                    console.log(productList.toString())
                    console.log("==============================================");


                    // console.log(res)


                });
            }
        });
    // connection.end();
}

managerPrompt();