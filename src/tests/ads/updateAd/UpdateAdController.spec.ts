import { AdsRepository } from '@modules/ads/repositories/AdsRepository';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { app } from '../../../app';

describe('Update Announcement Controller', () => {
  let connection: Connection;
  let adsRepository: AdsRepository;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    adsRepository = new AdsRepository();

    await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      phone: '32148000',
      cpf: '58753551079',
      cep: '36032490',
    });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to crate a new ad', async () => {
    const login = await request(app)
      .post('/sessions/login')
      .send({ email: 'user@email.com', password: 'password123' });

    const token = login.body.token;

    await request(app)
      .post('/ads/create')
      .send({
        title: 'Ad Title',
        description: 'The ad description.',
      })
      .set('Authorization', 'Bearer ' + token);

    const ad = await adsRepository.findByTitle('Ad Title');

    const response = await request(app)
      .put(`/ads/update/${ad[0].id}`)
      .send({
        title: 'Outher Ad Title',
        description: 'Outher ad description.',
      })
      .set('Authorization', 'Bearer ' + token);

    const read = await request(app)
      .get(`/ads/read/${ad[0].id}`)
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(200);
    expect(read.body.title).toEqual('Outher Ad Title');
    expect(read.body.description).toEqual('Outher ad description.');
  });
});
