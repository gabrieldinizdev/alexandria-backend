type CategoryStubType = {
  id: string;
  name: string;
  departmentId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export const CategoryStub: CategoryStubType = {
  id: '669543757fcd695893969290',
  name: 'Adega',
  departmentId: '669e967b746e482c2c045973',
  createdAt: '2024-07-15T15:27:15.700Z',
  updatedAt: '2024-07-15T15:27:15.700Z',
  deletedAt: null,
};

export const CategoryStubWithDeletedAt: CategoryStubType = {
  id: '669543757fcd695893969290',
  name: 'Adega',
  departmentId: '669e967b746e482c2c045973',
  createdAt: '2024-07-15T15:27:15.700Z',
  updatedAt: '2024-07-15T15:27:15.700Z',
  deletedAt: '2024-07-15T15:27:15.700Z',
};
