// hooks/useInactivityLogout.js
import { useEffect, useRef, useState } from 'react';
import { AppState, PanResponder, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';

const useInactivityLogout = (timeoutDurationInMinutes = 30) => {
  const [appState, setAppState] = useState(AppState.currentState);
  const inactivityTimeout = useRef(null);
  const router = useRouter();

  const logOut = () => {
    router.push('/login');  // Replace with your logout logic
  };

  // Clear the inactivity timer
  const clearInactivityTimeout = () => {
    if (inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current);
    }
  };

  // Reset inactivity timer
  const resetInactivityTimeout = () => {
    clearInactivityTimeout();
    inactivityTimeout.current = setTimeout(logOut, timeoutDurationInMinutes * 60 * 1000);
  };

  // Set up global interaction listeners
  const setupInteractionListeners = () => {
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        resetInactivityTimeout();
        return false;
      },
    });

    // Use the new subscription pattern for Keyboard events
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', resetInactivityTimeout);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', resetInactivityTimeout);

    return { panResponder, keyboardDidShowListener, keyboardDidHideListener };
  };

  // Handle app state changes (background/foreground)
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        resetInactivityTimeout();
      }
      setAppState(nextAppState);
    };

    // Add app state change listener
    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    // Set up global interaction listeners
    const { panResponder, keyboardDidShowListener, keyboardDidHideListener } = setupInteractionListeners();

    return () => {
      // Properly remove app state listener using subscription method
      appStateSubscription.remove();
      // Properly remove keyboard listeners using the remove() method
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      // Clear timeout on unmount
      clearInactivityTimeout();
    };
  }, [appState]);

  useEffect(() => {
    resetInactivityTimeout();
    return () => {
      clearInactivityTimeout();
    };
  }, []);

  return null;
};

export default useInactivityLogout;

