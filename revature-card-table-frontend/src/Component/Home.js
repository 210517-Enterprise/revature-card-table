import { Carousel, Tab } from "react-bootstrap";

import WelcomeDisplay from "./WelcomeDisplay";
import WelcomeDisplay1 from "./WelcomeDisplay1";
export default function Home({ isLoggedIn, token }) {
  return (
    <div id="page-layout" class="container-xxl">
      <WelcomeDisplay />
      <WelcomeDisplay1 />
    </div>
  );
}
