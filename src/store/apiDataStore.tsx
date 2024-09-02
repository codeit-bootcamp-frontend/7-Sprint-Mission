import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  userId: number | null;
  setUserId: (id: number) => void;
  clearUserId: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      setUserId: (id: number) => set({ userId: id }),
      clearUserId: () => set({ userId: null }),
    }),
    {
      name: "user-storage",
    }
  )
);
