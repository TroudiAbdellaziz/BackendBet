//Require mongoose package
const mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true });
const TransactionSchema = mongoose.Schema({
    typeTransaction: String,
    money: Number,
    description: String,
    date: Date
})
const BetSchema = mongoose.Schema({
    stateBet: String,
    league: String,
    typeBet: [String],
    coteBet: Number,
});
//Define BucketlistSchema with title, description and category
const UserSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    LastName: String,
    email: String,
    papers: [String],
    password: String,
    balance: Number,
    bets: Number,
    success: Number,
    deposits: [Number],
    deposit: Number,
    incomeGenerated: [Number],
    highPaper: Number,
    highStake:  Number,
    highBet:  Number,
    highLoss:  Number,
    transactions: [TransactionSchema],
    nbPapers: Number,
    leagues:[{
        name: String, 
        rate: Number,
        nbBets: Number
    }],
    income:Number,
    paperWon:Number,
    paperLost:Number,
    paperCompensated:Number,
    paperCompensatedWon:Number,
    paperCompensatedLost:Number,
    bestBets:[
        BetSchema
    ],
    worstChoice:BetSchema
});
const  User = module.exports = mongoose.model(' User',  UserSchema );

//BucketList.find() returns all the lists
module.exports.getAllUsers = (callback) => {
    User.find(callback);
}

