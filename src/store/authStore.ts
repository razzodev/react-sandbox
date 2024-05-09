import { create } from "zustand";
import { User } from "firebase/auth";
// import { immer } from "zustand/middleware/immer";

type State = {
  isAuthenticated: boolean;
  email: string | null;
  uid: string | null;
  user: User | null;
  setAuth: (bool: boolean) => void;
  setEmail: (email: string) => void;
  setUser: (payload: any) => void;
  signIn: (payload: any, callback?: VoidFunction) => void;
  signOut: (callback?: VoidFunction) => void;
};

export const useAuthStore = create<State>((set) => ({
  isAuthenticated: false,
  email: null,
  uid: null,
  user: null,
  setAuth: (bool) => set(() => ({ isAuthenticated: bool })),
  setEmail: (email) => set(() => ({ email: email })),
  setUser: (payload) => set(() => ({ user: payload })),
  signIn: (payload) => {
    set(() => ({
      user: payload,
      uid: payload.uid,
      isAuthenticated: true,
      email: payload.email,
    }))
  },
  signOut: () => {
    set(() => ({
      isAuthenticated: false,
      email: null,
      user: null,
      uid: null,
    }))
  },
}));

