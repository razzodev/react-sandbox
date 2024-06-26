import { useAuthStore } from "../store/authStore";
import { handleSigninClicked, signOutUser } from "../features/auth/auth";

function SignInButtons() {
    const isAuth = useAuthStore(s => s.isAuthenticated);
    return (
        <>
            {isAuth ? <SignedIn /> : <LoggedOut />}
        </>);
}

function SignedIn() {
    const email = useAuthStore(s => s.email);
    const handleSignOut = async () => await signOutUser()
    return (<>
        <span>{email}</span>
        <button onClick={handleSignOut}>Sign out</button>
    </>)
}

function LoggedOut() {
    return (<>
        <button onClick={handleSigninClicked}>Sign in</button>
    </>)
}
export default SignInButtons;
