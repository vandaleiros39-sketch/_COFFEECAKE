export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
  isHighlight?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface OrderDetails {
  name: string;
  address: string;
  paymentMethod: string;
  deliveryType: 'delivery' | 'pickup';
}
