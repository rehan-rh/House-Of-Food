import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FoodItem from './FoodItem';
import { clearCart } from '../utils/cartSlice';

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);

    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    return (
        <div>
            <h1 className="font-bold">Cart Items - {cartItems.length}</h1>
            <button 
            className="bg-green-200 p-2 m-2"
            onClick={()=>{handleClearCart()}}
            >Clear cart</button>
            <div className="flex flex-wrap">
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <FoodItem 
                            key={item.card.info.id || index} // Using item.card.info.id
                            item={item}  // Passing the entire item object
                        />
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Cart;
