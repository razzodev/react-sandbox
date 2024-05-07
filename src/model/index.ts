export const user:User = {
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

export const word = {
  id: "chje0239ef8hn",
  original: "שלום",
  translated: ["hello", "goodbye", "peace"],
  phonetic: "shalom",
  media: "https://www.onlinestorage.com",
  category: "general",
  lastModified: "2024-05-03:18",
};


type Category {
  name:string,
  words:string[],
  icon:string|null,
}

type Language {
  name:string,
  categories:Category[]
}

type User {
  displayName:string,
  email:string,
  uid:string,
  languages:Language[]
}