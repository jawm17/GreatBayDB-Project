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
    prompuser()
});
function prompuser() {

    return inquirer
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
            } else if(data.choices === "bid"){
                bid();
            }
            else {
                displayItems();
            }
        });
}


function postItem() {
}

function bid() {
}

function displayItems(){

}