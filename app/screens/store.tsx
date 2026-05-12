import { create } from "zustand";

export const useStore = create((set) => ({
  token: "",
  setToken: (newToken) => set({ token: newToken }),
}));
