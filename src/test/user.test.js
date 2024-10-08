const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

app.post('/createuser', (req, res) => {
  const user = req.body;
  if (!user.name || !user.email) {
    return res.status(400).send({ error: 'Name and email are required.' });
  }
  res.status(201).send(user);
});

// Test avec Supertest
describe('POST /createuser', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/createuser')
      .send({ name: 'John Doe', email: 'john@example.com' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', 'John Doe');
  });

  it('should return 400 for missing fields', async () => {
    const response = await request(app)
      .post('/createuser')
      .send({ name: '' });

    expect(response.status).toBe(400);
  });
});