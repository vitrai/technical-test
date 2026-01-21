import request from 'supertest';
import app from '../src/server.js';

describe('POST /do-work', () => {
  it('should return 200 OK', async () => {
    const response = await request(app)
      .post('/do-work')
      .expect(200);
    
    expect(response.body).toHaveProperty('message', 'OK');
  });

  it('should return JSON content type', async () => {
    const response = await request(app)
      .post('/do-work');
    
    expect(response.headers['content-type']).toMatch(/json/);
  });
});
