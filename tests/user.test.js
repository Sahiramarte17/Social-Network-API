const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Adjust path to your main app file
const User = require('../models/User'); // Adjust path to your User model

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app).post('/api/users').send({
      username: 'testuser',
      email: 'testuser@gmail.com',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.username).toBe('testuser');
  });

  it('should get all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a single user by id', async () => {
    const user = await User.create({ username: 'singleuser', email: 'singleuser@gmail.com' });
    const res = await request(app).get(`/api/users/${user._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toBe('singleuser');
  });

  it('should update a user by id', async () => {
    const user = await User.create({ username: 'updateuser', email: 'updateuser@gmail.com' });
    const res = await request(app).put(`/api/users/${user._id}`).send({
      username: 'updateduser',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toBe('updateduser');
  });

  it('should delete a user by id', async () => {
    const user = await User.create({ username: 'deleteuser', email: 'deleteuser@gmail.com' });
    const res = await request(app).delete(`/api/users/${user._id}`);
    expect(res.statusCode).toEqual(200);
    const deletedUser = await User.findById(user._id);
    expect(deletedUser).toBeNull();
  });
});
