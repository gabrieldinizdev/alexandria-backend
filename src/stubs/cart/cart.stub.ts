import { CartItemStub, CartItemStubType } from '../cart-item';

export type CartStubType = {
  id: string;
  active: boolean;
  total: number;
  items: CartItemStubType[];
  customerId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export const CartStub: CartStubType = {
  id: '669543757fcd695893969290',
  active: true,
  total: 1000.0,
  items: [CartItemStub],
  customerId: '669543757fcd695893969290',
  createdAt: '2024-07-15T15:27:15.700Z',
  updatedAt: '2024-07-15T15:27:15.700Z',
  deletedAt: null,
};

export const CartStubWithDeletedAt: CartStubType = {
  id: '669543757fcd695893969290',
  active: true,
  total: 1000.0,
  items: [CartItemStub],
  customerId: '669543757fcd695893969290',
  createdAt: '2024-07-15T15:27:15.700Z',
  updatedAt: '2024-07-15T15:27:15.700Z',
  deletedAt: '2024-07-15T15:27:15.700Z',
};
