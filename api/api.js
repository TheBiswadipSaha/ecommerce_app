import axios from 'axios';
import { API_BASE_URL, dummy_data } from '../config/constants';
import dummyData from './dummyData';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

const getDummy = (endpoint) => {
  const key = endpoint.split('?')[0];
  return dummyData[key] || null;
};

export const get = async (endpoint, options = {}) => {
  if (dummy_data) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const data = getDummy(endpoint);
    return { success: true, data };
  }

  try {
    const response = await api.get(endpoint, options);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('GET Error:', error);
    const fallback = getDummy(endpoint);
    if (fallback) {
      return { success: true, data: fallback };
    }
    return { success: false, error: error.message };
  }
};

export const post = async (endpoint, body = {}) => {
  if (dummy_data) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      data: { message: 'Success', ...body }
    };
  }

  try {
    const response = await api.post(endpoint, body);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('POST Error:', error);
    return { success: false, error: error.message };
  }
};

export const put = async (endpoint, body = {}) => {
  if (dummy_data) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, data: { message: 'Updated' } };
  }

  try {
    const response = await api.put(endpoint, body);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('PUT Error:', error);
    return { success: false, error: error.message };
  }
};

export const del = async (endpoint) => {
  if (dummy_data) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, data: { message: 'Deleted' } };
  }

  try {
    const response = await api.delete(endpoint);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('DELETE Error:', error);
    return { success: false, error: error.message };
  }
};