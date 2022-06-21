let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = require("chai").expect;
chai.use(chaiHttp);

var port = process.env.PORT || 3000;

let backend = "http://localhost:" + port + "/api/";

function testSuite(name) {
  describe(name, () => {
    describe("GET " + backend, function () {
      it("Backend is up and running.", function (done) {
        chai
          .request(backend)
          .get(name)
          .end(function (err, res) {
            if (err) {
              done(err);
            }
            var data = res.body;
            
            expect(res).to.have.status(200);
            expect(data.message).to.be.a("string");
            expect(data.message).to.equal("Hello from backend!");

            done();
          });
      });
    });
  });
}

testSuite("");