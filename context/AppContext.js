// src/context/AppContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getToken, saveToken, removeToken } from '../utils/storage';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await getToken();
      if (token) {
        setUser({ id: 'u123', name: 'John Doe', token });
      }
    } catch (err) {
      console.log('Auth check error:', err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData, token) => {
    await saveToken(token);
    setUser({ ...userData, token });
  };

  const logout = async () => {
    await removeToken();
    setUser(null);
    setCart([]);
  };

  const addToCart = (product) => {
    const exists = cart.find(item => item.productId === product.id);
    if (exists) {
      setCart(cart.map(item =>
        item.productId === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1
      }]);
    }
  };

  const updateCartQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.productId === productId ? { ...item, qty } : item
      ));
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  };

  return (
    <AppContext.Provider value={{
      user,
      cart,
      loading,
      login,
      logout,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      getCartTotal
    }}>
      {children}
    </AppContext.Provider>
  );
}