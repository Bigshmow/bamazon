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
                    var newQuantity = res[parseInt(inquirerResponse.item_ID) - 1].stock_quantity - inquirerResponse.quantity;
                    var product = res[parseInt(inquirerResponse.item_ID) - 1].product_name;
                    var changeQuantity = "UPDATE products_tb SET stock_quantity = " + newQuantity + " WHERE product_name = " + "'" + product + "'";
                    connection.query(changeQuantity, function (err, result) {
                        if (err){
                            console.error('error connecting: ' + err.stack);
                            return;
                        }else{
                            totalPrice = res[parseInt(inquirerResponse.item_ID) - 1].price * inquirerResponse.quantity;
                            console.log("\nWe will get " + inquirerResponse.quantity +" "+ res[parseInt(inquirerResponse.item_ID) - 1].product_name + " ready for you now!");
                            console.log("That will be: " + totalPrice)
                        }
                      });

                    connection.end();
                }else{
                    console.log("Sorry but we don't have enough stock to fill your request.")
                    // maybe add a check for stock here
                    connection.end();
                }

            });
        });
});