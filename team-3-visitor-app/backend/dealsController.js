var express = require('express');
var router = express.Router();
var deals = require('./data/deals.json');

// Return a list of all deals
router.get('/', function (req, res, next) {
    res.json({ 'deals': deals });
});

// Return the deal with the given ID
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    res.json(deals[id]);
});

module.exports = router;
