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


function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        const productList = res.map(res => `\nItem ID: ${res.item_id}` + ` ` + `\nProduct Name: ${res.product_name}`
            + ` ` + `\nPrice: $${res.price}` + `\n`)

        console.log("==============================================");
        console.log("Products: ");
        console.log(productList.toString())
        console.log("==============================================");

        userPrompt();
        // console.log(res)


    });



}
displayProducts();
// userPrompt();


function userPrompt() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
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

            ]).then(function (response) {
                // console.log(response)
                var productID = res[parseInt(response["product-ID"])].item_id
                console.log(`You chose product number: ${productID - 1}`)
                // console.log(res[productID - 2])
                if (response["units"] > res[productID - 2].stock_quantity) {
                    console.log("Insufficient quantity available!")
                }
                else {
                    var newQuantity = res[productID - 2].stock_quantity - response["units"]
                    console.log(`Stock left: ${newQuantity}`)
                    var totalPrice = response["units"] * res[productID - 2].price
                    console.log(`Total Price: $${totalPrice}`)
                    // console.log(res)
                    var update = connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQuantity
                            },
                            {
                                item_id: response["units"]

                            }

                        ]
                    )
                }
                console.log(update.sql)
                connection.end()
            });


        // connection.end();
    })
}

