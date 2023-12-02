
## INTRODUCTION

This is a bank management website that allows to deposit , withdraw and transfer money between accounts

## Front End

React js

## Back End

Express js

## Database

Mysql

## Tables used

Customer (customer_id int , name varchar , dob date , address varchar , phone_no int , email varchar)<br />
accounts (account_no int , customer_id int , activation_date date , balance int , password varchar)<br />
transaction (account_no int , amount int , type varchar , date date)<br />
transfer (sender int , receiver int , amount int , date date)<br />


