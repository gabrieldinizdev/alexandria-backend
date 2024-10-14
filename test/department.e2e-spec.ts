import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaClient } from '@prisma/client';
import * as supertest from 'supertest';

import { DepartmentModule } from '@/modules/departments';
import { CreateOneDepartmentDTO } from '@/modules/departments/dtos';
import { AuthGuard } from '@/shared/guards';
import { appConfiguration } from '@/utils/config';

import { createMany } from './fixtures/database/prisma';

describe('Department (e2e)', () => {
  let app: INestApplication;
  let createdDepartments: CreateOneDepartmentDTO[];

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

    createdDepartments = await createMany(orm, 15);
    // console.log(createdDepartments);
  });

  describe('/api/departments (GET)', () => {
    describe('success responses', () => {
      it.only('should return an array of departments', async () => {
        const sut = await supertest(app.getHttpServer())
          .get('/api/departments')
          .expect(200);

        const firstTen = createdDepartments.slice(0, 10);

        expect(sut.body).toEqual(
          expect.objectContaining({
            data: expect.arrayContaining([
              ...firstTen.map(({ name }) => ({
                id: expect.any(String),
                name,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                deletedAt: null,
              })),
            ]),
            meta: {
              page: 1,
              size: 10,
              total: 1,
              pageCount: 3,
              hasPrevious: false,
              hasNext: false,
            },
          }),
        );
      });

      it('should return an array of departments with hasNext in pagination', async () => {
        const sut = await supertest(app.getHttpServer())
          .get('/api/departments?page=1&size=5')
          .expect(200);

        // As in before all creates 10 records and in this we only need 5, we need to cut the array
        const firstFive = createdDepartments.slice(0, 5);

        expect(sut.body).toEqual(
          expect.objectContaining({
            data: expect.arrayContaining([
              ...firstFive.map(({ name }) => ({
                id: expect.any(String),
                name,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                deletedAt: null,
              })),
            ]),
            meta: {
              page: 1,
              size: 5,
              total: 10,
              pageCount: 2,
              hasPrevious: false,
              hasNext: true,
            },
          }),
        );
      });

      it('should return an array of departments with hasPrevious in pagination', async () => {
        const sut = await supertest(app.getHttpServer())
          .get('/api/departments?page=2&size=5')
          .expect(200);

        // As in before all creates 10 records and in this we only need 5, we need to cut the array
        const firstFive = createdDepartments.slice(5, 10);

        expect(sut.body).toEqual(
          expect.objectContaining({
            data: expect.arrayContaining([
              ...firstFive.map(({ name }) => ({
                id: expect.any(String),
                name,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                deletedAt: null,
              })),
            ]),
            meta: {
              page: 2,
              size: 5,
              total: 10,
              pageCount: 2,
              hasPrevious: true,
              hasNext: false,
            },
          }),
        );
      });

      // it('should return an array of departments with select fields', async () => {
      //   const sut = await supertest(app.getHttpServer())
      //     .get('/api/departments?page=1&size=5')
      //     .expect(200);
      // });
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
