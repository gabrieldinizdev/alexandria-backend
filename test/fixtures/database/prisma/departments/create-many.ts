import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

import { CreateOneDepartmentDTO } from '@/modules/departments/dtos';

function createOneDepartmentStub() {
  const dto: CreateOneDepartmentDTO = {
    name: faker.word.noun(),
  };

  return dto;
}

export async function createMany(orm: PrismaClient, size = 10) {
  const data: CreateOneDepartmentDTO[] = [];

  for (let index = 0; index < size; index++) {
    data.push(createOneDepartmentStub());
  }

  await orm.department.createMany({
    data,
  });

  return data;
}
