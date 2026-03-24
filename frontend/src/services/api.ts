import { config } from "../config";
import { mockApi } from "./mockApi";
import type {
  AuthUser,
  Category,
  CheckoutForm,
  LoginInput,
  Order,
  Product,
  RegisterInput
} from "../types";

const authStorageKey = "fluxon.auth";

function getAuthHeaders() {
  const raw = window.localStorage.getItem(authStorageKey);
  if (!raw) {
    return {} as Record<string, string>;
  }

  const user = JSON.parse(raw) as AuthUser;
  return user.token ? { Authorization: `Bearer ${user.token}` } : ({} as Record<string, string>);
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${config.apiBaseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...(init?.headers ?? {})
    },
    ...init
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

async function withFallback<T>(primary: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {
  if (config.useMockApi) {
    return fallback();
  }

  try {
    return await primary();
  } catch {
    return fallback();
  }
}

export const api = {
  getProducts(): Promise<Product[]> {
    return withFallback(
      () => request<Product[]>("/api/product"),
      () => mockApi.getProducts()
    );
  },

  getProductById(productId: number): Promise<Product> {
    return withFallback(
      () => request<Product>(`/api/product/${productId}`),
      () => mockApi.getProductById(productId)
    );
  },

  getCategories(): Promise<Category[]> {
    return withFallback(
      () => request<Category[]>("/api/category"),
      () => mockApi.getCategories()
    );
  },

  login(input: LoginInput): Promise<AuthUser> {
    return withFallback(
      () =>
        request<AuthUser>("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(input)
        }),
      () => mockApi.login(input)
    );
  },

  register(input: RegisterInput): Promise<AuthUser> {
    return withFallback(
      () =>
        request<AuthUser>("/api/auth/register", {
          method: "POST",
          body: JSON.stringify(input)
        }),
      () => mockApi.register(input)
    );
  },

  getOrders(): Promise<Order[]> {
    return withFallback(
      () => request<Order[]>("/api/order"),
      () => mockApi.getOrders()
    );
  },

  createOrder(input: CheckoutForm, cart: { product: Product; quantity: number; unitPrice: number }[]): Promise<Order> {
    return withFallback(
      () =>
        request<Order>("/api/order", {
          method: "POST",
          body: JSON.stringify({
            ...input,
            items: cart.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
              unitPrice: item.unitPrice
            }))
          })
        }),
      () => mockApi.createOrder(input, cart)
    );
  }
};
