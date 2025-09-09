import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/db/schema';

export interface WishlistItem {
  id: number;
  product: Product;
  addedAt: number;
}

interface WishlistStore {
  items: WishlistItem[];
  isHydrated: boolean;
  
  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearWishlist: () => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  setHydrated: () => void;
  
  // Computed values
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isHydrated: false,

      addItem: (product: Product) => {
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id);
          
          if (!existingItem) {
            const newItem: WishlistItem = {
              id: Date.now(),
              product,
              addedAt: Date.now(),
            };
            return {
              ...state,
              items: [...state.items, newItem],
            };
          }
          
          return state;
        });
      },

      removeItem: (productId: number) => {
        set((state) => ({
          ...state,
          items: state.items.filter(item => item.product.id !== productId),
        }));
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      toggleItem: (product: Product) => {
        const { items } = get();
        const existingItem = items.find(item => item.product.id === product.id);
        
        if (existingItem) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      isInWishlist: (productId: number) => {
        const { items } = get();
        return items.some(item => item.product.id === productId);
      },

      setHydrated: () => {
        set({ isHydrated: true });
      },

      getItemCount: () => {
        const { items } = get();
        return items.length;
      },
    }),
    {
      name: 'wishlist-store',
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);