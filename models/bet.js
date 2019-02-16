//Require mongoose package
const mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true });
//Define BucketlistSchema with title, description and category
const BetSchema = mongoose.Schema({
    state: String,
    league: Number,
    type: Number,
    cote: Number,
});
const Bet = module.exports = mongoose.model('Bet', BetSchema );

//BucketList.find() returns all the lists
module.exports.getAllBooks = (callback) => {
    Bet.find(callback);
}

