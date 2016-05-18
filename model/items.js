var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/items051516');

var colorSchema = new mongoose.Schema({
    colorName: String,
    colorCode: Number
});

var itemSchema = new mongoose.Schema({
    name: String,
    color: [colorSchema]
});

module.exports = {
    Item: mongoose.model('Item', itemSchema)
};
