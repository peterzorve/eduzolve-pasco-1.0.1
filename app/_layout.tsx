import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Image, StyleSheet, Platform, ScrollView, TouchableOpacity, Text, View, useWindowDimensions  } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

import { withPreventScreenshots } from 'react-native-prevent-screenshots';  

import { useColorScheme } from '@/hooks/useColorScheme';
import Constants from 'expo-constants';

import Purchases, { PurchasesOffering} from "react-native-purchases";

import Store from "@/assets/context/store"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() { 


  // export default function RootLayout() {
  
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


  useEffect(() => {
    if (Platform.OS === 'ios') {
        // Purchases.configure({ apiKey: "appl_dBSdjxTFtQgzyqDHejIQa321WENeIr",  appUserID: user?._id, });
        Purchases.configure({ apiKey: Constants?.expoConfig?.extra?.revenueCatIosApiKey });
    } else if (Platform.OS === 'android') {
        // Purchases.configure({ apiKey: "goog_HUKTRarPFGDpdkcqHECQKo123JBUNQ",  appUserID: user?._id, });
        Purchases.configure({ apiKey: Constants?.expoConfig?.extra?.revenueCatAndroidApiKey });
    }
  }, []);



  if (!loaded) {
    return null;
  }



  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider  store={Store}>
        <Stack screenOptions={{ headerShown: false, headerBackTitle: "Back",   }} initialRouteName="index" >
          <Stack.Screen name="index"                options={{ headerShown: false, }} />
          <Stack.Screen name="register"             options={{ headerShown: true, title: "",  }} />
          <Stack.Screen name="forgetpassword"       options={{ headerShown: true, title: "Forget password",  }} />
          <Stack.Screen name="(tabsPastQuestions)"  options={{ headerShown: false, }} />
          <Stack.Screen name="(drawer)"             options={{ headerShown: false,  }} /> 
          <Stack.Screen name="login"                options={{ headerShown: false, title: "Login",  }} />
          <Stack.Screen name="deleteaccount"        options={{ headerShown: true, title: "Delete Account",  }} />
          <Stack.Screen name="studyroom"            options={{ headerShown: true, title: "",  }} />
          <Stack.Screen name="addreferralcode"      options={{ headerShown: true, title: "",  }} />
          <Stack.Screen name="(tabsUniversities)"   options={{ headerShown: false, }} />
          <Stack.Screen name="resendverification"   options={{ headerShown: true, title: "Resend verification email",  }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </Provider>
    </ThemeProvider>
  );
}

// export default withPreventScreenshots(RootLayout);
