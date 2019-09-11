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
    console.log("Hello!" + "\nWelcome to the Manager Module" + "\nHere is a list of available commands: ");
    connection.query("SELECT * FROM products_tb",
        function(err,res){
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }else{
                inquirer
                .prompt([
                    {
                        type: "list",
                        message: "Here is a list of available commands:",
                        choices: [
                        "View Products for Sale",
                        "View Low Inventory",
                        "Add to Inventory",
                        "Add New Product"],
                        name: "manager"
                    },
                ])
                .then(function(inquirerResponse) {
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
    function viewProducts(){
        console.log("Viewing Products");
        for (let i = 0; i < res.length; i++) {
            console.log("ID: "+res[i].item_id + ", Product: " + res[i].product_name + ", Price: $" + res[i].price + ", Quantity: " + res[i].stock_quantity);
        }
        connection.end();
    }
    function viewLowinventory(){
        console.log("Viewing Low Inventory");
        for (let i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5){
                console.log("ID: "+res[i].item_id + ", Product: " + res[i].product_name + ", Price: $" + res[i].price + ", Quantity: " + res[i].stock_quantity);
            }
        }
        connection.end();
    }
    function addInventory(){
        // If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
        console.log("Adding to the inventory");
        connection.end();
    }
    function addProduct(){
        // If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
        console.log("Adding product");
        connection.end();
    }
        })
})