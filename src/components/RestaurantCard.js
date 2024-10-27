import React, { useEffect, useState, useContext } from "react";
import { IMG_CDN_URL } from "../Config";
import UserContext from "../utils/UserContext";
const RestaurantCard = ({ restaurant }) => {
  const { name, cuisines, locality, avgRating, cloudinaryImageId } =
    restaurant.info;

  const {user} = useContext(UserContext);
  return (
    <div className="border-solid border-2 border-black-500 m-5 p-3 w-52 rounded-lg">
      <img alt={name} src={IMG_CDN_URL + cloudinaryImageId} />
      <h2>{name}</h2>
      <h3>{locality}</h3>
      <h3>{cuisines.join(", ")}</h3>
      <h4>{avgRating} Stars</h4>
      <h4 className="font-bold text-xl">
          {user.name}-{user.email}
        </h4>
    </div>
  );
};
export default RestaurantCard;