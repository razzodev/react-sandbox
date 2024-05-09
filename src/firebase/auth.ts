import { app } from "../firebase";
import { useAuthStore } from "../store/authStore";
import {

  GoogleAuthProvider, setPersistence,
  signInWithPopup, browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Auth } from "firebase/auth";
export const auth = getAuth(app);

export const handleSigninClicked = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
  setPersistence(auth, browserLocalPersistence);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  try {
    //TO SWITCH TO REDIRECT - USE THIS INSTEAD: 
    // await signInWithRedirect(auth, provider);
    // const result = await getRedirectResult(auth);

    const result = await signInWithPopup(auth, provider);
    if (result) {
      useAuthStore.getState().signIn(result['user']);
    }
    return;
  } catch (err: any) {
    const errorResult = {
      code: err['code'],
      message: err['message'],
      description: ''
    }

    switch (errorResult.code) {
      case "auth/operation-not-allowed":
        errorResult.description = "Email/password accounts are not enabled.";
        break;
      case "auth/operation-not-supported-in-this-environment":
        errorResult.description = "HTTP protocol is not supported. Please use HTTPS.";
        break;
      case "auth/popup-blocked":
        errorResult.description = "Popup has been blocked by the browser. Please allow popups for this website.";
        break;
      case "auth/popup-closed-by-user":
        errorResult.description = "Popup has been closed by the user before finalizing the operation. Please try again.";
        break;
      default:
        errorResult.description = errorResult.message;
        break;
    }
    return errorResult
  }
};

export function isUserLoggedIn(): void {
  const auth: Auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      useAuthStore.getState().signIn(user);
    } else {
      useAuthStore.getState().signOut();
    }
  });
}

export const signOutUser = async (): Promise<void> => {
  await signOut(auth);
  useAuthStore.getState().signOut();
  return
}