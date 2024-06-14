import React from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import { HeroSection } from "../component/componentindex";

const Home = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
    </div>
  );
};

export default Home;