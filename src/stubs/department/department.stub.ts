type DepartmentStubType = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export const DepartmentStub: DepartmentStubType = {
  id: '669543757fcd695893969290',
  name: 'Games',
  createdAt: '2024-07-15T15:27:15.700Z',
  updatedAt: '2024-07-15T15:27:15.700Z',
  deletedAt: null,
};

export const DepartmentStubWithDeletedAt: DepartmentStubType = {
  id: '669543757fcd695893969290',
  name: 'Games',
  createdAt: '2024-07-15T15:27:15.700Z',
  updatedAt: '2024-07-15T15:27:15.700Z',
  deletedAt: '2024-07-15T15:27:15.700Z',
};
