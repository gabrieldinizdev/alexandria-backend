type StockStubType = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export const StockStub: StockStubType = {
  id: '669543757fcd695893969290',
  name: 'Loja A',
  createdAt: '2024-07-15T15:27:15.700Z',
  updatedAt: '2024-07-15T15:27:15.700Z',
  deletedAt: null,
};

export const StockStubWithDeletetAt: StockStubType = {
  id: '669543757fcd695893969290',
  name: 'Loja A',
  createdAt: '2024-07-15T15:27:15.700Z',
  updatedAt: '2024-07-15T15:27:15.700Z',
  deletedAt: '2024-07-15T15:27:15.700Z',
};
