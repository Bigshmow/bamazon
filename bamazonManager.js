var mysql = require("mysql");
var inquirer = require("inquirer");

require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Hello!" + "\nWelcome to the Manager Module" + "\nHere is a list of available commands: ");
    connection.query("SELECT * FROM products_tb",
        function (err, res) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            } else {
                inquirer
                    .prompt([{
                        type: "list",
                        message: "Here is a list of available commands:",
                        choices: [
                            "View Products for Sale",
                            "View Low Inventory",
                            "Add to Inventory",
                            "Add New Product"
                        ],
                        name: "manager"
                    }, ])
                    .then(function (inquirerResponse) {
                        var menu = inquirerResponse.manager;
                        console.log("You've selected: " + menu);
                        switch (menu) {
                            case "View Products for Sale":
                                console.log("chosen!")
                                viewProducts();
                                break;
                            case "View Low Inventory":
                                console.log("chosen!")
                                viewLowinventory();
                                break;
                            case "Add to Inventory":
                                console.log("chosen!")
                                addInventory();
                                break;
                            case "Add New Product":
                                console.log("chosen!")
                                addProduct();
                                break;
                        }
                    })
            }

            function viewProducts() {
                console.log("Viewing Products");
                for (let i = 0; i < res.length; i++) {
                    console.log("ID: " + res[i].item_id + ", Product: " + res[i].product_name + ", Price: $" + res[i].price + ", Quantity: " + res[i].stock_quantity);
                }
                connection.end();
            }

            function viewLowinventory() {
                console.log("Viewing Low Inventory");
                for (let i = 0; i < res.length; i++) {
                    if (res[i].stock_quantity < 5) {
                        console.log("ID: " + res[i].item_id + ", Product: " + res[i].product_name + ", Price: $" + res[i].price + ", Quantity: " + res[i].stock_quantity);
                    }
                }
                connection.end();
            }

            function addInventory() {
                var productArr = [];
                for (let i = 0; i < res.length; i++) {
                    var products = "ID " + res[i].item_id + " : " + res[i].product_name;
                    productArr.push(products);
                }
                console.log(productArr.toString().split(",").join("\n"));
                inquirer
                    .prompt([{
                            type: "input",
                            message: "Input the ID you wish to alter",
                            name: "productSelect"
                        }, {
                            type: "input",
                            message: "How many would you like to add?",
                            name: "productInc"
                        }

                    ])
                    .then(function (inqRes) {
                        var product = res[parseInt(inqRes.productSelect) - 1].product_name;
                        var increase = inqRes.productInc;
                        var newQuantity = parseInt(increase) + res[parseInt(inqRes.productSelect) - 1].stock_quantity;
                        console.log("You've selected ID: " + inqRes.productSelect + ", " + product + " be increased by: " + increase);
                        inquirer
                            .prompt([{
                                type: "confirm",
                                message: "Is this correct?",
                                name: "addAnswer"
                            }])
                            .then(function (inqRes) {

                                if (inqRes.addAnswer) {
                                    var changeQuantity = "UPDATE products_tb SET stock_quantity = " + newQuantity + " WHERE product_name = " + "'" + product + "'";
                                    connection.query(changeQuantity, function (err, result) {
                                        if (err) {
                                            console.error('error connecting: ' + err.stack);
                                            connection.end();
                                            return;
                                        } else {

                                            console.log("confirmed, we've added " + increase + " " + product + " to the inventory.");
                                            connection.end();
                                        }
                                    });


                                } else {
                                    console.log("Ok, let's start over.");
                                    inquirer
                                        .prompt([{
                                            type: "confirm",
                                            message: "Would you like to add to the inventory still?",
                                            name: "open"
                                        }])
                                        .then(function (inqRestart) {
                                            if (inqRestart.open) {
                                                addInventory();
                                            } else {
                                                connection.end();
                                            }
                                        })
                                }
                            })

                    })
            }

            function addProduct() {
                console.log("Follow the prompts to add new products.");
                inquirer
                    .prompt([{
                            type: "input",
                            message: "Enter new product name",
                            name: "productName"
                        },
                        {
                            type: "input",
                            message: "Enter department name",
                            name: "departmentName"
                        },
                        {
                            type: "input",
                            message: "Enter retail price",
                            name: "retailPrice"
                        },
                        {
                            type: "input",
                            message: "Enter initial stock quantity",
                            name: "initialStock"
                        }
                    ]).then(function (inqRes) {
                        var product = "'" + inqRes.productName.toString() + "'";
                        var department = "'" + inqRes.departmentName.toString() + "'";
                        var price = parseFloat(inqRes.retailPrice);
                        var stock = parseInt(inqRes.initialStock);
                        var insertInto = "INSERT INTO products_tb(product_name,department_name,price,stock_quantity) VALUES (" +
                            product + "," +
                            department + "," +
                            price + "," +
                            stock + ")";

                        inquirer
                            .prompt([{
                                type: "confirm",
                                message: "We're adding " + stock + " " + product + " to the " + department + " department at $" + price + ".  Is this correct?",
                                name: "adding"
                            }])
                            .then(function (inqRes) {
                                if (inqRes.adding) {
                                    connection.query(insertInto, function (err, result) {
                                        if (err) {
                                            console.log("error connecting: " + err.stack);
                                            return;
                                        } else {
                                            console.log("Great, we'll add that to the inventory now.")
                                            connection.end();
                                        }
                                    })
                                } else {
                                    console.log("Ok, let's start over.");
                                    inquirer
                                        .prompt([{
                                            type: "confirm",
                                            message: "Would you still like to add a product?",
                                            name: "open"
                                        }])
                                        .then(function (inqRestart) {
                                            if (inqRestart.open) {
                                                addProduct();
                                            } else {
                                                connection.end();
                                            }
                                        })
                                }
                            })
                    })
                // connection.end();
            }
        })
})