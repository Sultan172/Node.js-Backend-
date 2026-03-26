const request = require('supertest');
const app = require('../app');
const { sequelize, Todo } = require('../db/models');

describe('Todo API', () => {
  let token;

  afterAll(async () => {
    await sequelize.close();
  });

  beforeAll(async () => {
    const email = `todo_${Date.now()}@test.com`;

    await request(app).post('/auth/register').send({
      email,
      password: '123456',
    });

    const res = await request(app).post('/auth/login').send({
      email,
      password: '123456',
    });

    token = res.body.token;
  });

  beforeEach(async () => {
    await Todo.destroy({ where: {} });
  });

  it('POST /todos создаёт задачу', async () => {
    const res = await request(app)
      .post('/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'First task' })
      .expect(200);

    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe('First task');
  });

  it('GET /todos возвращает список задач пользователя', async () => {
    await request(app)
      .post('/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Task' });

    const res = await request(app)
      .get('/todos')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.length).toBe(1);
  });

  it('PATCH /todos/:id обновляет задачу', async () => {
    const create = await request(app)
      .post('/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Update me' });

    const id = create.body.id;

    const res = await request(app)
      .patch(`/todos/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'completed' })
      .expect(200);

    expect(res.body.status).toBe('completed');
  });

  it('DELETE /todos/:id удаляет задачу', async () => {
    const create = await request(app)
      .post('/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Delete me' });

    const id = create.body.id;

    await request(app)
      .delete(`/todos/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const res = await request(app)
      .get('/todos')
      .set('Authorization', `Bearer ${token}`);

    expect(res.body.length).toBe(0);
  });
});
