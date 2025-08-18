import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      wishlist: [],

      // Actions
      setUser: (user, token) => set({
        user,
        token,
        isAuthenticated: !!user
      }),

      updateUser: (userData) => set((state) => ({
        user: { ...state.user, ...userData }
      })),

      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          wishlist: []
        });
      },

      addToWishlist: (product) => set((state) => ({
        wishlist: state.wishlist.find(item => item.id === product.id)
          ? state.wishlist
          : [...state.wishlist, product]
      })),

      removeFromWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.filter(item => item.id !== productId)
      })),

      clearWishlist: () => set({ wishlist: [] }),

      // Getters
      isInWishlist: (productId) => {
        return get().wishlist.some(item => item.id === productId);
      },

      getWishlistCount: () => get().wishlist.length,

      isAdmin: () => {
        const user = get().user;
        return user?.role === 'admin' || user?.isAdmin;
      }
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        wishlist: state.wishlist
      })
    }
  )
);
