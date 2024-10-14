import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaClient } from '@prisma/client';
import * as qs from 'qs';
import * as supertest from 'supertest';

import { DepartmentModule } from '@/modules/departments';
import { CreateOneDepartmentDTO } from '@/modules/departments/dtos';
import { AuthGuard } from '@/shared/guards';
import { appConfiguration } from '@/utils/config';

import { createMany } from './fixtures/database/prisma';

describe('Department (e2e)', () => {
  let app: INestApplication;
  let createdDepartments: CreateOneDepartmentDTO[];

  const TOTAL_REGISTERS = 15;

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

    createdDepartments = await createMany(orm, TOTAL_REGISTERS);
  });

  describe('/api/departments (GET)', () => {
    describe('success responses', () => {
      it.each`
        page         | size         | total        | pageCount    | hasPrevious | hasNext  | description
        ${undefined} | ${undefined} | ${undefined} | ${undefined} | ${false}    | ${true}  | ${'should return the first 10 departments with hasNext in pagination'}
        ${1}         | ${undefined} | ${undefined} | ${undefined} | ${false}    | ${true}  | ${'should return the first 10 departments with hasNext in pagination'}
        ${undefined} | ${10}        | ${undefined} | ${undefined} | ${false}    | ${true}  | ${'should return the first 10 departments with hasNext in pagination'}
        ${1}         | ${15}        | ${undefined} | ${1}         | ${false}    | ${false} | ${'should return the first 15 departments without hasNext in pagination'}
        ${1}         | ${10}        | ${undefined} | ${undefined} | ${false}    | ${true}  | ${'should return the first 10 departments with hasNext in pagination'}
        ${2}         | ${10}        | ${undefined} | ${2}         | ${true}     | ${false} | ${'should return the second 10 departments with hasPrevious in pagination'}
      `(
        '$description',
        async ({
          page = 1,
          size = 10,
          total = TOTAL_REGISTERS,
          pageCount = Math.ceil(total / size),
          hasPrevious,
          hasNext,
        }) => {
          const query = qs.stringify(
            { page, size },
            { addQueryPrefix: true, skipNulls: true },
          );

          const uri = `/api/departments${query}`;

          const sut = await supertest(app.getHttpServer()).get(uri);

          const defaultMeta = {
            page: 1,
            size: 10,
            total: 15,
            pageCount: 2,
            hasPrevious: false,
            hasNext: false,
          };

          const meta = defaultMeta;

          if (page) meta['page'] = page;
          if (size) meta['size'] = size;
          if (total) meta['total'] = total;
          if (pageCount) meta['pageCount'] = pageCount;
          if (hasPrevious) meta['hasPrevious'] = hasPrevious;
          if (hasNext) meta['hasNext'] = hasNext;

          expect(sut.status).toBe(200);

          expect(sut.body).toEqual(
            expect.objectContaining({
              data: expect.arrayContaining([
                ...createdDepartments
                  .slice((page - 1) * meta.size, meta.size)
                  .map(({ name }) => ({
                    id: expect.any(String),
                    name,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    deletedAt: null,
                  })),
              ]),
              meta,
            }),
          );

          expect(sut.body.data).toHaveLength(
            hasNext ? meta.size : total % meta.size || meta.size,
          );
        },
      );

      it.each`
        pagination               | select            | description
        ${{ page: 1, size: 10 }} | ${['name', 'id']} | ${'should return the first 10 departments with select fields'}
        ${{ page: 2, size: 5 }}  | ${['name']}       | ${'should return the second 5 departments with select fields'}
      `('$description', async ({ pagination: { page, size }, select }) => {
        const query = qs.stringify(
          { page, size, select },
          { addQueryPrefix: true, skipNulls: true, arrayFormat: 'repeat' },
        );

        const uri = `/api/departments${query}`;

        const sut = await supertest(app.getHttpServer()).get(uri);

        expect(sut.status).toBe(200);

        expect(sut.body).toEqual(
          expect.objectContaining({
            data: expect.arrayContaining([
              ...createdDepartments.slice((page - 1) * size, size).map(() => {
                const obj = {};

                select.forEach((field) => {
                  obj[field] = expect.anything();
                });

                return obj;
              }),
            ]),
            meta: {
              page,
              size,
              total: TOTAL_REGISTERS,
              pageCount: Math.ceil(TOTAL_REGISTERS / size),
              hasPrevious: page > 1,
              hasNext: page < Math.ceil(TOTAL_REGISTERS / size),
            },
          }),
        );
      });
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
