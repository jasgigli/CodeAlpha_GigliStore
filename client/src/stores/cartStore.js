import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      couponCode: null,
      discountAmount: 0,

      // Actions
      addToCart: (product, quantity = 1, variant = null) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.id === product.id &&
              JSON.stringify(item.variant) === JSON.stringify(variant)
          );

          if (existingItemIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            return { items: updatedItems };
          } else {
            return {
              items: [
                ...state.items,
                {
                  id: product.id || product._id,
                  name: product.name,
                  price: product.price,
                  image: product.images?.[0] || product.image,
                  quantity,
                  variant,
                  subtotal: product.price * quantity
                }
              ]
            };
          }
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(itemId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId
              ? { ...item, quantity, subtotal: item.price * quantity }
              : item
          )
        }));
      },

      removeFromCart: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId)
        })),

      clearCart: () => set({
        items: [],
        couponCode: null,
        discountAmount: 0
      }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      openCart: () => set({ isOpen: true }),

      closeCart: () => set({ isOpen: false }),

      applyCoupon: (code, discount) => set({
        couponCode: code,
        discountAmount: discount
      }),

      removeCoupon: () => set({
        couponCode: null,
        discountAmount: 0
      }),

      // Getters
      getCartCount: () => get().items.reduce((total, item) => total + item.quantity, 0),

      getCartTotal: () => {
        const subtotal = get().items.reduce((total, item) => total + item.subtotal, 0);
        return Math.max(0, subtotal - get().discountAmount);
      },

      getCartSubtotal: () => get().items.reduce((total, item) => total + item.subtotal, 0),

      isInCart: (productId, variant = null) => {
        return get().items.some(
          (item) =>
            item.id === productId &&
            JSON.stringify(item.variant) === JSON.stringify(variant)
        );
      }
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
        discountAmount: state.discountAmount
      })
    }
  )
);
