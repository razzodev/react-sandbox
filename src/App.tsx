import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { useContentStore } from "./store/contentStore";
import { handleSigninClicked, isUserLoggedIn, signOutUser } from "./firebase/auth";
import { addData, readUserData } from "./firebase/firestore";
import "./App.css";

function App() {
  const uid = useAuthStore((state) => state.uid);
  const user = useAuthStore((state) => state.user);
  const email = useAuthStore((state) => state.email);
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  const setUserData = useContentStore((state) => state.setUserData);


  useEffect(() => {
    isUserLoggedIn();
  }, []);
  useEffect(() => {
    if (uid) {
      readUserData(uid).then((r) => setUserData(r));
    }
  }, [uid]);

  const handleAddData = async () => {
    let payload = {
      displayName: user?.displayName,
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
    uid && await addData("users", uid, payload);
  };
  const handleSignOut = async () => {
    await signOutUser()
  }
  return (
    <>
      <h1>User {email}</h1>
      {isAuth && <h3>UID: {uid}</h3>}
      <section>

        <button onClick={handleSigninClicked}>Sign in</button>
        <button onClick={handleAddData}>add data</button>
        <button onClick={handleSignOut}>sign out</button>
      </section>

    </>
  );
}

export default App;
