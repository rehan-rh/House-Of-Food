import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../Config";
import Shimmer from "./Shimmer";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const [restaurant, setRestaurant] = useState({});
  const [menu, setMenu] = useState([]);

  const dispatch = useDispatch();

  const addFoodItem = (item) => {
    dispatch(addItem(item));
  };

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
        Object.values(
          json?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
            {}
        ).flatMap((card) => card?.card?.card?.itemCards || [])
      );
    } catch (error) {
      console.error("Error fetching restaurant info:", error);
    }
  }

  if (!menu) {
    return <Shimmer />;
  }

  return (
    <div className="pt-24 flex flex-col md:flex-row gap-8 p-4">
      <div className="w-full md:w-1/3 bg-white p-4 shadow rounded-lg">
        <h1 className="text-xl font-bold mb-2">Restaurant Id: {resId}</h1>
        <h2 className="text-lg font-semibold">{restaurant.name}</h2>
        <img
          src={IMG_CDN_URL + restaurant.cloudinaryImageId}
          alt="Restaurant"
          className="my-4 w-full rounded-lg"
        />
        <p>{restaurant.areaName}</p>
        <p>{restaurant.city}</p>
        <p>Rating: {restaurant.avgRating}</p>
        <p>Cost for Two: {restaurant.costForTwo}</p>
      </div>

      <div className="w-full md:w-2/3 bg-white p-4 shadow rounded-lg">
        <h1 className="text-xl font-bold">Menu</h1>

        <ul className="list-disc ml-5">
          {menu.map((item, index) => (
            <li key={`${item?.card?.info?.id}-${index}`} className="my-2">
              {item?.card?.info?.name}-
              <button
                className="p-2 m-2 bg-green-400 rounded-lg"
                onClick={() => addFoodItem(item)}
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
