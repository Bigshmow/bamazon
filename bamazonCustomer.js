// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "6Nodagem7!",
  database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Hello!" + "\nWelcome to Bamazon.node!" + "\nHere is a list of our current offerings: ");
    connection.query("SELECT * FROM products_tb",
        function(err,res){
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            for (let i = 0; i < res.length; i++) {
                console.log("ID: "+res[i].item_id + ", " + res[i].product_name + " for " + res[i].price + ".  Quantity: " + res[i].stock_quantity);
            }
            
            inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the ID of the item you wish to purchase?",
                    name: "item_ID"
                },
                {
                    type: "input",
                    message: "How many units of this product would you like?",
                    name: "quantity"
                },
            ])
            .then(function(inquirerResponse) {
                if (inquirerResponse.quantity <= res[parseInt(inquirerResponse.item_ID) - 1].stock_quantity){
                    console.log("\nWe will get " + inquirerResponse.quantity +" "+ res[parseInt(inquirerResponse.item_ID) - 1].product_name + " ready for you now!");
                    // use UPDATE and SET to change stock_quantity
                    connection.end();
                }else{
                    console.log("Sorry but we don't have enough stock to fill your request.")
                    // maybe add a check for stock here
                    connection.end();
                }

            });
        });
});