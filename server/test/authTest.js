import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { authTestData } from './testData';

chai.use(chaiHttp);

const { assert , expect } = chai;

const { 
  validUserData, invalidUserData, existingUserSignIn, nonExistentUser, missingLoginField, wrongPassword 
} = authTestData;

describe("AUTH TEST", () => {
  describe('User signUp', () => {
    it('should respond with a status 201 and create a new account', async () => {
      const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send(validUserData);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('status')
        expect(res.body.status).to.equal('success');
        expect(res.body).to.have.property('data');
    })
    it('should respond with status code 409 if account already exists', async () => {
      const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send(validUserData);
      expect(res).to.have.status(409);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal('error')
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('This email address is already registered');
    });
    it('should respond with status code 400 for invalid account signUp details', async () => {
      const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send(invalidUserData);
      expect(res).to.have.status(400);
      expect(res.body.status).to.equal('error')
      expect(res.body).to.have.property('error');
    });
  })

  describe('USER SIGNIN', () => {
    it('should respond with status code 200 if user exist', async () => {
      const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(existingUserSignIn);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status')
      expect(res.body.status).to.equal('success');
      expect(res.body).to.have.property('data');
    });

    it('should respond with status code 404 if user does not exist', async () => {
      const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(nonExistentUser);
      expect(res).to.have.status(404);
      expect(res.body.status).to.equal('error')
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('User does not exist');
    });

    it('should respond with status code 400 if field is empty', async () => {
      const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(missingLoginField);
      expect(res).to.have.status(400);
      expect(res.body.status).to.equal('error')
      expect(res.body).to.have.property('error');
    });

    it('should respond with status code 401 if password is incorrect', async () => {
      const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(wrongPassword);
      expect(res).to.have.status(401);
      expect(res.body.status).to.equal('error')
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Invalid  password/email');
    });
  })
})

