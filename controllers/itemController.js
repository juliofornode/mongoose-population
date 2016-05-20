var mongoose = require('mongoose');
var Item = mongoose.model('Item');
var Color = mongoose.model('Color');


exports.home = function(req, res) {
    res.render('home', {pageTitle: 'Home Page'});
};

exports.create = function(req, res) {
    res.render('single-item', {pageTitle: 'Create New Item'});
};

exports.doCreate = function(req, res) {

    var myColor = new Color({
        colorName: req.body.colorName,
        colorCode: req.body.colorCode
    });

    myColor.save(function(error, result) {
        console.log('the color saved is ' + result);
    });

    var myItem = new Item({
        name: req.body.name,
        color: myColor._id
    });

    myItem.save(function(error, result) {
        console.log('the item saved is ' + result);
    });

    Item
        .find({name: req.body.name})
        .populate('Color', 'color')
        .exec(function(error, result) {
            console.log('the item populated is ' + result)
        });

    res.send('this is just a test');



};

exports.displayAll = function(req, res) {
    Item.find(function(error, result) {
        res.render('display-all', {pageTitle: 'All Items', items: result});
    });
};

exports.displayOne = function(req, res) {
    Item.findById(req.params.id, function(error, result) {
        console.log(JSON.stringify(result));
        res.render('display-one', {pageTitle: 'Item Page', item: result});
    })
};

exports.edit = function(req, res) {
  Item.findById(req.params.id, function(error, result) {
      console.log('item to edit: ' + result.name);
      res.render('edit-item', {pageTitle: 'Edit Item', item: result});
  })
};

exports.doEdit = function(req, res) {

    Item.findById(req.params.id)
        .populate('color')
        .exec(function(error, result) {
            console.log('item to edit: ' + result);
            result.name = req.body.name;
            result.color = {
                colorName: req.body.colorName,
                colorCode: req.body.colorCode
            };
            result.save(function(error, editado) {
                console.log('item edited: ' + result);
                res.render('display-one', {pageTitle: 'Edit Item', item: result});
            });
        });

};

exports.delete = function(req, res) {
    Item.findById(req.params.id)
        .populate('color', 'colorName')
        .exec(function(error, result) {
        console.log('item to delete: ' + result.name);
        res.render('delete-item', {pageTitle: 'Delete Item', item: result});
        })
};

exports.doDelete = function(req, res) {
    Item.findById(req.params.id, function(error, result) {
        result.name = req.body.name;
        result.remove(function(error, removed) {
            console.log('item removed: ' + removed.name);
            res.redirect('/');
        });
    })
};


/*exports.getPopulation = function(req, res) {

    var myColor = new Color({
        colorName: req.body.colorName,
        colorCode: req.body.colorCode
    });

    myColor.save(function(error, result) {
        console.log('color saved: ' + result);
    });


    var myItem = new Item({
        name: req.body.name,
        color: myColor._id
    });

    console.log('item creado: ' + myItem);

    myItem.save();

    res.render('my-population')

    Item
        .findOne({name: req.params.name})
        .populate('color', 'colorName')
        .exec(function(error, result) {
            res.send(result.color.colorName);
        });

};*/





exports.pageNotFound = function(req, res) {
    res.status(404).send('this is the 404 page not found');
};