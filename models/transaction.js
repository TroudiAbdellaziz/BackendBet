//Require mongoose package
const mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true });
const TransactionSchema = mongoose.Schema({
    typeTransaction: String,
    money: Number,
    description: String,
    date: Date
})
const  Transaction = module.exports = mongoose.model(' Transaction',  TransactionSchema );