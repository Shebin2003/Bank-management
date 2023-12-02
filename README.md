![image](https://github.com/Shebin2003/Bank-management/assets/143021904/21184669-9a6c-4562-8bdb-07ce32efb783)![image](https://github.com/Shebin2003/Bank-management/assets/143021904/84f2e86d-1bcb-4534-9ae9-665ab4a59f18)# Bank-management

## INTRODUCTION

This is a bank management website that allows to deposit , withdraw and transfer money between accounts

## Front End

React js

## Back End

Express js

## Database

Mysql

## Tables used

Customer (customer_id int , name varchar , dob date , address varchar , phone_no int , email varchar)
accounts (account_no int , customer_id int , activation_date date , balance int , password varchar)
transaction (account_no int , amount int , type varchar , date date)
trasnfer (sender int , receiver int , amount int , date date)


