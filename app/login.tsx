


// src/app/login.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,  StyleSheet, useWindowDimensions, ImageBackground, KeyboardAvoidingView, ScrollView, Platform, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp  } from "react-native-reanimated"; 
import { Ionicons } from '@expo/vector-icons';

import { SET_USER, SET_SUBSCRIPTION_STATUS } from "@/assets/context/actions/userActions"
import { PreventScreenshots } from 'react-native-prevent-screenshots';

import { useDispatch } from 'react-redux';

import { dbSTUDENTS, authSTUDENTS } from '@/firebaseconfig';
import { doc, getDoc, updateDoc   } from 'firebase/firestore';
import { signInWithEmailAndPassword } from "firebase/auth";
import * as Device from 'expo-device'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Purchases, { PurchasesOffering} from "react-native-purchases";


// import { disallowScreenshot, keepAwake } from 'react-native-screen-capture';
import { usePreventScreenCapture } from 'expo-screen-capture';
import { enableSecureView } from 'react-native-prevent-screenshot-ios-android';
// import ScreenshotPrevent from 'react-native-screenshot-prevent';
// import ScreenshotPrevent, { ScreenshotPreventEvents } from 'react-native-screenshot-prevent';
// import PreventScreenshot from 'react-native-prevent-screenshot-ios-android';


