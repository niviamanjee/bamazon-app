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
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                console.log(`You chose to: ${response.menu}`)
                const productList = res.map(res => `\nItem ID: ${res.item_id}` + ` ` + `\nProduct Name: ${res.product_name}`
                    + ` ` + `\nPrice: $${res.price}` + `\nStock Quanitity: ${res.stock_quantity}`);
                console.log(productList)
                if (response.menu === "View Products for Sale") {


                    console.log("==============================================");
                    console.log("Products: ");
                    for (var i = 0; i < productList.length; i++) {
                        console.log(productList[i])
                    }
                    // console.log(productList.toString())
                    console.log("==============================================");

                }
                // console.log(res)




                else if (response.menu === "View Low Inventory") {

                    for (var i = 0; i < res.length; i++) {

                        if (res[i].stock_quantity < "10") {
                            // console.log(`Low Stock Quantity: \nItem ID: ${res.item_id} \nProduct Name: ${res.product_name} 
                            // \nQuantity Left: ${res.stock_quantity}`)
                            console.log(`Product(s) with low inventory: \nItem ID: ${res[i].item_id}` +
                                `\nProduct: ${res[i].product_name}` + `\nDepartment: ${res[i].department_name}` +
                                `\nStock Quantity: ${res[i].stock_quantity}`)
                        }
                    }

                    // const lowInventory = res.map(res => `${res.stock_quantity < 5}`)
                    // console.log(lowInventory)

                }
                else if (response.menu === "Add to Inventory") {
                    inquirer.prompt([
                        {
                            type: "checkbox",
                            name: "addingInventory",
                            message: "Which products would you like to add inventory to?",
                            choices: productList
                        }
                    ]).then(function (answerInventory) {
                        console.log(answerInventory)
                    })
                }

                else if (response.menu === "Add New Product") {

                }
            });
        });


}

// connection.end();

managerPrompt()