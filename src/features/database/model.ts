export const user: User = {
  displayName: "foo",
  email: "foo@bar",
  uid: "Yn4XfcLBCwOvxPKIblTBvuDKop23",
  languages: [
    {
      name: "english",
      categories: [
        {
          name: "general",
          words: ["h39287hfn32", "ec2u89cu2m", "uc89ejmf2f"],
          icon: ":general-icon:",
        },
        {
          name: "food and drinks",
          words: ["h39287hfn32w", "ec2u89cus2m", "uc89ejmf2ff"],
          icon: ":fork-icon:",
        },
        {
          name: "dating",
          words: ["h39287rrhfn32", "ec2cu89cu2m", "uc89yuejmf2f"],
          icon: ":heart-icon:",
        },
      ],
    },
  ],
};

export let dummyPayload = {
  displayName: '',
  email: '',
  uid: '',
  languages: [
    {
      name: "english",
      categories: [
        {
          name: "dummy",
          words: [],
          icon: ":dummy-icon:",
        },
        {
          name: "food & drinks",
          words: [],
          icon: ":fork-icon:",
        },
        {
          name: "dating",
          words: [],
          icon: ":heart-icon:",
        },
      ],
    },
  ],
};

export const word: Word = {
  id: "chje0239ef8hn",
  original: "שלום",
  translated: ["hello", "goodbye", "peace"],
  phonetic: "shalom",
  media: "https://www.onlinestorage.com",
  category: "general",
  lastModified: "2024-05-09T13:01:31.092Z",
};



type User = {
  displayName: string,
  email: string,
  uid: string,
  languages: Language[]
}
type Language = {
  name: string,
  categories: Category[]
}
type Category = {
  name: string,
  words: string[],
  icon: string | null,
}
type Word = {
  id: string,
  original: string,
  translated: string[],
  phonetic: string,
  media?: string,
  category?: string,
  lastModified: string,


}
