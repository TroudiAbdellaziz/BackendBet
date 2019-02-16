//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();

const Paper = require('../models/Paper');
const User =require('../models/user');
const betHandler = require('../public/betHandler');

router.post('/paper', (req, res) => {
    //console.log(req);
    User.findById((req.body.user),(err,newuser)=>{
        console.log("start");
        console.log(req.method);
        Paper.create((req.body), (err, paper) => {
        if (err) {
            return res.json({ success: false, message: `Failed to add the paper. Error: ${err}` });
        }
        else {
            console.log("in paper");
            newuser.papers.push(paper.id);
            newuser.markModified("papers");
            //console.log(paper);
            console.log(paper.price);
            if(paper.price>newuser.highStake){
                console.log("in stake");
                newuser.highStake=paper.price;
                newuser.markModified("highStake");
            }
            if(paper.state=="lost"){
                console.log("in lost");
                if(paper.price>newuser.highLoss){
                    console.log("inside change");
                    newuser.highLoss=paper.price;
                    newuser.markModified("highLoss");
                }
            }
            if (paper.state=="won"){
                console.log("in won");
                if(paper.revenue>newuser.highPaper){
                    newuser.highPaper=paper.revenue;
                    newuser.markModified("highPaper");
                }
            }
            var rate=paper.state=="won"?1:0;
            console.log("rate "+rate);
            newuser.nbPapers++;
            console.log(newuser.nbPapers);
            newuser.markModified("nbPapers");
            newuser.bets=newuser.bets+paper.num;
            //console.log(newuser.bets);
            newuser.markModified("bets");
            newuser.success=((newuser.success*(newuser.nbPapers-1))+rate)/newuser.nbPapers;
            //console.log(newuser.success);
            newuser.markModified("success");
            paper.state=="won"?newuser.income+=paper.revenue-paper.price:newuser.income-=paper.price;
            newuser.incomePaper.push(newuser.income);
            newuser.markModified("incomePaper");
            if (!newuser.deposits){
                for(let i=0;i<30;i++){
                    newuser.deposits[i]=0;
                }
            }
            newuser.deposits.push(newuser.deposit);
            newuser.markModified("successPaper");
            
            for(bet in paper.bets){
                if (bet.cote>newuser.highBet)
                newuser.highBet=bet.cote;
                newuser.markModified("highBet");
            }
            if(newuser.incomePaper.length>30)
            {
                newuser.incomePaper.shift();
                newuser.deposits.shift();
                newuser.markModified("incomePaper");
            }
            
         /*   newuser.save((err)=>{
                console.log(err);
            });*/
         
            betHandler.favoriteLeague(newuser.id,paper.bets);
            return res.json({ success: true, user:newuser });
        }

    });

    
});
});

router.get('/getPaper/:id', (req, res) => {
    let id=req.params.id;
    Paper.findById(id,(err, paper) => {
        if (err) {
            
            return res.json({ success: false, message: `Failed to load paper. Error: ${err}` });
        }
        else if((!paper)||(paper.length==0)){
            return res.json({ success: false, message: `paper not found` });
        }else{
            res.write(JSON.stringify({ success: true, paper: paper }, null, 2));
            res.end();
        }
    });
});









module.exports = router;