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
                        expect(data.deals).to.be.an("array"); // Data should contain activities array
                        expect(Object.keys(data.deals).length).to.be.above(0); // We should have at least 1 activity

                        for (var i = 0; i < data.deals.length; i++) {
                            expect(data.deals[i]).to.have.property("type"); // Activity should have a type
                            expect(data.deals[i]).to.have.property("id"); // Activity should have an id
                            expect(data.deals[i]).to.have.property("name"); // Activity should have a name
                            expect(data.deals[i]).to.have.property("descriptionShort"); // Activity should have a descriptionShort
                            expect(data.deals[i]).to.have.property("descriptionLong"); // Activity should have a descriptionLong
                            expect(data.deals[i]).to.have.property("price"); // Activity should have a price
                            expect(data.deals[i]).to.have.property("cardImage"); // Activity should have a card image
                            expect(data.deals[i]).to.have.property("icon"); // Activity should have icon image
                        }
                        done();
                    });
            });
        });
    });
}

testSuite("deals");