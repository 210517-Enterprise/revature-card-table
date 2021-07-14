export default function Home({isLoggedIn}) {
    return (
        isLoggedIn ? <h1>Logged In Main Screen!</h1> : <h1>Home Page Not Logged In!</h1>
    );
}