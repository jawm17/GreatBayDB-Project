var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "koikoi42",
    database: "greatbay_db"
});

connection.connect(function (err) {
    if (err) throw err;
    // first function call here
    promptUser()
});

function promptUser() {
   inquirer
        .prompt({
            type: "list",
            message: "what would you like to do?",
            name: "choices",
            choices: [
                "list",
                "bid",
                "view"]
        }).then(function (data) {
            if (data.choices === "list") {
                postItem();
            } else if (data.choices === "bid") {
                updateItemBid();
            }
            else {
                displayItems();
            }
        });
}

function postItem() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "what is the item you would like to submit?",
                name: "name"
            },
            {
                type: "input",
                message: "what is the category of the item?",
                name: "category"
            },
            {
                type: "input",
                message: "what is the starting bid?",
                name: "bid"
            }
        ]).then(function (data) {
            connection.query(
                "INSERT INTO items SET ?",
                {
                    name: data.name,
                    category: data.category,
                    currentBid: data.bid
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Your auction was created successfully!");
                    promptUser();
                }
            );
        });
}

    function updateItemBid() {
        inquirer
        .prompt([
            {
                type: "input",
                message: "what auction would you like to place a bid in?",
                name: "item"
            },
            {
                type: "input",
                message: "How much would you like to bid?",
                name: "bid"
            }
        ]).then(function (data) {
            connection.query(
                `SELECT currentbid FROM items WHERE name = '${data.item}';`,
                function (err, res) {
                    if (err) throw err;
                    console.log(res.currentbid);
                    if(data.bid > res.currentbid){
                        connection.query(
                            "UPDATE items SET ? WHERE ?",
                            {
                                currentBid: data.bid,
                            },
                            {
                                name: data.item
                            },
                            function (err, res) {
                                if (err) throw err;
                                console.log("Bid placed successfully!");
                                promptUser();
                            }
                        );
                    }
                    else {
                        console.log("You need to place a higher bid.");
                        promptUser();
                    }
                }
            );
        });
    }


function displayItems() {
    connection.query(`SELECT name, category FROM items;`, function (err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
}