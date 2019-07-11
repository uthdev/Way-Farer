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
  describe('GET ALL TRIP', () => {
    it('should have a status 404 code and return an error message when no trip is available', async () => {
      const res = await chai.request(app)
      .get('/api/v1/trips')
      .set({Authorization: `Bearer ${adminToken}`})
      expect(res).to.have.status(404);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.be.equal('No existing trip')
    })
  })
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
  });
  describe('GET ALL TRIPS', () => {
    it('should have a status 200 code and return all the available trips', async () => {
      const res = await chai.request(app)
      .get('/api/v1/trips')
      .set({Authorization: `Bearer ${adminToken}`})
      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('success');
      expect(res.body).to.have.property('data');
    })
  })
});
