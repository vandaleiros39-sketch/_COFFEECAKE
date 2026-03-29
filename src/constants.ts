import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'cakes', name: 'Bolos Artesanais' },
  { id: 'sweets', name: 'Doces Gourmet' },
  { id: 'desserts', name: 'Sobremesas Especiais' },
  { id: 'drinks', name: 'Bebidas' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Bolo Red Velvet Premium',
    description: 'Massa aveludada com toque de cacau e recheio de cream cheese artesanal.',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1586788680434-30d324671ff6?auto=format&fit=crop&q=80&w=800',
    category: 'cakes',
    isAvailable: true,
    isHighlight: true,
  },
  {
    id: '2',
    name: 'Bolo de Cenoura com Brigadeiro',
    description: 'O clássico fofinho com cobertura generosa de brigadeiro 50% cacau.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=800',
    category: 'cakes',
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Brigadeiro Gourmet Belga',
    description: 'Feito com chocolate belga Callebaut e granulado especial.',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800',
    category: 'sweets',
    isAvailable: true,
    isHighlight: true,
  },
  {
    id: '4',
    name: 'Macarons Sortidos (Unidade)',
    description: 'Delicado doce francês em diversos sabores: pistache, frutas vermelhas e baunilha.',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800',
    category: 'sweets',
    isAvailable: true,
  },
  {
    id: '5',
    name: 'Torta Banoffee Especial',
    description: 'Base de biscoito, doce de leite artesanal, bananas frescas e chantilly leve.',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1626803775151-61d756612f97?auto=format&fit=crop&q=80&w=800',
    category: 'desserts',
    isAvailable: true,
    isHighlight: true,
  },
  {
    id: '6',
    name: 'Cheesecake de Frutas Vermelhas',
    description: 'Cremoso e equilibrado com calda artesanal de morango, amora e framboesa.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800',
    category: 'desserts',
    isAvailable: false,
  },
  {
    id: '7',
    name: 'Cappuccino Italiano',
    description: 'Espresso, leite vaporizado e uma pitada de canela.',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=800',
    category: 'drinks',
    isAvailable: true,
  },
  {
    id: '8',
    name: 'Chocolate Quente Cremoso',
    description: 'Receita exclusiva com chocolate meio amargo e especiarias.',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1544787210-228394c3d3e0?auto=format&fit=crop&q=80&w=800',
    category: 'drinks',
    isAvailable: true,
  },
];

export const WHATSAPP_URL = 'https://w.app/coffeecake_pedidos';
export const INSTAGRAM_HANDLE = '_coffeecakesc';
