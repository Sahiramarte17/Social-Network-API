const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Adjust path to your main app file
const Thought = require('../models/Thought'); // Adjust path to your Thought model
const User = require('../models/User'); // User model is needed to associate the Thought

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

describe('Thought API', () => {
  it('should create a new thought', async () => {
    const user = await User.create({ username: 'thoughtuser', email: 'thoughtuser@gmail.com' });
    const res = await request(app).post('/api/thoughts').send({
      thoughtText: 'Here is a thought!',
      username: user.username,
      userId: user._id,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.thoughtText).toBe('Here is a thought!');
  });

  it('should get all thoughts', async () => {
    const res = await request(app).get('/api/thoughts');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a single thought by id', async () => {
    const thought = await Thought.create({ thoughtText: 'single thought', username: 'user' });
    const res = await request(app).get(`/api/thoughts/${thought._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.thoughtText).toBe('single thought');
  });

  it('should update a thought by id', async () => {
    const thought = await Thought.create({ thoughtText: 'update this thought', username: 'user' });
    const res = await request(app).put(`/api/thoughts/${thought._id}`).send({
      thoughtText: 'updated thought',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.thoughtText).toBe('updated thought');
  });

  it('should delete a thought by id', async () => {
    const thought = await Thought.create({ thoughtText: 'delete this thought', username: 'user' });
    const res = await request(app).delete(`/api/thoughts/${thought._id}`);
    expect(res.statusCode).toEqual(200);
    const deletedThought = await Thought.findById(thought._id);
    expect(deletedThought).toBeNull();
  });
});
