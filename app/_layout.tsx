import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

import { useColorScheme } from '@/hooks/useColorScheme';

import Store from "@/assets/context/store"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    DancingScript: require('@/assets/fonts/DancingScript-Regular.ttf'),
    Inconsolata: require('@/assets/fonts/Inconsolata-Regular.ttf'),
    Kanit: require('@/assets/fonts/Kanit-Regular.ttf'),
    KanitBold: require('@/assets/fonts/Kanit-Bold.ttf'),
    OpenSans: require('@/assets/fonts/OpenSans-Regular.ttf'),
    JosefinSans: require('@/assets/fonts/JosefinSans-Regular.ttf'),
    PlaywriteUSTrad: require('@/assets/fonts/PlaywriteUSTrad-Regular.ttf'),
    Georgia: require('@/assets/fonts/PTSerif-Regular.ttf'),
    GeorgiaItalic: require('@/assets/fonts/PTSerif-Italic.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider  store={Store}>
        <Stack screenOptions={{ headerShown: false, headerBackTitle: "Back",   }} initialRouteName="index" >
          <Stack.Screen name="index"                options={{ headerShown: false, }} />
          <Stack.Screen name="register"             options={{ headerShown: true, title: "Register",  }} />
          <Stack.Screen name="forgetpassword"       options={{ headerShown: true, title: "Forget password",  }} />
          <Stack.Screen name="(tabsPastQuestions)"  options={{ headerShown: false, }} />
          <Stack.Screen name="(drawer)"             options={{ headerShown: false,  }} /> 
          <Stack.Screen name="login"                options={{ headerShown: false, title: "Login",  }} />
          <Stack.Screen name="deviceid"             options={{ headerShown: true, title: "Check Device ID",  }} />
          <Stack.Screen name="addreferralcode"      options={{ headerShown: true, title: "",  }} />
          <Stack.Screen name="resendverification"      options={{ headerShown: true, title: "Resend verification email",  }} />
          {/* <Stack.Screen name="profile"      options={{ headerShown: true, title: "Profile",  }} /> */}
          <Stack.Screen name="+not-found" />
        </Stack>
      </Provider>
    </ThemeProvider>
  );
}
