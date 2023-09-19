import PropTypes from "prop-types";
//What is useLocation for?
//It is used to get the current location.
import { useLocation } from "react-router-dom"; // { useLocation } is a hook
import Button from "./Button";

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {/* if location.pathname is equal to "/", then (&&) show the button */}
      {location.pathname === "/" && (
        <Button
          color={showAdd ? "red" : "green"}
          text={showAdd ? "Close" : "Add"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

/* 
const ParentComponent = (props) => {
  const someText = 'FooBar';
  return(
    <SecondComponent content={someText}/>
    <ThirdComponent content={someText}/>
  )
}
*/

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

//CSS in JS
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black'
// }

export default Header;
