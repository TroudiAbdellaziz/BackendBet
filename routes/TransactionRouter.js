//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Transaction = require('../models/transaction');


router.post("/transaction",(req,res)=>{
    console.log(req.body);
    User.findById(req.body.user, (err,newuser)=>{
        if(newuser){
            req.body.money=parseInt(req.body.money);
        Transaction.create(req.body,(err, transaction)=>{
            if(transaction){
                if(!newuser.deposit){
                    newuser.deposit=0;
                    for(let i=0;i<30;i++){
                        newuser.deposits.push(0);
                }
            }
            newuser.transactions.unshift(transaction);
            if (transaction.typeTransaction=="deposit"){
                newuser.income=transaction.money+newuser.income;
                newuser.deposit+=transaction.money;
            }
            if (transaction.typeTransaction=="withdraw"){
                newuser.income=newuser.income-transaction.money;
                newuser.deposit-=transaction.money;
            }
            console.log(transaction.typeTransaction);
            console.log(newuser.deposit);
            newuser.save((err)=>{
                console.log(err);
            });
            console.log("transaction created");
            console.log(newuser);
            return res.json({success:true, transaction:transaction});
            }else{
            return res.json({success:false, message:"transaction failed"}); }
        })}
        else {
        return res.json({success:false, message:"user search failed"});}
    })
})

module.exports = router;