import { IMG_CDN_URL } from "../Config";

const FoodItem = ({ item }) => {
  // Access the properties directly from item.card.info
  const {
    category = "Category Unavailable",
    imageId = "",
    description = "No description available",
    price = 0  // Default price if not provided
  } = item.card.info || {};  // Destructuring item properties from card.info

  console.log("Item Info:", item.card.info);  // Debugging log to check item structure

  return (
    <div className="border-solid border-2 border-black-500 m-5 p-3 w-52 rounded-lg">
      {imageId && (
        <img 
          alt={category} 
          src={`${IMG_CDN_URL}${imageId}`} 
          className="w-full h-32 object-cover rounded-md mb-4" 
        />
      )}
      <h2 className="font-bold text-lg text-center mb-2">{category}</h2>
      <p className="text-sm text-gray-600 text-center mb-4">{description}</p>
      <p className="text-green-600 font-semibold text-lg">Price: ₹{(price / 100).toFixed(2)}</p>
    </div>
  );
};

export default FoodItem;
