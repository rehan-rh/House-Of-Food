import { useState } from "react";
import Logo from "../assets/img/food_villa.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const LoggedInUser = () => {
  return true;
};

const Title = () => {
  return (
    <Link to="/">
      <img data-testid="logo" className="h-24" alt="logo" src={Logo} />
    </Link>
  );
};
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
    <div className="flex justify-between items-center bg-cyan-300 h-24 shadow-md p-4 z-10">
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
          <Link to="/cart" className="p-3">
            <li data-testid="cart">Carts-{cartItems.length}</li>
          </Link>
          
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
