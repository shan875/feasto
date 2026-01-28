import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  veg?: boolean;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  flat: string;
  area: string;
  city: string;
  pincode: string;
  type: 'Home' | 'Work' | 'Other';
}

interface CartState {
  items: CartItem[];
  addresses: Address[];
  selectedAddressId: string | null;
  paymentMethod: 'UPI' | 'COD' | 'CARD';
  isOpen: boolean;

  // Cart Actions
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;

  // Checkout Actions
  addAddress: (address: Omit<Address, 'id'>) => void;
  selectAddress: (id: string) => void;
  setPaymentMethod: (method: 'UPI' | 'COD' | 'CARD') => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addresses: [
        {
          id: 'default-1',
          name: 'Home',
          phone: '9876543210',
          flat: '102, Galaxy Apts',
          area: 'Indiranagar',
          city: 'Bangalore',
          pincode: '560038',
          type: 'Home'
        }
      ],
      selectedAddressId: 'default-1',
      paymentMethod: 'COD',
      isOpen: false,

      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);
        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
            isOpen: true,
          });
        } else {
          set({ items: [...currentItems, { ...item, quantity: 1 }], isOpen: true });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      updateQuantity: (id, delta) => {
        const currentItems = get().items;
        const targetItem = currentItems.find((i) => i.id === id);
        if (targetItem) {
          if (targetItem.quantity + delta <= 0) {
            set({ items: currentItems.filter((i) => i.id !== id) });
          } else {
            set({
              items: currentItems.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + delta } : i
              ),
            });
          }
        }
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      getCartTotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
      getItemCount: () => get().items.reduce((count, item) => count + item.quantity, 0),

      // --- New Checkout Logic ---
      addAddress: (address) => {
        const newId = Math.random().toString(36).substr(2, 9);
        set((state) => ({
          addresses: [...state.addresses, { ...address, id: newId }],
          selectedAddressId: newId // Auto-select new address
        }));
      },
      selectAddress: (id) => set({ selectedAddressId: id }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
    }),
    {
      name: 'lumina-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);