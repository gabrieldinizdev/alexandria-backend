import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaClient } from '@prisma/client';
import * as supertest from 'supertest';

import { DepartmentModule } from '@/modules/departments';
import { AuthGuard } from '@/shared/guards';
import { appConfiguration } from '@/utils/config';

describe('Department (e2e)', () => {
  let app: INestApplication;
  const orm = new PrismaClient();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DepartmentModule],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();

    appConfiguration(app);

    await app.init();
  });

  beforeAll(async () => {
    await orm.$connect();

    await orm.department.createMany({
      data: [
        { name: 'Engineering' },
        { name: 'Marketing' },
        { name: 'Sales' },
        { name: 'Human Resources' },
        { name: 'Finance' },
      ],
    });
  });

  describe('/api/departments (GET)', () => {
    describe('success responses', () => {
      it('should return an array of departments', async () => {
        const sut = await supertest(app.getHttpServer())
          .get('/api/departments')
          .expect(200);

        expect(sut.body).toEqual(
          expect.objectContaining({
            data: [
              {
                id: expect.any(String),
                name: 'Engineering',
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                deletedAt: null,
              },
              {
                id: expect.any(String),
                name: 'Marketing',
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                deletedAt: null,
              },
              {
                id: expect.any(String),
                name: 'Sales',
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                deletedAt: null,
              },
              {
                id: expect.any(String),
                name: 'Human Resources',
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                deletedAt: null,
              },
              {
                id: expect.any(String),
                name: 'Finance',
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                deletedAt: null,
              },
            ],
            meta: {
              page: expect.any(Number),
              size: expect.any(Number),
              total: 5,
              pageCount: 1,
              hasPrevious: expect.any(Boolean),
              hasNext: expect.any(Boolean),
            },
          }),
        );
      });

      it.todo('should return an array of departments with pagination');

      it.todo('should return an array of departments with select fields');
    });

    describe('error responses', () => {
      it.todo(
        'should return an error response when the user is not authenticated',
      );

      it.todo('should return an error response when pass invalid query params');
    });
  });

  afterAll(async () => {
    await orm.department.deleteMany({
      where: {
        id: {
          not: undefined,
        },
      },
    });

    await orm.$disconnect();

    await app.close();
  });
});
