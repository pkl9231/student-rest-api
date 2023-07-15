import server from '../src/server';
import chai from 'chai';
import chaiHttp from "chai-http";

chai.use(chaiHttp);

describe('Test response for get student', () => {
  it('should return success status response', () => {
    return chai.request(server).get('/student')
      .then((res:any) => {
        console.log("getting response", res.status);
        chai.expect(res.status).to.eql(200);
      })
  })
})

describe('get student', () => {
  it('should return not found status response', () => {
    return chai.request(server).get('/student')
      .then((res:any) => {
        console.log("getting response", res.status);
        chai.expect(res.status).to.eql(404);
      })
  })
})

describe('get student', () => {
  it('should return not found status response', () => {
    return chai.request(server).post('/student1111')
      .then((res:any) => {
        console.log("getting response", res.status);
        chai.expect(res.status).to.eql(404);
      })
  })
})


describe('post student', () => {
  it('it should not POST without all mandatory field', (done) => {
      let studentData = {
        name: "",
        className: "",
        rollNumber: "",
        fathersName: "",
        mobile: "",
        dateOfAdmission: "",
        email: "",
        password: "",
      };
    chai.request(server)
        .post('/student')
        .send(studentData)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
          done();
        });
  });
});

describe('post student', () => {
  it('it should  POST records successfully', (done) => {
      let studentData = {
        name: "test name",
        className: "B.Tech",
        rollNumber: "123",
        fathersName: "test father",
        mobile: "9821234343",
        email: "test@gmail.com",
        password: "12345",
      };
    chai.request(server)
        .post('/student')
        .send(studentData)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
          done();
        });
  });

});