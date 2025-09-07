import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/db/schema';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  itemCount: number;
  sessionId: string;
  isLoading: boolean;
  isHydrated: boolean;
  
  // Actions
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  syncWithServer: () => Promise<void>;
  setHydrated: () => void;
  
  // Computed values
  getTotal: () => number;
  getItemCount: () => number;
}

// Generate a session ID for guest users
const generateSessionId = () => {
  return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
};

// API helper functions
const cartApi = {
  async getCart(sessionId: string) {
    const response = await fetch(`/api/cart?sessionId=${sessionId}`);
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  },

  async addToCart(sessionId: string, productId: string, quantity: number) {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, productId, quantity }),
    });
    if (!response.ok) throw new Error('Failed to add to cart');
    return response.json();
  },

  async updateCart(sessionId: string, productId: string, quantity: number) {
    const response = await fetch('/api/cart', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, productId, quantity }),
    });
    if (!response.ok) throw new Error('Failed to update cart');
    return response.json();
  },

  async removeFromCart(sessionId: string, productId: string) {
    const response = await fetch(`/api/cart?sessionId=${sessionId}&productId=${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to remove from cart');
    return response.json();
  },

  async clearCart(sessionId: string) {
    const response = await fetch(`/api/cart?sessionId=${sessionId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to clear cart');
    return response.json();
  },
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      total: 0,
      itemCount: 0,
      sessionId: generateSessionId(),
      isLoading: false,
      isHydrated: false,

      addItem: async (product: Product, quantity = 1) => {
        const { sessionId, isHydrated } = get();
        
        // Optimistic update for better UX
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id);
          
          if (existingItem) {
            const updatedItems = state.items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
            return {
              ...state,
              items: updatedItems,
              total: get().getTotal(),
              itemCount: get().getItemCount(),
            };
          } else {
            const newItem: CartItem = {
              id: Date.now(),
              product,
              quantity,
              price: parseFloat(product.price),
            };
            return {
              ...state,
              items: [...state.items, newItem],
              total: get().getTotal(),
              itemCount: get().getItemCount(),
            };
          }
        });

        // Sync with server if hydrated
        if (isHydrated) {
          try {
            set({ isLoading: true });
            await cartApi.addToCart(sessionId, product.id.toString(), quantity);
          } catch (error) {
            console.error('Failed to sync cart with server:', error);
            // Optionally revert optimistic update here
          } finally {
            set({ isLoading: false });
          }
        }
      },

      removeItem: async (productId: number) => {
        const { sessionId, isHydrated } = get();
        
        // Optimistic update
        set((state) => {
          const updatedItems = state.items.filter(item => item.product.id !== productId);
          return {
            ...state,
            items: updatedItems,
            total: get().getTotal(),
            itemCount: get().getItemCount(),
          };
        });

        // Sync with server if hydrated
        if (isHydrated) {
          try {
            set({ isLoading: true });
            await cartApi.removeFromCart(sessionId, productId.toString());
          } catch (error) {
            console.error('Failed to sync cart with server:', error);
          } finally {
            set({ isLoading: false });
          }
        }
      },

      updateQuantity: async (productId: number, quantity: number) => {
        const { sessionId, isHydrated } = get();
        
        if (quantity <= 0) {
          await get().removeItem(productId);
          return;
        }
        
        // Optimistic update
        set((state) => {
          const updatedItems = state.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          );
          return {
            ...state,
            items: updatedItems,
            total: get().getTotal(),
            itemCount: get().getItemCount(),
          };
        });

        // Sync with server if hydrated
        if (isHydrated) {
          try {
            set({ isLoading: true });
            await cartApi.updateCart(sessionId, productId.toString(), quantity);
          } catch (error) {
            console.error('Failed to sync cart with server:', error);
          } finally {
            set({ isLoading: false });
          }
        }
      },

      clearCart: async () => {
        const { sessionId, isHydrated } = get();
        
        // Optimistic update
        set({
          items: [],
          total: 0,
          itemCount: 0,
        });

        // Sync with server if hydrated
        if (isHydrated) {
          try {
            set({ isLoading: true });
            await cartApi.clearCart(sessionId);
          } catch (error) {
            console.error('Failed to sync cart with server:', error);
          } finally {
            set({ isLoading: false });
          }
        }
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      setCartOpen: (open: boolean) => {
        set({ isOpen: open });
      },

      syncWithServer: async () => {
        const { sessionId } = get();
        
        try {
          set({ isLoading: true });
          const serverCart = await cartApi.getCart(sessionId);
          
          // Transform server cart items to match local format
          const transformedItems: CartItem[] = serverCart.items.map((item: any) => ({
            id: item.id,
            product: item.product,
            quantity: item.quantity,
            price: parseFloat(item.price),
          }));
          
          set({
            items: transformedItems,
            total: serverCart.totalAmount,
            itemCount: serverCart.totalItems,
          });
        } catch (error) {
          console.error('Failed to sync with server:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      setHydrated: () => {
        set({ isHydrated: true });
        // Sync with server when first hydrated
        get().syncWithServer();
      },

      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'yourduka-cart',
      partialize: (state) => ({ 
        items: state.items,
        total: state.total,
        itemCount: state.itemCount,
        sessionId: state.sessionId,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);