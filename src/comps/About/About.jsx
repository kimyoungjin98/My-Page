import React from "react";
import "../../css/about.css";
import me from "../../img/벚꽃.jpg";
import AboutContent from "./AboutContent";

const About = () => {
  return (
    <div className="about_div" id="about">
      <img src={me} className="me" />
      <AboutContent />
    </div>
  );
};

export default About;
