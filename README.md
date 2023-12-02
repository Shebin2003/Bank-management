
## INTRODUCTION

This is a bank management website that allows to deposit , withdraw and transfer money between accounts

## Front End

React js

## Back End

Express js

## Database

Mysql

## Tables used

[^1]:Customer (customer_id int , name varchar , dob date , address varchar , phone_no int , email varchar)
[^2]:accounts (account_no int , customer_id int , activation_date date , balance int , password varchar)
[^3]:transaction (account_no int , amount int , type varchar , date date)
[^4]:trasnfer (sender int , receiver int , amount int , date date)


