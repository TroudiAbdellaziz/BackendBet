const User=require('../models/user');

module.exports = {
    favoriteLeague: function(userId, bets){
        userId=userId.toString()
        User.findById(userId,(err,newuser)=>{
            if (newuser){
                console.log(newuser.id);
                console.log("here");
                console.log(bets);
                let found=false;
                for (let i=0; i< bets.length;i++){
                    bet=bets[i];
                    var rate=bet.stateBet=="won"?1:0;
                   
                    for(league in newuser.leagues){
                        if (league.name==bet.league){
                            
                            league.nbBets++;
                            league.rate=(league.rate+rate)/league.nbBets
                            found= true;
                        }
                    }
                    console.log(found);
                    if (!found){
                        console.log("hereeee");
                        newuser.leagues.push({name:bet.league,rate:rate,nbBets:1});
                    }
                }
                console.log(newuser.leagues);
                newuser.leagues.sort(function(a,b){
                    let rateA= a.rate*0.75 + (100-a.rate*0.7)*(a.nbBets/16.7);
                    let rateB= b.rate*0.75 + (100-b.rate*0.7)*(b.nbBets/16.7);
                    if (rateA < rateB)
                      return -1;
                    if (rateA > rateB)
                      return 1;
                    return 0;
                });
                newuser.markModified("leagues");
                console.log(newuser.leagues);
                newuser.save((err)=>{
                    console.log(err);
                })
            }
        })
    },
    compare:function(a,b) {
        let rateA= a.rate*0.75 + (100-a.rate*0.7)*(a.nbBets/16.7);
        let rateB= b.rate*0.75 + (100-b.rate*0.7)*(b.nbBets/16.7);
        if (rateA < rateB)
          return -1;
        if (rateA > rateB)
          return 1;
        return 0;
      }
}