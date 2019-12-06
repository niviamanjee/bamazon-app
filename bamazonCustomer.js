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
    console.log("connected as id " + connection.threadId);
    connection.end();
});


function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}
displayProducts();

function userPrompt() {

    inquirer
        .prompt([
            {
                type: "input",
                name: "product-ID",
                message: "What is the product ID?"
            },
            {
                type: "input",
                name: "units",
                message: "How many units would you like to purchase?"
            }
        ])
        .then(answers => {
            console.log(answers)
        });
}
userPrompt();
