import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { tripTestData } from './testData';

const { validTrip } = tripTestData;

chai.use(chaiHttp);

const { assert , expect } = chai;
const adminUser = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD
}
let adminToken;

describe('AUTH TEST', () => {
  it('Should signin Admin', async () => {
    const admin = await chai.request(app)
    .post('/api/v1/auth/signin')
    .send(adminUser)
    expect(admin).to.have.status(200);
    expect(admin.body).to.have.property('data');

    adminToken = admin.body.data.token;
  });
});

describe('TRIP TEST', () => {
  describe('POST A TRIP', () => {
    it('should return a status 201 code and post a trip', async () => {
      const res = await chai.request(app)
      .post('/api/v1/trips')
      .set({Authorization: `Bearer ${adminToken}`})
      .send(validTrip);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('data');
    });
    it('should return a status 403 code and return an error response', async () => {
      const res = await chai.request(app)
      .post('/api/v1/trips')
      .set({Authorization: `Bearer ${''}`})
      .send(validTrip);
      expect(res).to.have.status(401);
      expect(res.body.status).to.equal('error')
      expect(res.body).to.have.property('error');
    });
    // it('should return a status 403 error code when user has an unrepaid loan', async () => {
    //   const res = await chai.request(app)
    //   .post('/api/v1/loans')
    //   .set('x-access-token', unrepaidLoanUserToken)
    //   .send(validLoanApplication);
    //   expect(res).to.have.status(403);
    //   expect(res.body).to.have.property('message')
    // it('should return a status 400 error code when loan application validation fails', async () => {
    //   const res = await chai.request(app)
    //   .post('/api/v1/loans')
    //   .set({Authorization: `Bearer ${adminToken}`})
    //   .send(invalidLoanApplication);
    //   expect(res).to.have.status(400);
    //   expect(res.body).to.have.property('error');
    // });
    // it('should return a status 403 error code when user has an unrepaid loan', async () => {
    //   const res = await chai.request(app)
    //   .post('/api/v1/loans')
    //   .set('x-access-token', unrepaidLoanUserToken)
    //   .send(validLoanApplication);
    //   expect(res).to.have.status(403);
    //   expect(res.body).to.have.property('message');
    // });
  });
});
