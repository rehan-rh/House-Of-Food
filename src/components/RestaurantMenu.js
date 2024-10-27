import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMG_CDN_URL } from "../Config";
const RestaurentMenu = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {
    LoadResponse();
  }, []); // Add id as a dependency for when the URL changes

  async function LoadResponse() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=533773&catalog_qa=undefined&submitAction=ENTER`
    );
    const json = await data.json();
    // const cards = json?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
    // cards.shift();
    // cards.shift();
    console.log(json);
    setRestaurant(json?.data?.cards[2]?.card?.card?.info);
  }
  return (
    <div>
      <div>
        <h1>Restaurant Id: {id}</h1>
        <h2>{restaurant.text}</h2>
        <img src={IMG_CDN_URL + restaurant.cloudinaryImageId} />
        <h3>{restaurant.area}</h3>
        <h3>{restaurant.city}</h3>
        <h3>{restaurant.avgRating}stars</h3>costForTwoMessage
        <h3>{restaurant.costForTwoMessage}</h3>
      </div>
      <div>
        <h1>Menu</h1>
        {/* <div>{console.log(restaurant.menu.items)}</div> */}
      </div>
    </div>
  );
};
export default RestaurentMenu;
