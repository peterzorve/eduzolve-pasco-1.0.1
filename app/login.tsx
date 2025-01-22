


// src/app/login.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, useWindowDimensions, KeyboardAvoidingView, ScrollView, Platform, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp  } from "react-native-reanimated"; 
import { Ionicons } from '@expo/vector-icons';
import { SET_USER, SET_SUBSCRIPTION_STATUS } from "@/assets/context/actions/userActions"
import { useDispatch } from 'react-redux';
import { dbSTUDENTS, authSTUDENTS } from '@/firebaseconfig';
import { doc, getDoc, updateDoc   } from 'firebase/firestore';
import { signInWithEmailAndPassword } from "firebase/auth";
import * as Device from 'expo-device'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants';
import Purchases, { PurchasesOffering} from "react-native-purchases";
import { TitleAndDescription, customEncrypt, customDecrypt, LocalStorageEduZolvePasco, RetrieveLocalStorageEduZolvePasco, capitalizeText, PasscodeSetup, TextInputCustomized, ModalCustomized2, TouchableOpacityCustomized, SelectOneOption, TouchableOpacityWithoutBackground, PasscodeCustomized, BottomSheetCustomized, ModalCustomized, DisplayData1, DisplayData2, AnimationCustomized } from '@/components/customized/MyComponents';


const LoginScreen = () => {
    const {height} = useWindowDimensions()
    const router = useRouter();
    const dispatch = useDispatch();
    const deviceModelName = Device?.modelName
    const deviceOsInternalBuildId = Device?.osInternalBuildId
    const offlineID = Constants?.expoConfig?.extra?.offlineID

    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");

    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalDescription, setModalDescription] = useState("")

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
          setDisableButton(true); setButtonText("Please wait")
          const userCredential = await signInWithEmailAndPassword(authSTUDENTS, email, password)
          const docSnap = await getDoc(doc(dbSTUDENTS, "eduzolve-users", userCredential?.user?.uid,)); 
          if (docSnap.exists()) { 
            dispatch( SET_USER(docSnap.data()) );
            if (userCredential?.user?.emailVerified) {
              let verifiedData = await getDoc(doc(dbSTUDENTS, "eduzolve-users", userCredential?.user?.uid,)); 
              
              try {
                if (verifiedData.data()?.emailVerified === false) { 
                  await updateDoc(doc(dbSTUDENTS, "eduzolve-users", userCredential?.user?.uid,), {emailVerified: true}); 
                  verifiedData = await getDoc(doc(dbSTUDENTS, "eduzolve-users", userCredential?.user?.uid,)); 
                }
                if (password !== customEncrypt(password, offlineID)) { 
                  await updateDoc(doc(dbSTUDENTS, "eduzolve-users", userCredential?.user?.uid,), {offlineID: customEncrypt(password, offlineID)}); 
                  verifiedData = await getDoc(doc(dbSTUDENTS, "eduzolve-users", userCredential?.user?.uid,)); 
                }
              } catch (error) {
              }
                await LocalStorageEduZolvePasco(verifiedData?.data());   
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
                          await Purchases.logIn( deviceInfo?._id );
                          const customerInfo = await Purchases.getCustomerInfo();
                          dispatch( SET_SUBSCRIPTION_STATUS( customerInfo ) );
                          router.replace('/(drawer)');
                        } catch (error) {
                          // alert("Try again later. \nSomething went wrong")
                          setShowModal(true); setModalTitle("Login failed"); setModalDescription("Try again later. Something went wrong");
                        }
                      } else {
                        // alert("You're trying to log in from a different device. Please use the device you originally installed the app on. To switch devices, contact support at peter.zorve@eduzolve.com")
                        setShowModal(true); setModalTitle("Unknown Device"); setModalDescription('You are trying to log in from a different device. Please use the device you originally installed the app on. To switch devices, contact support at "peter.zorve@eduzolve.com"');
                      }
                    }
                  } else {
                    // alert("You need to update your app") 
                    setShowModal(true); setModalTitle("App outdated"); setModalDescription("You need to update your app");
                  }
                } 
                else {
                  // alert("Something went wrong\nCheck your internet connection")
                  setShowModal(true); setModalTitle("Login failed"); setModalDescription("Something went wrong. Check your internet connection");
              }
              setEmail(""); setPassword("");  setDisableButton(false); setButtonText("Login"); 
            }
            else { 
              setDisableButton(false); setButtonText("Login"); setLoginFailed(true);
              // setLoginFailedMessage("Your email has not been verified yet. Please check your inbox and verify it before continuing. \nIf you haven't received the verification email, return to the registration page and click 'Didn't receive a verification email? Resend'.")
              setShowModal(true); setModalTitle("Email not verified"); setModalDescription("Your email has not been verified yet. Please check your inbox and verify it before continuing. If you haven't received the verification email, return to the registration page and click 'Didn't receive a verification email? Resend'.");
            }
          } 
        else {
          // alert("User does not exist");  
          setLoginFailed(true);  setDisableButton(false);  setButtonText("Login");
          setShowModal(true); setModalTitle("Unknown user"); setModalDescription("User does not exist");
        }
        } catch (error) {
            setLoginFailed(true);  setDisableButton(false);  setButtonText("Login")
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
    <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={0} style={{   flex: 1, }} >
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'rgb(255, 121, 0)',}} >
        <View style={{}}>
            <View style={{backgroundColor: "rgb(255, 121, 0)", }} >
                <View style={{backgroundColor: "white", borderBottomRightRadius: 120 }} >
                    <Image source={require("../assets/images/splash/splash1.png")} style={[{ flex: 1, maxHeight:300, marginTop: 80,  alignSelf: "center", height: height * 0.20,  } ]} resizeMode='contain'/>
                    <Animated.View  entering={FadeInUp.delay(100).duration(1000).springify().damping(2)} style={{ marginBottom: 30,  width: "85%", alignSelf: "center", marginTop: 10}}>
                        <Text style={{fontSize: 24, fontFamily: "JosefinSans", }} >EDUZOLVE PASCO</Text>
                        <Text style={{ fontFamily: "OpenSans", fontSize: 24}} >A collection of WAEC past questions and answers</Text>
                    </Animated.View>
                </View>
            </View>
            <View style={{backgroundColor: "white",  }} >
                <View style={{backgroundColor: "rgb(255, 121, 0)", borderTopLeftRadius: 60,  }} >
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
                  <Animated.View entering={FadeInUp.delay(400).duration(1000)} style={{  width: "80%", alignSelf: "center",  margin: 5, flexDirection: "row"}}>
                      <TouchableOpacity style={{ flex: 1 }} onPress={() => { router.replace('/'); }}> 
                          <Text  style={{textAlign: "left", color: "white", fontFamily: "Kanit",  }}>Use passcode</Text> 
                      </TouchableOpacity>
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

            <ModalCustomized2 isModalVisible={showModal} setIsModalVisible={setShowModal}>
              <TitleAndDescription title={modalTitle} description={modalDescription}/>
            </ModalCustomized2>
        
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
