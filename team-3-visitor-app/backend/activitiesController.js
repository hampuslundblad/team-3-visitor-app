var express = require('express');
var router = express.Router();
var activities = require('./data/activities.json');

// Return a list of all activities
router.get('/', function(req, res, next) {
    res.json({'activities': activities});
});

// Return the activity with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    res.json(activities[id]);
});


module.exports = router;
