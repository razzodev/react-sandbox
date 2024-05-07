import { useState, useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { useContentStore } from "./store/contentStore";
import { handleSigninClicked, isUserLoggedIn } from "./firebase/auth";
import { storageRef, getAudio } from "./firebase/storage";
import { addData, readUserData } from "./firebase/firestore";
import "./App.css";

function App() {
  const uid = useAuthStore((state) => state.uid);
  const user = useAuthStore((state) => state.user);
  const email = useAuthStore((state) => state.email);
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  const setUserData = useContentStore((state) => state.setUserData);
  const [audio, setAudio] = useState('');

  useEffect(() => {
    isUserLoggedIn();
  }, []);
  useEffect(() => {
    if (uid) {
      readUserData(uid).then((r) => setUserData(r));
      getAudio('seinfeld.mp3').then(url => setAudio(url))
    }
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
    uid && await addData("users", uid, payload);
  };
  return (
    <>
      <h1>User {email}</h1>
      {isAuth && <h3>UID: {uid}</h3>}
      <section>

        <button onClick={handleSigninClicked}>Signin</button>
        <button onClick={handleAddData}>add data</button>
      </section>
      <audio controls src={audio}></audio>
    </>
  );
}

export default App;
