import { createContext, useContext, useState, useEffect } from "react";
import { getGuestId } from "../utils/guest"; // ✅ ADD

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const guestId = getGuestId(); // ✅ ADD

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem(`cart_${guestId}`);
    };

    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem(`cart_${guestId}`);
        return saved ? JSON.parse(saved) : [];
    });

    // localStorage sync
    useEffect(() => {
        localStorage.setItem(`cart_${guestId}`, JSON.stringify(cartItems));
    }, [cartItems, guestId]);

    // ADD TO CART
    const addToCart = (product) => {
        setCartItems(prev => {
            const exists = prev.find(item => item.id === product.id);

            if (exists) {
                return prev.map(item =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + product.quantity
                        }
                        : item
                );
            }

            return [
                ...prev,
                {
                    ...product,
                    quantity: product.quantity
                }
            ];
        });
    };


    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, type) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity: type === "inc"
                            ? item.quantity + 1
                            : Math.max(1, item.quantity - 1)
                    }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            guestId, // ✅ expose guestId
            clearCart, // ✅ ADD
        }}>
            {children}
        </CartContext.Provider>
    );
};


export const useCart = () => useContext(CartContext);
