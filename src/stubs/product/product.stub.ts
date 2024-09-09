type ProductStubType = {
  id: string;
  title: string;
  sku: string;
  active: boolean;
  price: number;
  description: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export const ProductStub: ProductStubType = {
  id: '669543757fcd695893969290',
  title: 'Café',
  active: true,
  description:
    'Descubra a essência do verdadeiro café brasileiro com o Café Especial Reserva da Fazenda. Colhido manualmente nas montanhas de Minas Gerais, este café é uma seleção cuidadosa dos melhores grãos arábica, cultivados a uma altitude de 1200 metros, o que proporciona um sabor único e inigualável.',
  price: 15.98,
  productId: '669ffcaddeba13289c8bb845',
  sku: 'CAF-MED-250G-BR',
  createdAt: '2024-07-15T15:27:15.700Z',
  updatedAt: '2024-07-15T15:27:15.700Z',
  deletedAt: null,
};

export const ProductStubWithDeletedAt: ProductStubType = {
  id: '669543757fcd695893969290',
  title: 'Café',
  active: true,
  description:
    'Descubra a essência do verdadeiro café brasileiro com o Café Especial Reserva da Fazenda. Colhido manualmente nas montanhas de Minas Gerais, este café é uma seleção cuidadosa dos melhores grãos arábica, cultivados a uma altitude de 1200 metros, o que proporciona um sabor único e inigualável.',
  price: 15.98,
  productId: '669ffcaddeba13289c8bb845',
  sku: 'CAF-MED-250G-BR',
  createdAt: '2024-07-15T15:27:15.700Z',
  updatedAt: '2024-07-15T15:27:15.700Z',
  deletedAt: '2024-07-15T15:27:15.700Z',
};
