import { Footer, NavBar } from "../components/componentsindex";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => (
  <div>
    <NavBar/>
    <Component {...pageProps} />
    <Footer/>
  </div>
);

export default MyApp;