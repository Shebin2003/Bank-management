const express = require('express')
const app=express()
const port = 3000
const mysql = require('mysql2');
const db = require('./database')
var cors = require('cors')

app.use(cors())

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var customer = "create table if not exists customer(customer_id int primary key auto_increment,name varchar(50),age date,address varchar(50),phone_no varchar(10),email varchar(50));";
    db.query(customer, function (err, result) {
      if (err) throw err;
      console.log("Table customer created");
    });

    var accounts = "create table if not exists accounts(account_no int primary key auto_increment,customer_id int,activation_date varchar(10),balance int,password varchar(50),foreign key(customer_id) references customer(customer_id));";
    db.query(accounts, function (err, result) {
      if (err) throw err;
      console.log("Table accounts created");
    });

    var transaction = "create table if not exists transaction(account_no int,amount int,type enum('deposit','withdraw'),date varchar(10),foreign key(account_no) references accounts(account_no));";
    db.query(transaction, function (err, result) {
      if (err) throw err;
      console.log("Table transaction created");
    });

    var transfer = "create table if not exists transfer(sender int,receiver int,amount int,date varchar(10),foreign key(sender) references accounts(account_no),foreign key(receiver) references accounts(account_no));";
    db.query(transfer, function (err, result) {
      if (err) throw err;
      console.log("Table transfer created");
    });
});


const  userRoute = require('./routes')
app.use('/',userRoute)


app.listen(port,()=>{
    console.log(`Example app listening on port http://localhost:${port}`)
})