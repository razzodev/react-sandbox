import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { useContentStore } from "./store/contentStore";
import { auth, handleSigninClicked, isUserLoggedIn } from "./firebase/auth";
import { readData, addData, readUserData } from "./firebase/firestore";
import { user } from "./model";
import "./App.css";

function App() {
  const uid = useAuthStore((state) => state.uid);
  const user = useAuthStore((state) => state.user);
  const email = useAuthStore((state) => state.email);
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  const setEmail = useAuthStore((state) => state.setEmail);
  const setUserData = useContentStore((state) => state.setUserData);
  useEffect(() => {
    isUserLoggedIn();
  }, []);
  useEffect(() => {
    uid && readUserData(uid).then((r) => setUserData(r));
  }, [uid]);

  const handleAddData = async () => {
    let payload = {
      displayName: user.displayName,
      email: email,
      uid: uid,
      languages: [
        {
          name: "english",
          categories: [
            {
              name: "general",
              words: [],
              icon: ":general-icon:",
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
    await addData("users", uid, payload);
  };
  return (
    <>
      <h1>User {email}</h1>
      {isAuth && <h3>UID: {uid}</h3>}
      <button onClick={handleSigninClicked}>Signin</button>
      <button onClick={handleAddData}>add data</button>
    </>
  );
}

export default App;
