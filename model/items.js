var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/items051516');

var colorSchema = new mongoose.Schema({
    colorName: String,
    colorCode: Number
});

var Color = mongoose.model('Color', colorSchema);



var itemSchema = new mongoose.Schema({
    name: String,
    color: {type: mongoose.Schema.Types.ObjectId, ref: 'Color'}
});

module.exports = {
    Item: mongoose.model('Item', itemSchema)
};
