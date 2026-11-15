
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CryptoStore {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useCryptoStore = create<CryptoStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id: string) => {
        const currentFavorites = get().favorites;
        const exists = currentFavorites.includes(id);
        set({
          favorites: exists
            ? currentFavorites.filter((fav) => fav !== id)
            : [...currentFavorites, id],
        });
      },
      isFavorite: (id: string) => get().favorites.includes(id),
    }),
    {
      name: 'pulso-abierto-favorites', // Clave en localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ favorites: state.favorites }), // Solo persiste favoritos
    }
  )
);