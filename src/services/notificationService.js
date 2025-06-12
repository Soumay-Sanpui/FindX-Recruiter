/**
 * Notification Service for sending push notifications to FindX mobile app users
 */

// Store for managing push tokens from mobile app users
let userPushTokens = new Set();

/**
 * Add a push token from a mobile app user
 * This would typically be called when users register their push tokens
 */
export const addUserPushToken = (token) => {
  userPushTokens.add(token);
  console.log('Added push token:', token);
};

/**
 * Remove a push token (e.g., when user logs out)
 */
export const removeUserPushToken = (token) => {
  userPushTokens.delete(token);
  console.log('Removed push token:', token);
};

/**
 * Get all registered push tokens
 */
export const getAllPushTokens = () => {
  return Array.from(userPushTokens);
};

/**
 * Send push notification to all registered mobile app users
 */
export const sendBroadcastNotification = async (notificationData) => {
  try {
    // For development, we'll use the direct Expo push service
    // In production, you should call your backend API
    
    const tokens = getAllPushTokens();
    
    if (tokens.length === 0) {
      // For testing purposes, add a sample token if none exist
      // Remove this in production
      console.warn('No push tokens registered. Using sample token for testing.');
      tokens.push('ExponentPushToken[moZkJ7JQCG52eRNIs2QLAP]'); // Your actual token from mobile app
    }

    const messages = tokens.map(token => ({
      to: token,
      sound: 'default',
      title: notificationData.title,
      body: notificationData.body,
      data: notificationData.data || {},
      priority: 'high',
      badge: 1
    }));

    console.log('Sending notifications to tokens:', tokens);
    console.log('Notification payload:', messages);

    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Push notification result:', result);

    // Check for any errors in the response
    const hasErrors = result.some(res => res.status === 'error');
    if (hasErrors) {
      console.error('Some notifications failed:', result.filter(res => res.status === 'error'));
    }

    return {
      success: true,
      sentCount: tokens.length,
      results: result,
      errors: result.filter(res => res.status === 'error')
    };

  } catch (error) {
    console.error('Error sending broadcast notification:', error);
    throw new Error(`Failed to send notification: ${error.message}`);
  }
};

/**
 * Send notification to specific users
 */
export const sendTargetedNotification = async (targetTokens, notificationData) => {
  try {
    const messages = targetTokens.map(token => ({
      to: token,
      sound: 'default',
      title: notificationData.title,
      body: notificationData.body,
      data: notificationData.data || {},
      priority: 'high',
      badge: 1
    }));

    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Targeted notification result:', result);

    return {
      success: true,
      sentCount: targetTokens.length,
      results: result
    };

  } catch (error) {
    console.error('Error sending targeted notification:', error);
    throw new Error(`Failed to send notification: ${error.message}`);
  }
};

/**
 * Validate notification data
 */
export const validateNotificationData = (data) => {
  const errors = [];

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.push('Title is required and must be a non-empty string');
  }

  if (!data.body || typeof data.body !== 'string' || data.body.trim().length === 0) {
    errors.push('Body is required and must be a non-empty string');
  }

  if (data.title && data.title.length > 100) {
    errors.push('Title must be 100 characters or less');
  }

  if (data.body && data.body.length > 300) {
    errors.push('Body must be 300 characters or less');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Get notification statistics
 */
export const getNotificationStats = () => {
  return {
    totalRegisteredUsers: userPushTokens.size,
    registeredTokens: Array.from(userPushTokens)
  };
};

// For development/testing - add sample tokens
// Remove this in production
if (process.env.NODE_ENV === 'development') {
  // This would be your actual push token from the mobile app
  addUserPushToken('ExponentPushToken[moZkJ7JQCG52eRNIs2QLAP]');
} 