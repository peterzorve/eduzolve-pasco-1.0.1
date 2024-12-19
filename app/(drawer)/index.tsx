// src/app/login.js
import React, { useState, useEffect } from 'react';
import * as ScreenCapture from 'expo-screen-capture';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Linking, ImageBackground, Platform, Image, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import useInactivityLogout from '@/components/useInactivityLogout';
import { Ionicons } from '@expo/vector-icons';
import { addDoc, collection, doc, setDoc, getDoc, updateDoc, onSnapshot, orderBy, query, serverTimestamp,} from "firebase/firestore";
import { dbSTUDENTS, authSTUDENTS, dbTEACHERS, authTEACHERS } from '@/firebaseconfig';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useDispatch } from "react-redux"; 
import { useSelector } from "react-redux";
import { SET_USER } from "@/assets/context/actions/userActions";
import AsyncStorage from '@react-native-async-storage/async-storage'

import { usePreventScreenCapture } from 'expo-screen-capture';
import { enableSecureView } from 'react-native-prevent-screenshot-ios-android';

const PastQuestionScreen = () => {
  const router = useRouter();
  const {height}   = useWindowDimensions()
  const colorScheme = useColorScheme();
  const dispatch   = useDispatch()
  useInactivityLogout(30);

  const user = useSelector((state) => state.user.user); 

  const subscriptionStatus = useSelector((state) => state.subscription.status);
  const active = subscriptionStatus?.entitlements?.active?.["pro"]?.isActive ?   true : false
  const expirationDateMillis = subscriptionStatus?.entitlements?.active?.["pro"]?.expirationDateMillis
  const originalPurchaseDateMillis = subscriptionStatus?.entitlements?.active?.["pro"]?.originalPurchaseDateMillis









  const updateReferralStatus = async () => {
    try {

      await updateDoc(doc( dbSTUDENTS, "eduzolve-users",  user?._id), {"hasReferralCode": false});
      const updatedData = await getDoc(doc(dbSTUDENTS, "eduzolve-users",  user?._id));
      dispatch(SET_USER(updatedData.data()));
      try {
        const jsonValue = JSON.stringify(updatedData.data());
        AsyncStorage.setItem('eduzolveReportUsersLocalStorage', jsonValue);
      } catch (error) {
  
      }
    } catch (error) {

    }
  }


  usePreventScreenCapture();
  const ScreenshotPrevention = () => {
    if (Platform.OS === 'ios') {
      enableSecureView();
    }
  };
  useEffect(() => {
    ScreenshotPrevention()
  }, []);



  useEffect(  () => {  
   if ( user?.hasReferralCode && user?.dateRegister) {
    const timeNow = Date.now()
     const registeredDate = parseInt(user?.dateRegister, 10); 
     const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000;
     const fiveMinutesInMillis = 5 * 60 * 1000; 
     const expiryDate = registeredDate + sevenDaysInMillis;


    if (Date.now() > expiryDate) {
      updateReferralStatus();
    } else {
      const differenceInMillis = Math.abs(expiryDate - timeNow);
      const seconds = Math.floor(differenceInMillis / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      const remainingMinutes = minutes % 60;
      const remainingSeconds = seconds % 60;

    }
   }
  }, [ user?.dateRegister, user?.hasReferralCode ]); 






  return (
    // <ImageBackground source={require('@/assets/images/background/background3.jpg')} style={styles.backgroundImage} >

            

    <View style={{ flex: 1,    alignSelf: "center",     width: "100%",  }}>

      <ScrollView style={{   width: "100%",  alignSelf: "center"   }} >
        
        {/* <View style={{}}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText style={{}} type="subtitle">{ "Core subjects" }!</ThemedText>
            <HelloWave />
          </ThemedView>
        </View> */}



        <View style={{ width: "90%", alignSelf: "center", marginVertical: 10 }}>
            <View  style={{ flexDirection: 'row', padding: 5, alignSelf: "center",  borderRadius: 10 }} >
              <View style={{ flex: 1 }} >
                {/* <Text style={{ paddingLeft: 5, fontSize: 18,  marginBottom: 3, color: "black", fontFamily: "Kanit" }}></Text> */}
              </View>
              <View style={{ flex: 1, justifyContent: "center", }} >
                  <Text style={{fontFamily: "Kanit", textDecorationLine: "underline", marginBottom: 10,  fontSize: 18, color: colorScheme === "dark" ? "white" : "black" }} >
                    Note 
                  </Text>
              </View>
              
              <TouchableOpacity disabled={active} onPress={() => { router.push('/payment') }} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10, marginHorizontal: 3,  backgroundColor: active ? "green" : "red", padding: 3 }}>
                <Ionicons name={active ? 'lock-open' : 'lock-closed'}  size={24} color="white" style={{ }}/>
                <Text style={{   fontFamily: "Kanit", fontSize: 8,  paddingHorizontal: 3, color:"white" }}>{ active ? "Active" : "Inactive"}{"\n"}Subscription</Text> 
              </TouchableOpacity>
          </View>
              {/* <Text style={{fontFamily: "Kanit", textDecorationLine: "underline", marginBottom: 10, textAlign: "center", fontSize: 18, color: colorScheme === "dark" ? "white" : "black" }} >
                Note 
              </Text> */}
              <Text style={{fontFamily: "Kanit",  textAlign: "center", fontSize: 14, color: colorScheme === "dark" ? "white" : "black" }} >
                We have covered the core subjects and there are more on the way. Soon, all the WEAC exam subjects will be available!
              </Text>
              <Text style={{fontFamily: "Kanit", marginVertical: 12, textAlign: "center", fontSize: 16, color: colorScheme === "dark" ? "white" : "black" }} >
                Good luck with your studies!   
              </Text>
              <Text style={{fontFamily: "Kanit", marginBottom: 10, textAlign: "center", fontSize: 20, color: colorScheme === "dark" ? "white" : "black" }} >
                Subjects 
              </Text>
          </View>

        <View style={{ alignSelf: "center", flexDirection: "row", marginBottom: 10, width: "95%", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
          <EachSubject image={ require("@/assets/images/subjects-logo/english.png") } subjectName={"English Language"}    shortName={"ENGLISHLANGUAGE"}/>    
          <EachSubject image={ require("@/assets/images/subjects-logo/science.png") } subjectName={"Integrated Science"}  shortName={"INTEGRATEDSCIENCE"}/>
          {/* <EachSubject image={ require("@/assets/images/subjects-logo/social.png") }  subjectName={"Social Studies"}      shortName={"SOCIAL"}/> */}
          {/* <EachSubject image={ require("@/assets/images/subjects-logo/maths.png") }   subjectName={"Core Mathematics"}    shortName={"COREMATHEMATICS"}/> */}
        </View>

        <View style={{ alignSelf: "center", flexDirection: "row", marginBottom: 10, width: "95%", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
          {/* <EachSubject image={ require("@/assets/images/subjects-logo/english.png") } subjectName={"English Language"}    shortName={"ENGLISH"}/>     */}
          {/* <EachSubject image={ require("@/assets/images/subjects-logo/science.png") } subjectName={"Integrated Science"}  shortName={"SCIENCE"}/> */}
          <EachSubject image={ require("@/assets/images/subjects-logo/social.png") }  subjectName={"Social Studies"}      shortName={"SOCIALSTUDIES"}/>
          <EachSubject image={ require("@/assets/images/subjects-logo/maths.png") }   subjectName={"Core Mathematics"}    shortName={"COREMATHEMATICS"}/>
        </View>

        {active ? (
          <>
            <View style={{ alignSelf: "center", flexDirection: "row", marginBottom: 10, width: "95%", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
              {/* <EachSubject image={ require("@/assets/images/subjects-logo/english.png") } subjectName={"English Language"}    shortName={"ENGLISH"}/>     */}
              {/* <EachSubject image={ require("@/assets/images/subjects-logo/science.png") } subjectName={"Integrated Science"}  shortName={"SCIENCE"}/> */}
              {/* <EachSubject image={ require("@/assets/images/subjects-logo/social.png") }  subjectName={"Social Studies"}      shortName={"SOCIALSTUDIES"}/> */}
              {/* <EachSubject image={ require("@/assets/images/subjects-logo/maths.png") }   subjectName={"Core Mathematics"}    shortName={"COREMATHEMATICS"}/> */}
            </View>
            <View style={{ width: "90%", alignSelf: "center", marginVertical: 10 }}>
                {/* <Text style={{fontFamily: "Kanit",  textAlign: "center", fontSize: 24, color: colorScheme === "dark" ? "white" : "green" }} >
                  ACTIVE SUBSCRIPTION 
                </Text> */}
                <Text style={{fontFamily: "Kanit",  textAlign: "center", fontSize: 12, color: colorScheme === "dark" ? "white" : "green" }} >
                  Update will be available here
                </Text>
            </View>
          </>
        ) : (
          <View style={{ width: "90%", alignSelf: "center", marginVertical: 10 }}>
            {/* <Text style={{fontFamily: "Kanit",  textAlign: "center", fontSize: 24, color: colorScheme === "dark" ? "white" : "red" }} >
              UNSUBSCRIPTION INACTIVE
            </Text> */}
            <Text style={{fontFamily: "Kanit",  textAlign: "center", fontSize: 12, color: colorScheme === "dark" ? "white" : "red" }} >
              You will not be able to see other subjects when they become available unless you have an active subscription
            </Text>
        </View>
        )}

        {/* <View style={{ width: "90%", alignSelf: "center", marginVertical: 10 }}>
              <Text style={{fontFamily: "Kanit",  textAlign: "center", fontSize: 10, color: colorScheme === "dark" ? "white" : "black" }} >
              * We’re committed to improving future updates by reducing and eliminating any errors for a seamless experience.
              </Text>
          </View> */}



    </ScrollView>
          <View style={{alignSelf: "center", margin: 30, padding: 5, position: "absolute", bottom: 0 }}>
       
          <Text style={{fontFamily: "Kanit",  textAlign: "center", fontSize: 10, color: colorScheme === "dark" ? "white" : "black" }} >
              * We’re committed to improving future updates by reducing and eliminating any errors for a seamless experience.
              </Text>
           
            </View>          
</View>

// </ImageBackground>
  );
};






const EachSubject = ({ image, subjectName, shortName }) => {
    const router = useRouter();
    const subjectInfoObj = {subjectName: subjectName, shortName: shortName}
    return (
        <TouchableOpacity onPress={() => { 
            // router.push('/(tabs)') 

            router.push({ pathname: '/(tabsPastQuestions)', params: { subjectInfoObj: JSON.stringify(subjectInfoObj) }, });
            
            }} style={{ flex: 1, backgroundColor: "#FD871C", alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 4, margin: 3, borderRadius: 10 }} >
            <View style={{ width: 70, height: 70, borderRadius: 20, borderColor: '#388e3c', paddingVertical: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}>
                <Image source={image} style={{ width: '100%', height: '100%', borderRadius: 50 }} resizeMode="cover" />
            </View>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 16, color: 'black', padding: 5, textAlign: "center", fontFamily: "Kanit" }}>{ subjectName }</Text>
            </View>
        </TouchableOpacity>
    );
  };




const styles = StyleSheet.create({
  root: {
    alignItems: "center", 
    padding: 20, 
    marginBottom: 100
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: 3,
    marginVertical: 3
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    width: "80%",
    alignSelf: "center",
    padding: 5,
    margin: 10
  },
  input: {
    flex: 1,
    
  },
  icon: {
    marginRight: 10,
  },
  logo: {
    width: "80%", 
    maxWidth: 500, 
    maxHeight:200,
    marginTop: 40, 
    marginBottom: 50,
    alignSelf: "center",
    backgroundColor: "white",
    padding: 20,
    borderWidth: 0.2, 
    borderRadius: 20

  },


});

export default PastQuestionScreen;