const LoginScreen = () => {

    const {height} = useWindowDimensions()
    const router = useRouter();
    const dispatch = useDispatch();
 

    const deviceModelName = Device?.modelName
    const deviceOsInternalBuildId = Device?.osInternalBuildId
    // const deviceSsVersion = Device?.osVersion

    // usePreventScreenCapture();
    // const ScreenshotPrevention = () => {
    //  if (Platform.OS === 'ios') {
    //     enableSecureView();
    //   }
    // };

    // useEffect(() => {
    //   ScreenshotPrevention()
    // }, []);



    // useEffect(() => {
    //   enableSecureView();
    //   if (Platform.OS == 'ios') {
    //     console.log(Platform.OS)
    //   }
    // }, []);

  



    // disallowScreenshot(true);
    // ScreenshotPrevent.enabled(true);

    // if (Platform.OS === 'android') {
    //   forbidAndroidShare(); //This function blocks the Screen share/Recording and taking screenshot for android devices.
    //   allowAndroidShare(); //This function allows to provide back the Screen share/Recording and screenshot functionality for android devices
    // }
    // if (Platform.OS == 'ios') {
    //   console.log("peter")
    //   enableSecureView(); //This function blocks the Screen share/Recording and taking screenshot for iOS devices.
    //   disableSecureView(); //This function allows to provide back the Screen share/Recording and screenshot functionality for iOS devices
    //   console.log("zorve")
    // }

    // useEffect(() => {
    //   enableSecureView();
    // }, []);
  

    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");




    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [emailIsEmpty, setEmailIsEmpty] = useState(false); 
    const [passwordIsEmpty, setPasswordIsEmpty] = useState(false);
    
    const [buttontext, setButtonText] = useState("Login");
    const [disableButton, setDisableButton] = useState(false);
    
    const togglePasswordVisibility = () => {  setIsPasswordVisible(!isPasswordVisible); };



    const loginBtn = async () => {
      if (!email) {  setEmailIsEmpty(true)}
      if (!password) { setPasswordIsEmpty(true)}
      if (email && password) {

        try {
          setDisableButton(true);
          setButtonText("Please wait")
            const userCredential = await signInWithEmailAndPassword(authSTUDENTS, email, password)
            const docSnap = await getDoc(doc(dbSTUDENTS, "eduzolve-users", userCredential?.user?.uid,)); 

          
          if (docSnap.exists()) { 
            dispatch( SET_USER(docSnap.data()) );
            
            if (userCredential?.user?.emailVerified) {
              
              let verifiedData = await getDoc(doc(dbSTUDENTS, "eduzolve-users", userCredential?.user?.uid,)); 
              if (verifiedData.data()?.emailVerified === false) { 
                await updateDoc(doc(dbSTUDENTS, "eduzolve-users", userCredential?.user?.uid,), {emailVerified: true}); 
                verifiedData = await getDoc(doc(dbSTUDENTS, "eduzolve-users", userCredential?.user?.uid,)); 
              }
           
              try {
                  let _jsonValue = verifiedData.data();
                  _jsonValue["localpswd"] = password;
                  const jsonValue = JSON.stringify(_jsonValue);
 
                  await AsyncStorage.setItem('eduzolveReportUsersLocalStorage', jsonValue); 

              } catch (error) { 

              }

              // === Check the app version here ==================================================================
    
                let appVersionNumber = await getDoc(doc(dbSTUDENTS, "app-version", "app-version-number",)); 
                
                appVersionNumber = appVersionNumber?.data()?.versionNumber
                if (appVersionNumber) {
                  if (appVersionNumber === "1.0.0") {
  
                    const deviceInfo = verifiedData?.data();

                    if (deviceInfo?.deviceID === (deviceModelName + deviceOsInternalBuildId)) { 


                      await Purchases.logIn(deviceInfo?._id);
                      const customerInfo = await Purchases.getCustomerInfo();
                      dispatch( SET_SUBSCRIPTION_STATUS(customerInfo) );

                      

                      
                      router.replace('/(drawer)');
                      
     


                    } else {
                        if (deviceInfo?.changeDevice) {
                        try {
                          await updateDoc(doc( dbSTUDENTS, "eduzolve-users",  deviceInfo?._id), {deviceID: deviceModelName + deviceOsInternalBuildId, changeDevice: false, })
                          // alert("Device has been registered! \nTry your login should work now")


                          await Purchases.logIn(deviceInfo?._id);
                          const customerInfo = await Purchases.getCustomerInfo();
                          dispatch( SET_SUBSCRIPTION_STATUS( customerInfo ) );

                          router.replace('/(drawer)');
                      
                          
                        } catch (error) {
                          alert("Try again later. \nSomething went wrong")
                        }
  
                      } else {
                        alert("You're trying to log in from a different device. Please use the device you originally installed the app on. \nTo switch devices, contact support at peter.zorve@eduzolve.com")
                      }
                      
                    }
                  } else {
                    alert("You need to update your app")
                  }
                } 
                else {
                  alert("Something went wrong\nCheck your internet connection")
  
              }

          


              // router.replace('/(drawer)') 
              // ==================================================================================================

              setEmail("");
              setPassword(""); 
              setDisableButton(false);
              setButtonText("Login")
              
            }
            else {
              setDisableButton(false);
              setButtonText("Login");
              setLoginFailed(true);
              setLoginFailedMessage("Your email has not been verified yet. Please check your inbox and verify it before continuing. \nIf you haven't received the verification email, return to the registration page and click 'Didn't receive a verification email? Resend'.")
            }
          } 
        else {
          alert("User does not exist")
          setLoginFailed(true) 
          setDisableButton(false);
          setButtonText("Login")
        }
          
        } catch (error) {
          setLoginFailed(true);
          setDisableButton(false);
          setButtonText("Login")
            if (error?.message.includes("auth/invalid-credential")) { 
              setLoginFailedMessage("Invalid user credential. If you don't have account, create one" )
            } else if (error?.message.includes("auth/too-many-requests")) {
              setLoginFailedMessage("Too many wrong attempts. Try again after 1 or 2 minutes")
            } else if (error?.message.includes("auth/invalid-email")) {
              setLoginFailedMessage("Invalid email address")
            } else {
              setLoginFailedMessage("Something went wrong. Try again later" + error.message)
            }
        }


        

      }

    }

    useEffect(() => {
      if ( emailIsEmpty  || passwordIsEmpty ) 
          { const timeout = setTimeout(() => { 
            setEmailIsEmpty(false);     setPasswordIsEmpty(false);    
          }, 4000); 
          return () => clearTimeout(timeout);
        }
      }, [emailIsEmpty, passwordIsEmpty]);

    




    const [loginFailed, setLoginFailed] = useState(true)
    const [loginFailedMessage, setLoginFailedMessage] = useState("")
    useEffect(() => {
      if ( loginFailed ) 
          { const timeout = setTimeout(() => { 
            setLoginFailed(false)   
          }, 5000); 
          return () => clearTimeout(timeout);
        }
      }, [loginFailed]);





  return (
    // <ImageBackground source={require('../assets/images/background/background3.jpg')} style={{flex: 1, }} >
    <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={0} style={{   flex: 1, }} >
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#43cc98',}} >
        <View style={{}}>
            <View style={{backgroundColor: "#43cc98", }} >
                <View style={{backgroundColor: "white", borderBottomRightRadius: 120 }} >
                    <Image source={require("../assets/images/splash/splash1.png")} style={[{ flex: 1, maxHeight:300, marginTop: 80,  alignSelf: "center", height: height * 0.20,  } ]} resizeMode='contain'/>
                    {/* <Image source={require("../assets/images/eduzolve-logos/eduzolvereport-logo.png")} style={[{ flex: 1, maxHeight:200,   alignSelf: "center", height: height * 0.10,  } ]} resizeMode='contain'/> */}
                    {/* <Text style={{textAlign: "center", padding: 20, fontSize: 30}}>EduZolve</Text> */}
                    <Animated.View  entering={FadeInUp.delay(100).duration(1000).springify().damping(2)} style={{ marginBottom: 30,  width: "85%", alignSelf: "center", marginTop: 10}}>
                        <Text style={{fontSize: 24, fontFamily: "JosefinSans", }} >EDUZOLVE PASCO</Text>
                        <Text style={{ fontFamily: "OpenSans", fontSize: 24}} >A collection of WAEC past questions and answers</Text>
                    </Animated.View>
                </View>
            </View>
            <View style={{backgroundColor: "white",  }} >
                <View style={{backgroundColor: "#43cc98", borderTopLeftRadius: 60,  }} >

                  <Animated.View entering={FadeInUp.delay(200).duration(1000)} style={{  width: "80%", alignSelf: "center", marginTop: 50,  borderRadius: 15}}>
                      <Text style={{ fontFamily: "Kanit", fontSize: 14,  color: "white" }} >Email address</Text>
                      <View style={[{ flexDirection: 'row', alignItems: 'center', borderColor: emailIsEmpty ? "red" : 'gray', borderWidth: emailIsEmpty ? 2 : 1, borderRadius: 10,   padding: 5, backgroundColor: "white", }]}>
                          <Ionicons name={'mail'}  size={20} color="gray" style={{ marginRight: 10, }}/>
                          <TextInput style={{   flex: 1, fontFamily: "Kanit", }}  placeholder="Email address" value={email.replace(" ", "")} onChangeText={(text) => setEmail(text.replace(" ", ""))}/>
                      </View>
                  </Animated.View>


                  <Animated.View entering={FadeInUp.delay(300).duration(1000)} style={{  width: "80%", alignSelf: "center", marginTop: 10}}>
                      <Text style={{ fontFamily: "Kanit", fontSize: 14,  color: "white" }} >Password</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: passwordIsEmpty ? "red" : 'gray', borderWidth: passwordIsEmpty ? 2 : 1, borderRadius: 10,  alignSelf: "center", padding: 5, backgroundColor: "white",  }}>
                          <Ionicons name={isPasswordVisible ? 'lock-open' : 'lock-closed'}  size={20} color="gray" style={{ marginRight: 10, }}/>
                          <TextInput style={{   flex: 1, fontFamily: "Kanit",}} secureTextEntry={!isPasswordVisible} placeholder="Password" value={password.replace(" ", "")} onChangeText={(text) => setPassword(text.replace(" ", ""))}/>
                          <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color="gray" onPress={ togglePasswordVisibility } style={{ marginRight: 10, }}/>
                      </View>
                  </Animated.View>

                  <Animated.View entering={FadeInUp.delay(400).duration(1000)} style={{  width: "80%", alignSelf: "center",  margin: 5}}>
                      <TouchableOpacity style={{ }} onPress={() => { router.push('/forgetpassword'); }}> 
                          <Text  style={{textAlign: "right", color: "white", fontFamily: "Kanit",  }}> Forgot password </Text> 
                      </TouchableOpacity>
                  </Animated.View>

                  {loginFailed && (
                    <View style={{ marginBottom: 5,  width: "80%", alignSelf: "center", marginTop: 10, }}>
                      <Text style={{  fontFamily: "Kanit", fontSize: 10}} >* {loginFailedMessage}</Text>
                    </View>
                  )}

                  <Animated.View entering={FadeInUp.delay(500).duration(1000)} style={{padding: 8, backgroundColor: disableButton ? "gray" : "#2F5597",  alignSelf: "center", margin: 5, borderRadius: 30,  width: "80%",  marginTop: 30, }}>
                      <TouchableOpacity disabled={disableButton} onPress={loginBtn} style={{ }} >
                        <Text style={{textAlign: "center", color: "white", fontFamily: "Kanit", fontSize: 15}}>{buttontext}</Text>
                      </TouchableOpacity>
                  </Animated.View>

                  <Animated.View entering={FadeInUp.delay(600).duration(1000)} style={{alignSelf: "center", margin: 10, padding: 10}}>
                      <TouchableOpacity onPress={() => {router.push('/register');}}> 
                          <Text  style={{fontFamily: "Kanit"}}>Dont not have account?   
                              <Text style={{ color: "white"}} >  Register </Text> 
                          </Text>  
                      </TouchableOpacity>
                  </Animated.View> 

                </View>
            </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
  //  </ImageBackground>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    borderRadius: 4,
  },
});




export default LoginScreen;
