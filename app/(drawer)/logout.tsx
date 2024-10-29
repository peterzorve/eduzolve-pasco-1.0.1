// src/app/login.js
import React, {  useEffect } from 'react';
import { View, } from 'react-native';
import { useRouter } from 'expo-router';


const MentorScreen = () => {
  const router = useRouter();

  useEffect(() => { 
    router.replace('/login')
  }, [router]);


  return (
    <View>
    </View>
  );
};






export default MentorScreen;
