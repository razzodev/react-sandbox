import { app } from "../firebase";
import { useAuthStore } from "../store/authStore";
import {
  // signInWithRedirect,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  // inMemoryPersistence,
  setPersistence,
  browserLocalPersistence,
  getAuth,
  // getRedirectResult,
  onAuthStateChanged,
  // signOut
} from "firebase/auth";
import { Auth } from "firebase/auth";

export const auth = getAuth(app);

export const handleSigninClicked = async (e: any) => {
  e.preventDefault();
  setPersistence(auth, browserLocalPersistence);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

  try {
    // Sign in with a pop-up window
    const result = await signInWithRedirect(auth, provider);
    const user = result["user"];
    console.log(user);
    useAuthStore.getState().signIn(user);
    return;
  } catch (err: any) {
    // Handle errors here.
    const errorMessage = err.message;
    const errorCode = err.code;
    let detailedErrorMessage;
    // setError(true);

    switch (errorCode) {
      case "auth/operation-not-allowed":
        detailedErrorMessage = "Email/password accounts are not enabled.";
        break;
      case "auth/operation-not-supported-in-this-environment":
        detailedErrorMessage =
          "HTTP protocol is not supported. Please use HTTPS.";
        break;
      case "auth/popup-blocked":
        detailedErrorMessage =
          "Popup has been blocked by the browser. Please allow popups for this website.";
        break;
      case "auth/popup-closed-by-user":
        detailedErrorMessage =
          "Popup has been closed by the user before finalizing the operation. Please try again.";
        break;
      default:
        detailedErrorMessage = errorMessage;
        break;
    }
    return {
      errorMessage,
      errorCode,
      detailedErrorMessage,
    };
  }
};

export function isUserLoggedIn() {
  const auth:Auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      useAuthStore.getState().signIn(user);
    } else {
      useAuthStore.getState().signOut();
    }
  });
}
