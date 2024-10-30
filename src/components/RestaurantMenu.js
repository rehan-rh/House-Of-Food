import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../Config";
import Shimmer from "./Shimmer";

const RestaurentMenu = () => {
  const { resId } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    try {
      const data = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`
      );
      const json = await data.json();
      setRestaurant(json?.data?.cards?.[2]?.card?.card?.info || {});

      setMenu(
        Object.values(json?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || {})
          .flatMap((card) => card?.card?.card?.itemCards || [])
      );
    } catch (error) {
      console.error("Error fetching restaurant info:", error);
    }
  }

  if (!menu) {
    return <Shimmer />;
  }

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full md:w-3/4 lg:w-1/2">
        <h1 className="text-xl font-bold mb-2">Restaurant Id: {resId}</h1>
        <h2 className="text-2xl font-semibold">{restaurant.name}</h2>
        <img
          src={IMG_CDN_URL + restaurant.cloudinaryImageId}
          alt="Restaurant"
          className="w-full h-64 object-cover rounded-lg my-4"
        />
        <div className="text-gray-700">
          <h3 className="text-lg">{restaurant.areaName}</h3>
          <h3>{restaurant.city}</h3>
          <h3>Rating: {restaurant.avgRating}</h3>
          <h3>Cost for Two: {restaurant.costForTwo}</h3>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-3/4 lg:w-1/2">
        <h1 className="text-2xl font-bold mb-4">Menu</h1>
        <ul className="space-y-2">
          {menu.map((item, index) => (
            <li key={`${item?.card?.info?.id}-${index}`} className="text-gray-800">
              {item?.card?.info?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurentMenu;
