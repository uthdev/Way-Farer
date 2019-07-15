import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { tripTestData, authTestData, bookingTestData } from './testData';

const { validTrip1, validCancelTrip } = tripTestData;
const { existingUserSignIn } = authTestData;
const { validBooking, nonExistingTripBooking } = bookingTestData;

chai.use(chaiHttp);

const { expect } = chai;
const adminUser = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD
};
let adminToken;
let userToken;

describe('AUTH TEST', () => {
  it('Should signin Admin', async () => {
    const admin = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(adminUser);
    expect(admin).to.have.status(200);
    expect(admin.body).to.have.property('data');

    adminToken = admin.body.data.token;
  });

  it('should respond with status code 200 and login user', async () => {
    const user = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(existingUserSignIn);
    expect(user).to.have.status(200);
    expect(user.body).to.have.property('status');
    expect(user.body.status).to.equal('success');
    expect(user.body).to.have.property('data');

    userToken = user.body.data.token;
  });
});

describe('TRIP TEST', () => {
  describe('GET ALL TRIP', () => {
    it('should have a status 404 code and return an error message when no trip is available', async () => {
      const res = await chai.request(app)
        .get('/api/v1/trips')
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(404);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.be.equal('No existing trip');
    });
  });
  
    
  describe('POST A TRIP', () => {
    it('should return a status 201 code and post a trip', async () => {
      const res = await chai.request(app)
        .post('/api/v1/trips')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(validTrip1);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('data');
    });
    it('should return a status 403 code and return an error response when no token is provided', async () => {
      const res = await chai.request(app)
        .post('/api/v1/trips')
        .set({ Authorization: `Bearer ${''}` })
        .send(validTrip1);
      expect(res).to.have.status(401);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
    });
  });
  describe('GET BOOKING', () => {
    it('should return a 404 status and error message when there are no bookings', async () => {
      const res = await chai.request(app)
        .get('/api/v1/bookings')
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(404);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.be.equal('No existing booking');
    });
  });

  describe('CREATE BOOKING', () => {
    it('should return a status 201 and create a new booking', async () => {
      const res = await chai.request(app)
        .post('/api/v1/bookings')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(validBooking);
      expect(res).to.have.status(201);
      expect(res.body.status).to.equal('success');
      expect(res.body).to.have.property('data');
    });
    it('should return a status 403 and return an error', async () => {
      const res = await chai.request(app)
        .post('/api/v1/bookings')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(validBooking);
      expect(res).to.have.status(403);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('You cannot make more than one booking');
    });
  });

  describe('GET ALL TRIPS', () => {
    it('should have a status 200 code and return all the available trips', async () => {
      const res = await chai.request(app)
        .get('/api/v1/trips')
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('success');
      expect(res.body).to.have.property('data');
    });
  });
  describe('FILTER TRIPS', () => {
    it('should have a status 200 code and filter trips based on origin and destination', async () => {
      const res = await chai.request(app)
        .get('/api/v1/trips?origin=Mile 2&destination=Berger')
        .set({ Authorization: `Bearer ${userToken}` });
      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('success');
      expect(res.body).to.have.property('data');
    });
    it('should have a status 200 code and filter trips based on origin', async () => {
      const res = await chai.request(app)
        .get('/api/v1/trips?origin=Mile 2')
        .set({ Authorization: `Bearer ${userToken}` });
      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('success');
      expect(res.body).to.have.property('data');
    });
    it('should have a status 200 code and filter trips based on destination', async () => {
      const res = await chai.request(app)
        .get('/api/v1/trips?destination=Berger')
        .set({ Authorization: `Bearer ${userToken}` });
      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('success');
      expect(res.body).to.have.property('data');
    });
    it('should have 404 status and return an error message when no trips of the specified origin exists', async () => {
      const res = await chai.request(app)
        .get('/api/v1/trips?origin=Idumota')
        .set({ Authorization: `Bearer ${userToken}` });
      expect(res).to.have.status(404);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.be.equal('Trips not found');
    });
    it('should have 404 status and return an error message when no trips of the specified destination exists', async () => {
      const res = await chai.request(app)
        .get('/api/v1/trips?destination=Cele')
        .set({ Authorization: `Bearer ${userToken}` });
      expect(res).to.have.status(404);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.be.equal('Trips not found');
    });
  });
  

  describe('CANCEL A TRIP', () => {
    it('should return a 200 status and change the status of the trip to cancel', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/trips/1/cancel')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(validCancelTrip);
      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.data).to.have.property('message');
      expect(res.body.data.message).to.equal('Trip cancelled successfully');
    });
  });
});

describe('BOOKING TESTS', () => {
  describe('CREATE BOOKING', () => {
    it('should return a status 403 and return an error', async () => {
      const res = await chai.request(app)
        .post('/api/v1/bookings')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(validBooking);
      expect(res).to.have.status(403);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('The trip you are making a booking to has been cancelled');
    });
    it('should return a status 403 and return an error', async () => {
      const res = await chai.request(app)
        .post('/api/v1/bookings')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(nonExistingTripBooking);
      expect(res).to.have.status(404);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('The trip you are making a booking to does not exist');
    });
  });

  describe('GET ALL BOOKINGS', () => {
    it('should return a status 200 and return all the bookings when user is admin', async () => {
      const res = await chai.request(app)
        .get('/api/v1/bookings')
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('success');
      expect(res.body).to.have.property('data');
    });
    it('should return a status 200 and return all the bookings when user is admin', async () => {
      const res = await chai.request(app)
        .get('/api/v1/bookings')
        .set({ Authorization: `Bearer ${userToken}` });
      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('success');
      expect(res.body).to.have.property('data');
    });
  });

  describe('DELETE BOOKING', () => {
    it('should return a status 403 and error message', async () => {
      const res = await chai.request(app)
        .delete('/api/v1/bookings/1')
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(403);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('You can only delete your own booking');
    });
    it('should return a status 200 and delete the booking', async () => {
      const res = await chai.request(app)
        .delete('/api/v1/bookings/1')
        .set({ Authorization: `Bearer ${userToken}` });
      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('success');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('message');
      expect(res.body.data.message).to.equal('Booking deleted successfully');
    });
    it('should return a status 404 and an error message', async () => {
      const res = await chai.request(app)
        .delete('/api/v1/bookings/1')
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(404);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('The booking does not exist');
    });
  });
});
