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
                expect(data.activities[i]).to.have.property("type").to.be.a('string'); // Activity should have a type
                expect(data.activities[i]).to.have.property("id").to.be.a('string'); // Activity should have an id
                expect(data.activities[i]).to.have.property("name").to.be.a('string'); // Activity should have a name
                expect(data.activities[i]).to.have.property("open").to.be.a('boolean'); // Activity should have openness value
                expect(data.activities[i]).to.have.property("description").to.be.a('string'); // Activity should have a description
                expect(data.activities[i]).to.have.property("location").to.be.a('string'); // Activity should have a location
                expect(data.activities[i]).to.have.property("price").to.be.a('string'); // Activity should have a price
                expect(data.activities[i]).to.have.property("capacity").to.be.a('string'); // Activity should have capacity value
                expect(data.activities[i]).to.have.property("cardImage").to.be.a('string'); // Activity should have a card image
                expect(data.activities[i]).to.have.property("icon").to.be.a('string'); // Activity should have icon image
                if(data.activities[i].type === "Ride")
                {
                  expect(data.activities[i]).to.have.property("subtype").to.be.a('string');
                }
                if(data.activities[i].type === "Restaurant")
                {
                  expect(data.activities[i]).to.have.property("menu").to.be.an('object');
                }
            }
            done();
          });
      });
    });
  });
}

testSuite("activities");