import { useEffect, useState } from "react";

const useRestaurant = (id)=>{
    const [restaurant, setRestaurant] = useState([]);
    useEffect(() => {
        LoadResponse();
      }, []);  // Add id as a dependency for when the URL changes
    
    async function LoadResponse() {
        const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=3241&catalog_qa=undefined&query=Biryani&submitAction=ENTER`);
        const json = await data.json();
        // cards.shift();
        // cards.shift();
        console.log(json);
        setRestaurant(json.data);
    }
    return restaurant;
}

export default useRestaurant;