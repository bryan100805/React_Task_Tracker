//To stop url from reloading, use "Link" from react-router-dom
//Reason: "a" tag will reload the page
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h4>Version 1.0.0</h4>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default About;
