import { mockCategories, mockDemoUser, mockOrders, mockProducts } from "../data/mockData";
import type {
  AuthUser,
  CheckoutForm,
  LoginInput,
  Order,
  Product,
  RegisterInput
} from "../types";

const wait = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

let orderStore = [...mockOrders];

export const mockApi = {
  async getProducts(): Promise<Product[]> {
    await wait();
    return mockProducts.map((product) => ({
      ...product,
      category: mockCategories.find((category) => category.id === product.categoryId)
    }));
  },

  async getProductById(productId: number): Promise<Product> {
    await wait();
    const product = mockProducts.find((item) => item.id === productId);
    if (!product) {
      throw new Error("Product not found");
    }

    return {
      ...product,
      category: mockCategories.find((category) => category.id === product.categoryId)
    };
  },

  async getCategories() {
    await wait();
    return mockCategories;
  },

  async login(input: LoginInput): Promise<AuthUser> {
    await wait();
    if (!input.email || !input.password) {
      throw new Error("Email and password are required");
    }

    return {
      ...mockDemoUser,
      email: input.email
    };
  },

  async register(input: RegisterInput): Promise<AuthUser> {
    await wait();
    if (!input.name || !input.email || !input.password) {
      throw new Error("All fields are required");
    }

    return {
      name: input.name,
      email: input.email,
      token: "mock-registered-token"
    };
  },

  async getOrders(): Promise<Order[]> {
    await wait();
    return orderStore;
  },

  async createOrder(input: CheckoutForm, cart: { product: Product; quantity: number; unitPrice: number }[]): Promise<Order> {
    await wait();

    const total = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const order: Order = {
      id: `FX-2026-${1000 + orderStore.length + 1}`,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
      total,
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      })),
      payment: {
        method: input.paymentMethod,
        amount: total,
        status: "Paid"
      },
      customerEmail: input.email,
      shippingAddress: `${input.address}, ${input.city}, ${input.postalCode}`
    };

    orderStore = [order, ...orderStore];
    return order;
  }
};
