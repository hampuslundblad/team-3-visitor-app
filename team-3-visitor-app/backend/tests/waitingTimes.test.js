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
            expect(data.activities).to.be.an("array"); // Data should contain activities array
            expect(Object.keys(data.activities).length).to.be.above(0); // We should have at least 1 activity

            for(var i = 0; i < data.activities.length; i++) {
                expect(data.activities[i]).to.have.property("bookingTimes"); // Activity should have wait times
                for(var j = 0; i < data.activities[i].bookingTimes.length; i++) {
                  expect(data.activities[i].bookingTimes[j]).to.have.property("time"); // Activity should have booking ime
                  expect(data.activities[i].bookingTimes[j]).to.have.property("availableSpots"); // Activity should have available spots
                  expect(data.activities[i].bookingTimes[j]).to.have.property("waitTime"); // Activity should have average wait time
                }
            }
            done();
          });
      });
    });
  });
}

testSuite("activities");