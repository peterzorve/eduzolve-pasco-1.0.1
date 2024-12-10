// src/app/login.js
import React, {  useEffect } from 'react';
import { View, } from 'react-native';
import { useRouter } from 'expo-router';
import Purchases, { PurchasesOffering} from "react-native-purchases";


const MentorScreen = () => {
  const router = useRouter();

  useEffect(() => { 
    try {
      Purchases.logOut();
    } catch {  
    }
    router.replace('/login');
  }, [router]);


  return (
    <View>
    </View>
  );
};






export default MentorScreen;
