export type Category = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  category?: Category;
  image: string;
  featured?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
  unitPrice: number;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type AuthUser = {
  name: string;
  email: string;
  token: string;
};

export type CheckoutForm = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: "CreditCard" | "PayPal" | "CashOnDelivery";
};

export type OrderItem = {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
};

export type Payment = {
  method: string;
  amount: number;
  status: string;
};

export type Order = {
  id: string;
  createdAt: string;
  status: string;
  total: number;
  items: OrderItem[];
  payment: Payment;
  customerEmail: string;
  shippingAddress: string;
};
