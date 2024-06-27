import "../styles/globals.css";
import { ZealMArketProvider } from "../Context/ZealMarketContext";
//INTRNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";

const MyApp = ({ Component, pageProps }) => (
  <div>
    <NavBar />
    <Component {...pageProps} />
    <Footer />
    <ZealMArketProvider/>
  </div>
);

export default MyApp;
