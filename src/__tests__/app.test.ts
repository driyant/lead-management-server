
import request from 'supertest';
import app from '../app.js';

describe('GET /', () => {
  it('returns the API health status', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'OK' });
  });
});