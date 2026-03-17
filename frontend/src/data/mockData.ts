import type { AuthUser, Category, Order, Product } from "../types";

export const mockCategories: Category[] = [
  { id: 1, name: "Tech Essentials" },
  { id: 2, name: "Studio Setup" },
  { id: 3, name: "Smart Living" },
  { id: 4, name: "Travel Picks" }
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Flux One Headphones",
    description:
      "Wireless over-ear headphones tuned for deep focus sessions, clear calls, and long battery life.",
    price: 179.9,
    stock: 14,
    categoryId: 1,
    image: "linear-gradient(135deg, #ff8a5b 0%, #ffd166 100%)",
    featured: true
  },
  {
    id: 2,
    name: "Nova Desk Lamp",
    description:
      "A sculptural LED lamp with warm-to-cool temperature control for late-night work and clean desk aesthetics.",
    price: 69,
    stock: 22,
    categoryId: 2,
    image: "linear-gradient(135deg, #0f4c81 0%, #9bd1e5 100%)",
    featured: true
  },
  {
    id: 3,
    name: "Orbit Speaker Mini",
    description:
      "Portable speaker with punchy sound, matte finish, and enough battery to last through weekend trips.",
    price: 95.5,
    stock: 8,
    categoryId: 4,
    image: "linear-gradient(135deg, #23395d 0%, #b6c9f0 100%)",
    featured: true
  },
  {
    id: 4,
    name: "Aero Bottle",
    description:
      "Insulated stainless steel bottle designed for city commutes, travel, and everyday carry.",
    price: 32,
    stock: 40,
    categoryId: 4,
    image: "linear-gradient(135deg, #2a6f97 0%, #61c0bf 100%)"
  },
  {
    id: 5,
    name: "Canvas Keyboard",
    description:
      "Compact mechanical keyboard with low-profile switches and a clean, minimalist layout.",
    price: 124,
    stock: 16,
    categoryId: 1,
    image: "linear-gradient(135deg, #5f0f40 0%, #fb8b24 100%)"
  },
  {
    id: 6,
    name: "Pulse Air Purifier",
    description:
      "Smart purifier with quiet mode, room-quality indicator, and app-ready control concept.",
    price: 210,
    stock: 11,
    categoryId: 3,
    image: "linear-gradient(135deg, #355070 0%, #b56576 100%)"
  }
];

export const mockDemoUser: AuthUser = {
  name: "Demo Customer",
  email: "demo@fluxon.shop",
  token: "mock-jwt-token"
};

export const mockOrders: Order[] = [
  {
    id: "FX-2026-1001",
    createdAt: "2026-03-16T10:30:00.000Z",
    status: "Confirmed",
    total: 248.9,
    items: [
      {
        productId: 1,
        productName: "Flux One Headphones",
        quantity: 1,
        unitPrice: 179.9
      },
      {
        productId: 4,
        productName: "Aero Bottle",
        quantity: 2,
        unitPrice: 32
      }
    ],
    payment: {
      method: "PayPal",
      amount: 248.9,
      status: "Paid"
    },
    customerEmail: "demo@fluxon.shop",
    shippingAddress: "18 Vision Street, Berlin"
  }
];
