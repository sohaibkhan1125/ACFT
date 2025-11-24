/**
 * API Service for HomePage Contact Management
 * Handles communication with backend API endpoints
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

export const saveHomepageContent = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/save-homepage-content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API save error:', error);
    throw error;
  }
};

export const getHomepageContent = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/get-homepage-content`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API get error:', error);
    throw error;
  }
};

export default {
  saveHomepageContent,
  getHomepageContent
};
