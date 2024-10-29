// src/app/login.js
import React, { useState, useEffect, useRef,   } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, ImageBackground, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp  } from "react-native-reanimated"; 
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SET_USER } from "@/assets/context/actions/userActions";
import { useDispatch } from "react-redux"; 
import * as Device from 'expo-device'



import { appSTUDENTS, dbSTUDENTS, authSTUDENTS } from '@/firebaseconfig';
import { addDoc, collection, doc, setDoc, getDoc, getDocs, updateDoc   } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile  } from "firebase/auth";


const SplashScreen = () => {
  const router = useRouter();
  const {height}   = useWindowDimensions()
  const dispatch   = useDispatch()

  const deviceModelName = Device?.modelName
  const deviceOsInternalBuildId = Device?.osInternalBuildId
  const deviceSsVersion = Device?.osVersion

  

  // ==============================================================================================================================================================
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => { 
    setIsPasswordVisible(!isPasswordVisible); 
  };

  // ==============================================================================================================================================================
  const[digit1, setDigit1] = useState("");
  const[digit2, setDigit2] = useState("");
  const[digit3, setDigit3] = useState("");
  const[digit4, setDigit4] = useState("");
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);


  const [showIncorrectPasswordText, setShowIncorrectPasswordText] = useState(false);
  const [numberOfAtempts, setNumberOfAttempts] = useState(0)
  const MaxAttempts = 2;

    // ==============================================================================================================================================================
    const handleTextChange = (text, setDigit, nextInputRef) => {
        const formattedText = text.replace(/[^0-9]/g, '');
        setDigit(formattedText);
        if ( formattedText.length === 1) { nextInputRef.current.focus(); }
      };




      const [userDataSaved, setUserDataSaved] = useState({})




      const isUserDataSaved = async () => {
        try { 
          const retrievedData = await AsyncStorage.getItem('eduzolveReportUsersLocalStorage'); 
          
         
          if (retrievedData !== null) {  
              const saveData = JSON.parse(retrievedData) 
              if (  saveData?.shortPswd &&  saveData?.shortPswd?.length === 4 ) {
                setUserDataSaved(saveData);
                return true
              } else {
                return false 
              }
            } else {
              return false 
            }
        } catch (error) {
          return false 
        }
      }


      useEffect(  () => {  
        async function fetchPassWordSaved() {
         const _passWordSaved = await isUserDataSaved()
          if (_passWordSaved) {
            if (digit1 && digit2 && digit3 && digit4 ) {
              retrievedSavedData( digit1,  digit2, digit3, digit4)
            } 
          } else {
            router.replace('/login')
          }
        } 
        fetchPassWordSaved()
      }, [digit1, digit2, digit3, digit4,]); 






      const retrievedSavedData = async (digit1, digit2, digit3, digit4) => {             
        if ((digit1 === userDataSaved?.shortPswd[0]) && (digit2 === userDataSaved?.shortPswd[1]) && (digit3 === userDataSaved?.shortPswd[2]) && (digit4 === userDataSaved?.shortPswd[3])) {
        
          setDigit1(""); setDigit2(""); setDigit3(""); setDigit4(""); 
          let email = userDataSaved?.email;
          let password = userDataSaved?.localpswd
          try {
            const userCredential = await signInWithEmailAndPassword(authSTUDENTS, email, password)
            // const docSnap = await getDoc(doc(dbSTUDENTS, "eduzolvePastQuoClients", "profile",  "profile", userCredential?.user?.uid,)); 
            const docSnap = await getDoc(doc(dbSTUDENTS, "eduzolve-users", userCredential?.user?.uid,)); 
            if (docSnap.exists()) { 
              dispatch(SET_USER(docSnap.data()));
              // router.replace('/(drawer)') 
              
              // === Check the app version here ==================================================================
              let appVersionNumber = await getDoc(doc(dbSTUDENTS, "app-version", "app-version-number",)); 
              appVersionNumber = appVersionNumber?.data()?.versionNumber
              if (appVersionNumber) {
                if (appVersionNumber === "1.0.0") { 

                  const deviceInfo = docSnap?.data();
                  if ((deviceInfo?.deviceModelName === deviceModelName) && (deviceInfo?.deviceOsInternalBuildId === deviceOsInternalBuildId) && (deviceInfo?.deviceSsVersion === deviceSsVersion)) {
                    router.replace('/(drawer)') 
                  } else {
                    if (deviceInfo?.changeDevice) {
                      try {
                        await updateDoc(doc( dbSTUDENTS, "eduzolve-users",  deviceInfo?._id), {deviceModelName: deviceModelName, deviceOsInternalBuildId: deviceOsInternalBuildId, deviceSsVersion: deviceSsVersion, changeDevice: false})
                        router.replace('/(drawer)')
                      } catch (error) {
                        alert("Try again later. \nSomething went wrong")
                      }

                    } else {
                      alert("You're trying to log in from a different device. Please use the device you originally installed the app on. \nTo switch devices, contact support at peter.zorve@eduzolve.com");
                      
                    }                  
                  }
                } else {
                  alert("You need to update your app");
                  router.replace('/login')
                }
              } else {
                alert("Check your internet connection");
                router.replace('/login')
              }
              // ==================================================================================================

            }
          } catch (error) {
            router.replace('/login')
          }    
        } else {
            setDigit1(""); setDigit2(""); setDigit3(""); setDigit4("");  
            setNumberOfAttempts(numberOfAtempts + 1)
            if (numberOfAtempts < MaxAttempts) {
              setShowIncorrectPasswordText(true)
            }
            if (numberOfAtempts >= MaxAttempts) {
              router.replace('/login')
            }
        }
      };




  return (
    // <ImageBackground source={require('@/assets/images/background/background3.jpg')} style={{ flex: 1,  }} >



    <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={0} style={{   flex: 1, backgroundColor: 'rgb(255, 121, 0)',}} >
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'rgb(255, 121, 0)',}} >
        <View style={{}}>

            <View style={{backgroundColor: "green", }} >
                <View style={{backgroundColor: "white", }} >
                    <Image source={require("@/assets/images/splash/splash3.png")} style={[{ flex: 1, maxHeight:200, marginTop: 80,  alignSelf: "center", height: height * 0.17,  } ]} resizeMode='contain'/>
                    <Animated.View  entering={FadeInUp.delay(100).duration(1000).springify().damping(2)} style={{ marginBottom: 30,  width: "85%", alignSelf: "center"}}>
                        <Text style={{fontSize: 24, fontFamily: "Kanit"}} >EDUZOLVE PASTQUO </Text>
                        <Text style={{ fontFamily: "OpenSans", fontSize: 24}} >A collection of WAEC past questions and answers</Text>
                    </Animated.View>
                </View>
            </View>

            <View style={{backgroundColor: "white",  }} >
                <View style={{backgroundColor: "rgb(255, 121, 0)", borderTopLeftRadius: 60, borderTopRightRadius: 60,   }} >
                  <Animated.View entering={FadeInUp.delay(200).duration(1000)} style={{  width: "80%", alignSelf: "center", marginTop: 50,  borderRadius: 15}}>
                      <Text style={{ fontFamily: "Inconsolata", fontSize: 16,  color: "white" }} >Four-digit password</Text>
                    
                      <View style={{ flexDirection: 'row', alignSelf: "center", }}>
                          <View style={{  width: "24%", backgroundColor: "white", borderRadius: 10,   padding: 15, margin: 3}}>
                              <TextInput style={{ flex: 1, textAlign: "center",  }} maxLength={1} secureTextEntry={!isPasswordVisible}  value={digit1} keyboardType="numeric" ref={input1Ref} onChangeText={(text) => handleTextChange(text, setDigit1, input2Ref)}/>
                          </View>
                          <View style={{   width: "24%", backgroundColor: "white", borderRadius: 10,  padding: 15, margin: 3}}>
                              <TextInput style={{ flex: 1, textAlign: "center" }} maxLength={1} secureTextEntry={!isPasswordVisible}  value={digit2} keyboardType="numeric" ref={input2Ref} onChangeText={(text) => handleTextChange(text, setDigit2, input3Ref)}/>
                          </View>
                          <View style={{  width: "24%", backgroundColor: "white", borderRadius: 10,   padding: 15, margin: 3}}>
                              <TextInput style={{ flex: 1, textAlign: "center" }} maxLength={1} secureTextEntry={!isPasswordVisible}  value={digit3} keyboardType="numeric" ref={input3Ref} onChangeText={(text) => handleTextChange(text, setDigit3, input4Ref)}/>
                          </View>
                          <View style={{   width: "24%", backgroundColor: "white", borderRadius: 10,  padding: 15, margin: 3}}>
                              <TextInput style={{ flex: 1, textAlign: "center" }} maxLength={1} secureTextEntry={!isPasswordVisible}  value={digit4} keyboardType="numeric" ref={input4Ref}  onChangeText={(text) => handleTextChange(text, setDigit4, input1Ref)}/>
                          </View>
                      </View>
                
                      {showIncorrectPasswordText && ( <Text style={{ fontFamily: "Kanit", fontSize: 14,  color: "black" }} >Wrong password. {(MaxAttempts + 1 - numberOfAtempts).toString() +  (numberOfAtempts > 1 ? " attempt left" : " attempts left" )} </Text>)}

                      <TouchableOpacity style={{alignSelf: "center", padding: 5, width: "100%" }} onPress={() => { router.replace('/login') }}> 
                        <Text  style={{textAlign: "right", color: "white", fontFamily: "OpenSans",  }}>
                            Use email and password to login
                        </Text>  
                    </TouchableOpacity>
                      <Image source={require("@/assets/images/splash/splash7.png")} style={[{ flex: 1, maxHeight:300, marginTop: 30,  alignSelf: "center", height: height * 0.25,  } ]} resizeMode='contain'/>
                      <View style={{alignSelf: "center",  padding: 5, position: "absolute", bottom: 0 }}>

                    </View> 
                  </Animated.View>

                </View>
            </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>


  // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center", 
    padding: 20, 
    marginBottom: 100
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

export default SplashScreen;








