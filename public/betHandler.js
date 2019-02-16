const User=require('../models/user');

module.exports = {
    favoriteLeague: function(userId, bets){
        userId=userId.toString()
        User.findById(userId,(err,newuser)=>{
            if (newuser){
                console.log(newuser.id);
                console.log("here");
                console.log(bets);
                
                for (let i=0; i< bets.length;i++){
                    let found=false;
                    bet=bets[i];
                    var rate=bet.stateBet=="won"?1:0;
                    console.log(bet);
                    if(bet.stateBet=="won"){
                        console.log(newuser.highBet);
                        if((bet.coteBet>newuser.highBet)||(newuser.highBet=="undefined")){
                            console.log("inssss");
                            newuser.highBet=bet.coteBet;
                        }
                    }
                    for(let j=0; j<newuser.leagues.length ;j++){

                        if (newuser.leagues[j].name.toString()==bet.league.toString()){
                            
                            newuser.leagues[j].nbBets++;
                            newuser.leagues[j].rate=(((newuser.leagues[j].rate*(newuser.leagues[j].nbBets-1))+rate)/newuser.leagues[j].nbBets);
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
                    let rateA= a.rate*75 + ((100-(a.rate*70))*(a.nbBets/16.7));
                    let rateB= b.rate*75 + ((100-(b.rate*70))*(b.nbBets/16.7));
                    if (rateA < rateB)
                      return 1;
                    if (rateA > rateB)
                      return -1;
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