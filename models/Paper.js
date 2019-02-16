//Require mongoose package
const mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true });
const BetSchema = mongoose.Schema({
    stateBet: String,
    league: String,
    typeBet: [String],
    coteBet: Boolean,
});
const PaperSchema = mongoose.Schema({
   
    state: String,
    type: String,
    user: String,
    bets: [BetSchema],
    revenue: String,
    cote: String,
    num: Number,
    price: Number
});
const Paper = module.exports = mongoose.model('Paper', PaperSchema );


