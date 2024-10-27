export function FilterBySearch(searchInput,restaurant){
    return restaurant.filter((restaurant)=>restaurant.card.card.info.name.toLowerCase().includes(searchInput.toLowerCase()));
}