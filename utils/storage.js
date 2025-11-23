import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER: '@user',
  TOKEN: '@token',
  CART: '@cart',
  ORDERS: '@orders',
  USERS_DB: '@users_db',
};

export const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
  } catch (e) {
    console.error('Save user error:', e);
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem(KEYS.USER);
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error('Get user error:', e);
    return null;
  }
};

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem(KEYS.TOKEN, token);
  } catch (e) {
    console.error('Save token error:', e);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(KEYS.TOKEN);
  } catch (e) {
    console.error('Get token error:', e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(KEYS.TOKEN);
  } catch (e) {
    console.error('Remove token error:', e);
  }
};

export const saveCart = async (cart) => {
  try {
    await AsyncStorage.setItem(KEYS.CART, JSON.stringify(cart));
  } catch (e) {
    console.error('Save cart error:', e);
  }
};

export const getCart = async () => {
  try {
    const cart = await AsyncStorage.getItem(KEYS.CART);
    return cart ? JSON.parse(cart) : [];
  } catch (e) {
    console.error('Get cart error:', e);
    return [];
  }
};

export const saveOrders = async (orders) => {
  try {
    await AsyncStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  } catch (e) {
    console.error('Save orders error:', e);
  }
};

export const getOrders = async () => {
  try {
    const orders = await AsyncStorage.getItem(KEYS.ORDERS);
    return orders ? JSON.parse(orders) : [];
  } catch (e) {
    console.error('Get orders error:', e);
    return [];
  }
};

export const saveUserToDb = async (userData) => {
  try {
    const usersDb = await getUsersDb();
    usersDb[userData.email] = userData;
    await AsyncStorage.setItem(KEYS.USERS_DB, JSON.stringify(usersDb));
  } catch (e) {
    console.error('Save user to DB error:', e);
  }
};

export const getUsersDb = async () => {
  try {
    const db = await AsyncStorage.getItem(KEYS.USERS_DB);
    return db ? JSON.parse(db) : {};
  } catch (e) {
    console.error('Get users DB error:', e);
    return {};
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.multiRemove([KEYS.USER, KEYS.TOKEN, KEYS.CART]);
  } catch (e) {
    console.error('Clear all error:', e);
  }
};