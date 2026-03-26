const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../db/models');

describe('Auth API', () => {
  afterAll(async () => {
  await sequelize.close();
});
  it('POST /auth/register создаёт пользователя', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'test@test.com',
        password: '123456',
      })
      .expect(200);

    expect(res.body.email).toBe('test@test.com');
    expect(res.body.id).toBeDefined();
  });

  it('POST /auth/login возвращает токен', async () => {
    await request(app).post('/auth/register').send({
      email: 'login@test.com',
      password: '123456',
    });

    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'login@test.com',
        password: '123456',
      })
      .expect(200);

    expect(res.body.token).toBeDefined();
  });

  it('POST /auth/login возвращает ошибку при неверном пароле', async () => {
    await request(app).post('/auth/register').send({
      email: 'wrong@test.com',
      password: '123456',
    });

    await request(app)
      .post('/auth/login')
      .send({
        email: 'wrong@test.com',
        password: 'wrongpass',
      })
      .expect(400);
  });
});