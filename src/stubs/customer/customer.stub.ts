type CustomerStubType = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export const CustomerStub: CustomerStubType = {
  id: '669543757fcd695893969290',
  email: 'marcelobiriba@mail.com',
  name: 'Marcelo Wesley Biriba Rodrigues',
  createdAt: '2024-07-15T15:27:15.700Z',
  updatedAt: '2024-07-15T15:27:15.700Z',
  deletedAt: null,
};

export const CustomerStubWithDeletedAt: CustomerStubType = {
  id: '669543757fcd695893969290',
  email: 'marcelobiriba@mail.com',
  name: 'Marcelo Wesley Biriba Rodrigues',
  createdAt: '2024-07-15T15:27:15.700Z',
  updatedAt: '2024-07-15T15:27:15.700Z',
  deletedAt: '2024-07-15T15:27:15.700Z',
};
