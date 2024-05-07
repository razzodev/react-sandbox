import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  language: string;
  wordList: any[];
  currPage: string;
  userData: any;
};

type Actions = {
  setLanguage: (lang: string) => void;
  addWord: (data: any) => void;
  removeWord: (payload: any) => void;
  setCurrPage: (page: string) => void;
  setUserData: (data: any) => void;
};

export const useContentStore = create<State & Actions>()(
  immer((set) => ({
    userData: {},
    language: "en",
    wordList: [],
    currPage: "no page",
    setLanguage: (lang) => set((state) => (state.language = lang)),
    addWord: (payload) => set((state) => state.wordList.push(payload)),
    removeWord: (payload) =>
      set((state) => state.wordList.filter((item) => item !== payload)),
    setCurrPage: (page) => set((state) => (state.currPage = page)),
    setUserData: (data) => set(() => ({ userData: data })),
  }))
);
