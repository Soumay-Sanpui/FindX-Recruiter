import { validateNotificationData } from './notificationService.js';

// Store original fetch globally to avoid circular dependencies
let originalFetch = null;

/**
 * Mock fetch interceptor for development
 * This intercepts API calls and handles them locally
 */
export const setupMockAPI = () => {
  // Store original fetch only once
  if (!originalFetch) {
    originalFetch = window.fetch.bind(window);
  }

  // Override fetch for specific endpoints
  window.fetch = async (url, options = {}) => {
    // Only intercept our specific broadcast API endpoint
    if (typeof url === 'string' && url.includes('/api/broadcast-notification')) {
      console.log('🎯 Intercepted broadcast API call:', { url, options });
      
      try {
        const requestData = options.body ? JSON.parse(options.body) : {};
        const result = await handleBroadcastRequestWithOriginalFetch(requestData);
        
        // Simulate API response
        return new Response(JSON.stringify(result), {
          status: result.success ? 200 : 400,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Mock API error:', error);
        return new Response(JSON.stringify({
          success: false,
          message: 'Internal server error',
          error: error.message
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    }

    // For all other requests (including Expo push service), use original fetch
    return originalFetch(url, options);
  };

  console.log('🔧 Mock API setup complete - broadcast notifications will be handled locally');
};

/**
 * Handle broadcast request using original fetch for external API calls
 */
const handleBroadcastRequestWithOriginalFetch = async (requestData) => {
  try {
    // Validate the notification data
    const validation = validateNotificationData(requestData);
    
    if (!validation.isValid) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      };
    }

    // Send directly to Expo push service using original fetch
    const tokens = ['ExponentPushToken[moZkJ7JQCG52eRNIs2QLAP]']; // Your test token
    
    const messages = tokens.map(token => ({
      to: token,
      sound: 'default',
      title: requestData.title,
      body: requestData.body,
      data: {
        ...requestData.data,
        broadcast_id: `broadcast_${Date.now()}`,
        sent_from: 'employer_dashboard'
      },
      priority: 'high',
      badge: 1
    }));

    console.log('📱 Sending to Expo push service:', messages);

    const response = await originalFetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages),
    });

    if (!response.ok) {
      throw new Error(`Expo API error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Expo push service response:', result);

    // Check for any errors in the response
    const hasErrors = result.some(res => res.status === 'error');
    if (hasErrors) {
      console.error('❌ Some notifications failed:', result.filter(res => res.status === 'error'));
    }

    return {
      success: true,
      message: 'Broadcast sent successfully',
      sentCount: tokens.length,
      results: result
    };

  } catch (error) {
    console.error('💥 Broadcast API error:', error);
    return {
      success: false,
      message: error.message || 'Failed to send broadcast',
      error: error.toString()
    };
  }
};

/**
 * Restore original fetch function
 */
export const teardownMockAPI = () => {
  // This would restore the original fetch if needed
  console.log('Mock API teardown');
}; 