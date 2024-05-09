import { useEffect } from "react";
import { isUserLoggedIn } from "./features/auth/auth";
import { SignInButtons, UserObject } from "./components";
import "./App.css";

function App() {

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  return (
    <div className='app'>
        <SignInButtons />
      <br />
      <br />
        <UserObject />
    </div>
  );
}

export default App;
