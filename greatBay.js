var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "khanh1988",
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
                "view" ]           
        }),
        function(err, res) {
            if (err) throw err;
            console.log(res);
            
            afterConnection();
        };
}
function afterConnection() {
    connection.query("SELECT * FROM items", function(err, res) {
      if (err) throw err;
      console.table(res);
      connection.end();
    });
  }