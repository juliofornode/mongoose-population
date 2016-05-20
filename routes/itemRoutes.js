var controller = require('../controllers/itemController');

module.exports = function(app) {
    app.get('/', controller.home);
    app.get('/item/new', controller.create);
    app.post('/item/new', controller.doCreate);
    app.get('/items', controller.displayAll);
    app.get('/item/:id', controller.displayOne);
    app.get('/item/edit/:id', controller.edit);
    app.post('/item/edit/:id', controller.doEdit);
    app.get('/item/delete/:id', controller.delete);
    app.post('/item/delete/:id', controller.doDelete);

    app.all('*', controller.pageNotFound);
};
