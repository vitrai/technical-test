import request from 'supertest';
import app from '../src/server.js';

describe('POST /do-work', () => {
  it('should return 200 OK with solution', async () => {
    const input = `4
move 3 onto 1
move 2 over 1
pile 0 onto 1
quit`;
    const response = await request(app)
      .post('/do-work')
      .send({ text: input })
      .expect(200);

    expect(response.body).toHaveProperty('solution');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(typeof response.body.solution).toBe('string');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.solution).toContain('0:');
  });

  it('should return JSON content type', async () => {
    const input = `4
move 3 onto 1
quit`;
    const response = await request(app).post('/do-work').send({ text: input });

    expect(response.headers['content-type']).toMatch(/json/);
  });

  it('should return 400 for invalid input', async () => {
    const response = await request(app).post('/do-work').send({}).expect(400);

    expect(response.body).toHaveProperty('error');
  });
});
