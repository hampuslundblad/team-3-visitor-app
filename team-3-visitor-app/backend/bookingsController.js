var express = require('express');
var router = express.Router();
var bookings = require('./data/bookings.json');


// Return a list of all bookings
router.get('/', function(req, res, next) {
    res.json({'bookings': bookings});
});

// Return the booking with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    res.json({'bookings': bookings[id]});
});

// Create a new booking
router.post('/', function(req, res, next) {
    var booking = new Object(req.body);
    var bookingLength = bookings.length;
    booking._id = bookingLength;
    bookings.push(booking);
    res.status(201).json(booking);
});


module.exports = router;
