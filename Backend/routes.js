const { Router } = require('express')
const db = require('./database')
const router = Router() 
const bodyParser = require('body-parser')

router.post('/register',bodyParser.json(), async(req, res) => {
  const data = req.body
  const sql1 = `INSERT INTO CUSTOMER (name,age,address,phone_no,email) values ('${data.name}',str_to_date('${data.age}','%Y-%m-%d'),'${data.address}','${data.phone_no}','${data.email}')`;
  db.query(sql1, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'Database error' });
        return;
      }})
  
  const sql2 = 'select customer_id from customer order by customer_id desc limit 1';   
  db.query(sql2, (err,fields) => {
    const customer_id = fields[0].customer_id;
    const sql3 = `INSERT INTO accounts (customer_id,activation_date,balance,password) values (${customer_id},str_to_date('${data.activation_date}','%Y-%m-%d'),0,${data.password});`;
    db.query(sql3, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'Database error' });
        return;
      }})
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'Database error' });
        return;
      }})
      
  res.send("post request success")
});

router.get('/sign-in',async(req,res)=>{
  const password = req.query.password
  const phone_no = req.query.phone_no
  const sql1 = `select phone_no from customer where exists(select phone_no from customer where phone_no=${phone_no}) and phone_no=${phone_no};;`
  db.query(sql1, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      if (results.length==0){
        const data = {"status":"Does not exist"}
        res.json(data)
        return
      }
      else{
        const sql2 = `select account_no,phone_no,password from customer,accounts where phone_no='${phone_no}' and customer.customer_id=accounts.customer_id;`
        db.query(sql2, (err, result) => {
          if (err) {
            console.error('Error executing SQL query: ' + err.message);
            res.status(500).json({ error: 'Database error' });
            return;
          }
          if(result[0].password==password){
            const data = {"status":"true","account_no":result[0].account_no}
            res.json(data)
          }
          else{
            const data = {"status":"false"}
            res.json(data)
          }})
      }
    })
})

router.post('/deposit',bodyParser.json(),async(req,res)=>{
  const data = req.body
  if(data.money>2147483647){
    res.send({error:"No balance"})
    console.log("out of bound")
  }
  else{
    const sql1 = `INSERT INTO transaction (account_no,amount,type,date) values (${data.account_no},${data.money},'${data.type}',str_to_date('${data.date}','%Y-%m-%d'));`;
    db.query(sql1, (err, results) => {
        if (err) {
          console.error('Error executing SQL query: ' + err.message);
          res.status(500).json({ error: 'Database error' });
          return;
        }})
    const sql2 = `update accounts set balance = balance + ${data.money} where account_no=${data.account_no};`
    db.query(sql2, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'Database error' });
        return;
      }})
      res.send({error:"No error"})
  }
})

router.post('/withdraw',bodyParser.json(),async(req,res)=>{
  const data = req.body
  if(data.money>2147483647){
    res.send({error:"No balance"})
    console.log("out of bound")
  }
  else{
    const sql1 = `INSERT INTO transaction (account_no,amount,type,date) values (${data.account_no},${data.money},'${data.type}',str_to_date('${data.date}','%Y-%m-%d'));`;
    db.query(sql1, (err, results) => {
        if (err) {
          console.error('Error executing SQL query: ' + err.message);
          res.status(500).json({ error: 'Database error' });
          return;
        }})
      const sql2 = `select balance from accounts where account_no=${data.account_no}`
      db.query(sql2, (err, results) => {
        if (err) {
          console.error('Error executing SQL query: ' + err.message);
          res.status(500).json({ error: 'Database error' });
          return;
        }
        if(data.money > results[0].balance){
          console.log("NO BALANCE")
          res.send({error:"No balance"})
        }
        else{
          const sql3 = `update accounts set balance = balance - ${data.money} where account_no=${data.account_no};`
          db.query(sql3, (err, results) => {
            if (err) {
              console.error('Error executing SQL query: ' + err.message);
              res.status(500).json({ error: 'Database error' });
              return;
            }})
            console.log("Update successfull ")
            res.send({error:"No error"})
            }
          })
      }
  
})

router.get('/accounts',async(req,res)=>{
  const account_no = req.query.account_no
  const sql = `select balance from accounts where account_no=${account_no}`
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query: ' + err.message);
      res.status(500).json({ error: 'Database error' });
      return;
    }
  res.json(results)})
})

