import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  bears: number;
};

type Actions = {
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (qty: number) => void;
};

export const useAppStore = create<State & Actions>()(
  immer((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears) => set({ bears: newBears }),
  }))
);
