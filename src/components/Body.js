import { RestaurantList } from "../Config";
import Shimmer from "./Shimmer";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import UserContext from "../utils/UserContext";
const Body = () => {
  const [searchText, setSearchText] = useState([]);
  const [restaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const { user, setUser } = useContext(UserContext);


  function filterData(searchText, restaurants) {
    const filteredData = restaurants.filter((restaurant) =>
      restaurant?.info?.name?.toLowerCase()?.includes(searchText.toLowerCase())
    );
    return filteredData;
  }
  useEffect(() => {
    getRestaurants();
  }, []);
  console.log("render");
  async function getRestaurants() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.37240&lng=78.43780&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);
    setAllRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  }
  if (!restaurants) return null;
  return restaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="flex-wrap flex">
        <input
          type="text"
          className="p-1 m-4 border-solid border-gray-500 border-2 rounded-lg"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          
        />
        <button
          className="bg-green-300 p-2 m-4 rounded-lg"
          onClick={() => {
            const data = filterData(searchText, restaurants);
            setFilteredRestaurants(data);
          }}
        >
          Search
        </button>
        <input
          value={user.name}
          onChange={(e) => {
            setUser({
              ...user,
              name: e.target.value,
            });
          }}
        ></input>
        <input
          value={user.email}
          onChange={(e) => {
            setUser({
              ...user,
              email: e.target.value,
            });
          }}
        ></input>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurants.length === 0 ? (
          <h2>No Restaurants Found</h2>
        ) : (
          filteredRestaurants.map((restaurant) => {
            return (
              <RestaurantCard
                restaurant={restaurant}
                key={restaurant.info.id}
              />
            );
          })
        )}
      </div>
    </>
  );
};
export default Body;