router.post('/transfer',bodyParser.json(),async(req,res)=>{
  const data = req.body
  if(data.money>2147483647){
    res.send({error:"No balance"})
    console.log("out of bound")
  }
  else{
    const sql1 = `select account_no from customer,accounts where exists(select phone_no from customer where phone_no=${data.receiver_phone_no}) and phone_no=${data.receiver_phone_no} and accounts.customer_id=customer.customer_id;`
    db.query(sql1, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      if (results.length==0){
        res.send({error:"Account does not exists"})
        console.log("Account does not exists")
      }
      else{
        const sql2 = `INSERT INTO transfer (sender,receiver,amount,date) values (${data.sender},${results[0].account_no},${data.money},str_to_date('${data.date}','%Y-%m-%d'));`
        db.query(sql2, (err, results) => {
          if (err) {
            console.error('Error executing SQL query: ' + err.message);
            res.status(500).json({ error: 'Database error' });
            return;
          }})
        
        const sql3 = `select balance from accounts where account_no=${data.sender}`
        db.query(sql3, (err, results2) => {
          if (err) {
            console.error('Error executing SQL query: ' + err.message);
            res.status(500).json({ error: 'Database error' });
            return;
          }
          if(data.money > results2[0].balance){
            console.log("NO BALANCE")
            res.send({error:"No balance"})
            }
          else{
            const sql4 =  `update accounts set balance = balance + ${data.money} where account_no=${results[0].account_no};`
            db.query(sql4, (err, results2) => {
              if (err) {
                console.error('Error executing SQL query: ' + err.message);
                res.status(500).json({ error: 'Database error' });
                return;
              }})
            
              const sql5 =  `update accounts set balance = balance - ${data.money} where account_no=${data.sender};`
              db.query(sql5, (err, results2) => {
                if (err) {
                  console.error('Error executing SQL query: ' + err.message);
                  res.status(500).json({ error: 'Database error' });
                  return;
                }})
                res.send({error:"successfull"})
            }
          })
      }})} 
})

router.get('/customer',async(req,res)=>{
  const sql = 'select * from customer';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query: ' + err.message);
      res.status(500).json({ error: 'Database error' });
      return;
    }
  res.json(results);})
})





router.get('/accounts',async(req,res)=>{
    const sql = 'select * from accounts';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'Database error' });
        return;
      }
    res.json(results);})
  })

router.post('/accounts',bodyParser.json(), (req, res) => {
    const data = req.body
    console.log(data)
    const sql = `INSERT INTO accounts (customer_id,activation_date,balance,password) values ('${data.customer_id}',str_to_date('${data.activation_date}','%m-%d-%Y'),${data.balance},${data.password});`;
    db.query(sql, (err, results) => {
        if (err) {
          console.error('Error executing SQL query: ' + err.message);
          res.status(500).json({ error: 'Database error' });
          return;
        }})
    res.send(data)
});

router.post('/accounts/:id',bodyParser.json(), (req, res) => {
    const param = req.params
    const data = req.body
    console.log(param.id)
    console.log(data)
    const sql = `update accounts set balance=${data.balance} where account_no=${param.id}`;
    db.query(sql, (err, results) => {
        if (err) {
          console.error('Error executing SQL query: ' + err.message);
          res.status(500).json({ error: 'Database error' });
          return;
        }})
    res.send(data)
});

router.get('/trasaction',async(req,res)=>{
    const sql = 'select * from transaction';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'Database error' });
        return;
      }
    res.json(results);})
  })
router.post('/transaction',bodyParser.json(), (req, res) => {
    const data = req.body
    console.log(data)
    const sql = `INSERT INTO transaction (account_no,amount,type,date) values (${data.account_no},${data.amount},'${data.type}',str_to_date('${data.date}','%m-%d-%Y'));`;
    db.query(sql, (err, results) => {
        if (err) {
          console.error('Error executing SQL query: ' + err.message);
          res.status(500).json({ error: 'Database error' });
          return;
        }})
    res.send(data)
});

router.get('/transfer',async(req,res)=>{
    const sql = 'select * from transfer';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'Database error' });
        return;
      }
    res.json(results);})
  })
router.post('/transfer',bodyParser.json(), (req, res) => {
    const data = req.body
    console.log(data)
    const sql = `INSERT INTO transfer (sender,receiver,amount,date) values (${data.sender},${data.receiver},${data.amount},str_to_date('${data.date}','%m-%d-%Y'));`;
    db.query(sql, (err, results) => {
        if (err) {
          console.error('Error executing SQL query: ' + err.message);
          res.status(500).json({ error: 'Database error' });
          return;
        }})
    res.send(data)
});


module.exports = router