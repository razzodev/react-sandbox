import { useEffect } from "react";
import { isUserLoggedIn } from "./firebase/auth";
import { SignInButtons, UserObject } from "./components";
import "./App.css";

function App() {


  useEffect(() => {
    isUserLoggedIn();
  }, []);



  return (
    <>
      <section>

        <SignInButtons />


      </section>
      <footer><UserObject /></footer>
    </>
  );
}

export default App;
