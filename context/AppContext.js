import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUser, getUser, saveToken, getToken, saveCart, getCart, saveOrders, getOrders, clearAll } from '../utils/storage';

export const AppContext = createContext();

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppData();
  }, []);

  const loadAppData = async () => {
    try {
      const savedUser = await getUser();
      const savedToken = await getToken();
      const savedCart = await getCart();
      const savedOrders = await getOrders();

      if (savedUser && savedToken) {
        setUser({ ...savedUser, token: savedToken });
      }
      if (savedCart) setCart(savedCart);
      if (savedOrders) setOrders(savedOrders);
    } catch (err) {
      console.log('Load app data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData, token) => {
    await saveUser(userData);
    await saveToken(token);
    setUser({ ...userData, token });
  };

  const logout = async () => {
    await clearAll();
    setUser(null);
    setCart([]);
  };

  const updateUser = async (updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      // Save to AsyncStorage (works with dummy data)
      await saveUser(updatedUser);
      
      // Update users_db for dummy authentication
      const usersDb = JSON.parse(await AsyncStorage.getItem('@users_db') || '{}');
      const oldEmail = user.email;
      
      if (usersDb[oldEmail]) {
        // If email changed, move the record
        if (updates.email && updates.email !== oldEmail) {
          usersDb[updates.email] = { ...usersDb[oldEmail], ...updates };
          delete usersDb[oldEmail];
        } else {
          usersDb[oldEmail] = { ...usersDb[oldEmail], ...updates };
        }
        await AsyncStorage.setItem('@users_db', JSON.stringify(usersDb));
      }
      
      return true;
    } catch (error) {
      console.error('Update user error:', error);
      return false;
    }
  };

  const addToCart = async (product) => {
    const exists = cart.find(item => item.productId === product.id);
    let newCart;
    
    if (exists) {
      newCart = cart.map(item =>
        item.productId === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    } else {
      newCart = [...cart, {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1
      }];
    }
    
    setCart(newCart);
    await saveCart(newCart);
  };

  const updateCartQty = async (productId, qty) => {
    if (qty <= 0) {
      await removeFromCart(productId);
      return;
    }
    
    const newCart = cart.map(item =>
      item.productId === productId ? { ...item, qty } : item
    );
    setCart(newCart);
    await saveCart(newCart);
  };

  const removeFromCart = async (productId) => {
    const newCart = cart.filter(item => item.productId !== productId);
    setCart(newCart);
    await saveCart(newCart);
  };

  const clearCart = async () => {
    setCart([]);
    await saveCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  };

  const addOrder = async (order) => {
    const newOrders = [order, ...orders];
    setOrders(newOrders);
    await saveOrders(newOrders);
  };

  // Wishlist functions
  const addToWishlist = async (product) => {
    try {
      const wishlist = JSON.parse(await AsyncStorage.getItem('@wishlist') || '[]');
      const exists = wishlist.find(item => item.id === product.id);
      
      if (!exists) {
        wishlist.push(product);
        await AsyncStorage.setItem('@wishlist', JSON.stringify(wishlist));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Add to wishlist error:', error);
      return false;
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const wishlist = JSON.parse(await AsyncStorage.getItem('@wishlist') || '[]');
      const updated = wishlist.filter(item => item.id !== productId);
      await AsyncStorage.setItem('@wishlist', JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Remove from wishlist error:', error);
      return false;
    }
  };

  // Address functions
  const addAddress = async (address) => {
    try {
      const addresses = JSON.parse(await AsyncStorage.getItem('@addresses') || '[]');
      const newAddress = { ...address, id: Date.now().toString() };
      addresses.push(newAddress);
      await AsyncStorage.setItem('@addresses', JSON.stringify(addresses));
      return true;
    } catch (error) {
      console.error('Add address error:', error);
      return false;
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const addresses = JSON.parse(await AsyncStorage.getItem('@addresses') || '[]');
      const updated = addresses.filter(a => a.id !== addressId);
      await AsyncStorage.setItem('@addresses', JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Delete address error:', error);
      return false;
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      cart,
      orders,
      loading,
      login,
      logout,
      updateUser,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      getCartTotal,
      addOrder,
      addToWishlist,
      removeFromWishlist,
      addAddress,
      deleteAddress,
    }}>
      {children}
    </AppContext.Provider>
  );
}