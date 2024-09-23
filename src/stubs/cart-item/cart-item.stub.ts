export type CartItemStubType = {
  id: string;
  price: number;
  quantity: number;
  productId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export const CartItemStub: CartItemStubType = {
  id: '669543757fcd695893969290',
  price: 100.0,
  quantity: 10,
  productId: '669543757fcd695893969290',
  createdAt: '2024-07-15T15:27:15.700Z',
  updatedAt: '2024-07-15T15:27:15.700Z',
  deletedAt: null,
};

export const CartItemStubWithDeletedAt = {
  id: '669543757fcd695893969290',
  price: 100.0,
  quantity: 10,
  productId: '669543757fcd695893969290',
  createdAt: '2024-07-15T15:27:15.700Z',
  updatedAt: '2024-07-15T15:27:15.700Z',
  deletedAt: '2024-07-15T15:27:15.700Z',
};
