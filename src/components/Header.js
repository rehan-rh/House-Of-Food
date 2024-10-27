import { useState } from "react";
import Logo from "../assets/img/food_villa.jpg";
import { Link } from "react-router-dom";
const LoggedInUser = () => {
  return true;
};

const Title = () => {
  return (
    <Link to="/">
      <img
        className="h-24"
        alt="logo"
        src={Logo}
      />
    </Link>
  );
};
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className="flex justify-between bg-cyan-300">
      <Title />
      <div className="flex ">
        <ul className="flex p-3 justify-between">
          <Link to="/" className="p-3">
            <li>Home</li>
          </Link>
          <Link to="/about" className="p-3">
            <li>About</li>
          </Link>
          <Link to="/contact" className="p-3">
            <li>Contact</li>
          </Link>
          <li className="p-3">Carts</li>
        </ul>
      </div> 
      {isLoggedIn ? (
        <button onClick={() => setIsLoggedIn(false)}>Log in</button>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Log Out</button>
      )}
    </div>
  );
};
export default Header;
