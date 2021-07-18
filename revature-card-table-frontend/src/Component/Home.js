import WelcomeDisplay from "./WelcomeDisplay";
import WelcomeDisplay1 from "./WelcomeDisplay1";
export default function Home({ isLoggedIn, token }) {
  return (
    <div id="page-layout" class="container-xxl" style={{paddingTop:"80px"}}>
      <WelcomeDisplay />
      <WelcomeDisplay1 />
    </div>
  );
}
