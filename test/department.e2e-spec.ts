import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { DepartmentModule } from '@/modules/departments';
import { AuthGuard } from '@/shared/guards';
import { appConfiguration } from '@/utils/config';

describe('Department (e2e)', () => {
  let app: INestApplication;

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

  describe('/api/departments (GET)', () => {
    describe('success responses', () => {
      it.todo('should return an array of departments');

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
    await app.close();
  });
});
