type UserStubType = {
  id: string;
  title: string;
  description: string;
  active: boolean;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export const ProductStub: UserStubType = {
  id: '669543757fcd695893969290',
  title: 'Product Title',
  description: 'Product-Description',
  active: false,
  price: 1200000,
  imageUrl: 'http://image.com.br',
  createdAt: '2024-07-15T15:27:15.700Z',
  updatedAt: '2024-07-15T15:27:15.700Z',
  deletedAt: '2024-07-15T15:27:15.700Z',
};
