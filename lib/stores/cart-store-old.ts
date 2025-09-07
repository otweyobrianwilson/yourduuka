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
  
  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  
  // Computed values
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      total: 0,
      itemCount: 0,

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id);
          
          if (existingItem) {
            // Update quantity if item already exists
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
            // Add new item
            const newItem: CartItem = {
              id: Date.now(), // Simple ID generation
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
      },

      removeItem: (productId: number) => {
        set((state) => {
          const updatedItems = state.items.filter(item => item.product.id !== productId);
          return {
            ...state,
            items: updatedItems,
            total: get().getTotal(),
            itemCount: get().getItemCount(),
          };
        });
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
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
      },

      clearCart: () => {
        set({
          items: [],
          total: 0,
          itemCount: 0,
        });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      setCartOpen: (open: boolean) => {
        set({ isOpen: open });
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
      }),
    }
  )
);