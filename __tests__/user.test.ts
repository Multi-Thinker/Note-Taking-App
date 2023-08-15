import request from 'supertest';
import app from '../src/app';
import httpStatus from 'http-status';

describe('Users', () => {
  let userToken: string;
  let server: any;
  beforeAll(() => {
    server = app.listen(3002);
  });
  afterAll((done) => {
    server.close();
    done();
  });
  it('user can login with valid credentials', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({ username: 'user1', password: 'password1' });
    userToken = (response as any).body.token;
    expect(userToken).toBeTruthy();
    expect(response.status).toBe(httpStatus.OK);
  });
  it('user can not login with wrong credentials', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({ username: 'user11', password: 'password1' });
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
  it('user can not register with existing credentials', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({ username: 'user1', password: 'password1' });
    expect(response.status).toBe(httpStatus.CONFLICT);
  });
  it('user can  register with new credentials', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({ username: 'user2', password: 'password1' });
    expect(response.status).toBe(httpStatus.CREATED);
  });
  it('user can login with new account', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({ username: 'user2', password: 'password1' });
    expect(response.status).toBe(httpStatus.OK);
  });
});
