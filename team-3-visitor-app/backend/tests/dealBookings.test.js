let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = require("chai").expect;
chai.use(chaiHttp);

var port = process.env.PORT || 3000;

let backend = "http://localhost:" + port + "/api/";

function testSuite(name) {
    describe(name, () => {
        describe("GET " + backend + name + "/", function () {
            it("/" + name + " is up and running as expected.", function (done) {
                chai
                    .request(backend)
                    .get(name)
                    .end(function (err, res) {
                        if (err) {
                            done(err);
                        }
                        var data = res.body;

                        expect(res).to.have.status(200);
                        expect(data).to.be.an("object");
                        expect(data.bookings).to.be.an("array"); // Data should contain bookings

                        if (Object.keys(data.bookings).length) { // If there are any bookings
                            for (var i = 0; i < data.bookings.length; i++) {
                                expect(Object.keys(data.bookings[i]).length).to.be.equal(6); // Booking should contain all 7 elements, same as listed below:
                                expect(data.bookings[i]).to.have.property("_id"); // Booking should have an id
                                expect(data.bookings[i]).to.have.property("bookingTime"); // Booking should contain the time the booking was made
                                expect(data.bookings[i]).to.have.property("dealId"); // Booking should contain an activity id
                                expect(data.bookings[i]).to.have.property("ticketAmount"); // Booking should contain the amount of tickets
                                expect(data.bookings[i]).to.have.property("pricePerTicket"); // Booking should contain ticket price
                                expect(data.bookings[i]).to.have.property("totalPrice"); // Booking should contain the total price
                            }
                        }

                        done();
                    });
            });
        });
    });
}

testSuite("dealBookings");