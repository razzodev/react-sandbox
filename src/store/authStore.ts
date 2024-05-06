import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  user: any | null;
  uid: string | null;
  email: string | null;
  isAuthenticated: boolean;
};

type Actions = {
  setUser: (payload: any) => void;
  setAuth: (authState: boolean) => void;
  signIn: (payload: any) => void;
  signOut: (callback?: VoidFunction) => void;
};

export const useAuthStore = create<State & Actions>()(
  immer((set) => ({
    user: null,
    uid: null,
    email: null,
    isAuthenticated: false,
    setUser: (payload) => set((state) => (state.user = payload)),
    setAuth: (bool) => set((state) => (state.isAuthenticated = bool)),
    signIn: (payload) =>
      set((state) => {
        state.setAuth(true);
        state.user = payload;
      }),
    signOut: (callback) =>
      set((state) => {
        state.setAuth(false);
        state.user = null;
        callback && callback();
      }),
  }))
);
