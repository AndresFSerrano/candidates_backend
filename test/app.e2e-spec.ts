import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Candidates API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /candidates should return 200 and an array', async () => {
    const res = await request(app.getHttpServer())
      .get('/candidates')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /candidates should fail without excel file', async () => {
    await request(app.getHttpServer())
      .post('/candidates')
      .field('name', 'John')
      .field('surname', 'Doe')
      .expect(400);
  });
});
