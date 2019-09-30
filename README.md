# Bamazon CLI App
# Bamazon

## Overview
The Bamazon App is designed to simulate an online storefront.  There is a customer module and a manager module.  Each with their own commands.  Using Inquirer we query the user for input that affects a MySQL database.  The customer can "purchase" product, and the manager can alter and view inventory in a variety of ways.

# Let's see what Bamazon has to offer.
## The 2 modules available are called Customer and Manager
### 1. bamazonCustomer.js
  * Running this Node application will first display all of the items available for sale.
  * The app will then prompt the user with two messages:
    1. The first asks them the ID of the product they would like to buy.
    2. The second message will prompt the user for how many units of the product they would like to buy.
  * Once the customer has placed the order, the application checks if the store has enough of the product to meet the request.
    - If the store has enough of the product, the customer's order is fulfilled and their total cost is displayed.
    - If not, the app will inform the customer and prevent the order from going through.
### Below is a demonstration of the Customer application:

![Bamazon_Customer](https://user-images.githubusercontent.com/49423028/64823449-4b6b0580-d56c-11e9-8fa8-d5d70a2469b4.gif)


### 2. bamazonManager.js
  * Running this application will display the manager module which allows direct manipulation of our MySQL database through Inquirer prompts.  There are 4 options available to the manager:
1. View Products
  * The View Products case will display all of the information associated with our database's product table.
### Below is a demonstration of the View Products case:

![Bamazon_Manager_ViewProducts](https://user-images.githubusercontent.com/49423028/64823484-5de53f00-d56c-11e9-8a23-0e9824ed2e42.gif)

2. Low Inventory
  * Selecting Low Inventory will display a list of all items with an inventory count lower than, but not equal to, five. (notice that Box Fan does not display)
### Below is a demonstration of the Low Inventory case:

![Bamazon_Manager_Low_Inventory](https://user-images.githubusercontent.com/49423028/64823476-5a51b800-d56c-11e9-9454-c1ce4944b1f6.gif)

3. Add Inventory
  * By choosing the Add Inventory option our manager is able to modify the inventory of an ID that already exists in our database.
### Below is a demonstration of the Add Inventory case:

![Bamazon_Manager_Add_Inventory](https://user-images.githubusercontent.com/49423028/64823464-52921380-d56c-11e9-94a0-61e3c0f784da.gif)

4. Add Product
  * The last option available to the manager is Add Product.  We can add a new product to our database from the terminal after following the prompts.
  ### Below is a demonstration of the Add Product case:

![Bamazon_Manager_Add_Product](https://user-images.githubusercontent.com/49423028/64823472-5756c780-d56c-11e9-8e3c-b614f5592aaf.gif)
