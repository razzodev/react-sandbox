import { create } from "zustand";
// import { immer } from "zustand/middleware/immer";

type State = {
  user: any | null;
  uid: string | null;
  email: string | null;
  isAuthenticated: boolean;
  setUser: (payload: any) => void;
  setAuth: (bool: boolean) => void;
  signIn: (payload: any, callback?: VoidFunction) => void;
  setEmail: (email: string) => void;
  signOut: (callback?: VoidFunction) => void;
};

export const useAuthStore = create<State>((set) => ({
  user: null,
  uid: null,
  email: "foo@bar.com",
  isAuthenticated: false,
  setUser: (payload) => set(() => ({ user: payload })),
  setAuth: (bool) => set(() => ({ isAuthenticated: bool })),
  signIn: (payload, callback) => {
    set(() => ({
      user: payload,
      uid: payload.uid,
      isAuthenticated: true,
      email: payload.email,
    })),
      callback && callback;
  },
  signOut: (callback) => {
    set(() => ({
      isAuthenticated: false,
      email: null,
      user: null,
      uid: null,
    })),
      callback && callback();
    console.log("signed in");
  },
  setEmail: (email) => set(() => ({ email: email })),
}));

