// src/app/login.js
import React, { useState, useEffect, useRef,   } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, useWindowDimensions, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp  } from "react-native-reanimated"; 
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SET_USER, SET_SUBSCRIPTION_STATUS } from "@/assets/context/actions/userActions";
import { useDispatch } from "react-redux"; 
import * as Device from 'expo-device'
import Purchases, { PurchasesOffering} from "react-native-purchases";
import {  dbSTUDENTS, authSTUDENTS } from '@/firebaseconfig';
import {  doc,  getDoc, updateDoc   } from 'firebase/firestore';
import {  signInWithEmailAndPassword } from "firebase/auth";
import Constants from 'expo-constants';
import { TitleAndDescription, customEncrypt, customDecrypt, LocalStorageEduZolvePasco, RetrieveLocalStorageEduZolvePasco, capitalizeText, PasscodeSetup, TextInputCustomized, ModalCustomized2, TouchableOpacityCustomized, SelectOneOption, TouchableOpacityWithoutBackground, PasscodeCustomized, BottomSheetCustomized, ModalCustomized, DisplayData1, DisplayData2, AnimationCustomized } from '@/components/customized/MyComponents';

const SplashScreen = () => {
  const router = useRouter();
  const {height}   = useWindowDimensions()
  const dispatch   = useDispatch()
  const deviceModelName = Device?.modelName
  const deviceOsInternalBuildId = Device?.osInternalBuildId
  const offlineID = Constants?.expoConfig?.extra?.offlineID



  const [savedData, setSavedData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const retrievedData = await RetrieveLocalStorageEduZolvePasco();
        setSavedData(retrievedData); 
      } catch (error) {
      }
    };
    fetchData();
  }, []); 

  const password = savedData?.offlineID && offlineID ? customDecrypt(savedData?.offlineID, offlineID) : "0000";
  const email = savedData?.email
  const passcode = savedData?.shortPswd




  const[digit1, setDigit1] = useState("");
  const[digit2, setDigit2] = useState("");
  const[digit3, setDigit3] = useState("");
  const[digit4, setDigit4] = useState("");
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);

  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalDescription, setModalDescription] = useState("")

  const [showIncorrectPasswordText, setShowIncorrectPasswordText] = useState(false);
  const [numberOfAtempts, setNumberOfAttempts] = useState(0)
  const MaxAttempts = 2;

  // ==============================================================================================================================================================
  const handleTextChange = (text, setDigit, nextInputRef) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    setDigit(formattedText);
    if ( formattedText.length === 1) { nextInputRef.current.focus(); }
  };

  useEffect(  () => {  
    async function fetchPassWordSaved() {
      if (digit1 && digit2 && digit3 && digit4 ) {
        retrievedSavedData(digit1,  digit2, digit3, digit4)
      } 
    } 
    fetchPassWordSaved();
  }, [digit1, digit2, digit3, digit4,]); 

  const retrievedSavedData = async (digit1, digit2, digit3, digit4) => { 
      if (digit1  + digit2 + digit3 + digit4 === passcode) {
        setDigit1(""); setDigit2(""); setDigit3(""); setDigit4(""); 
        try {
          const userCredential = await signInWithEmailAndPassword(authSTUDENTS, email, password)
          const docSnap = await getDoc(doc(dbSTUDENTS, "eduzolve-users", userCredential?.user?.uid,)); 
          if (docSnap.exists()) { 
            dispatch(SET_USER(docSnap.data()));
            let appVersionNumber = await getDoc(doc(dbSTUDENTS, "app-version", "app-version-number",)); 
            appVersionNumber = appVersionNumber?.data()?.versionNumber
            if (appVersionNumber) {
              if (appVersionNumber === "1.0.0") { 
                const deviceInfo = docSnap?.data();
                if (deviceInfo?.deviceID === (deviceModelName + deviceOsInternalBuildId)) {
                  await Purchases.logIn(docSnap?.data()?._id)
                  const customerInfo = await Purchases.getCustomerInfo();
                  dispatch( SET_SUBSCRIPTION_STATUS( customerInfo ) );
                  router.replace('/(drawer)/pastquestions') 
                } else {
                  if (deviceInfo?.changeDevice) {
                    try {
                      await updateDoc(doc( dbSTUDENTS, "eduzolve-users",  deviceInfo?._id), {ddeviceID: deviceModelName + deviceOsInternalBuildId, changeDevice: false, })
                      await Purchases.logIn(docSnap?.data()?._id)
                      const customerInfo = await Purchases.getCustomerInfo();
                      dispatch( SET_SUBSCRIPTION_STATUS( customerInfo ) );
                      router.replace('/(drawer)/pastquestions')
                    } catch (error) {
                      setShowModal(true); setModalTitle("Login failed"); setModalDescription("Something went wrong. Try again later.");
                    }
                } else {
                  setShowModal(true); setModalTitle("DIFFERENT DEVICE"); setModalDescription("You're trying to log in from a different device. Please use the device you originally installed the app on. To switch devices, contact support at peter.zorve@eduzolve.com")
                }                  
              }
            } else {
              setShowModal(true); setModalTitle("Login failed"); setModalDescription("You need to update your app");
            }
          } else {
            setShowModal(true); setModalTitle("Login failed"); setModalDescription("Check your internet connection");
          }
        }
      } catch (error) {
        setShowModal(true); setModalTitle("Login unsuccessful"); setModalDescription("You may have changed your password. Please use your email address and password to log in. After successful login, you can then use your passcode.");
      }    
    } else {
        setDigit1(""); setDigit2(""); setDigit3(""); setDigit4("");  setNumberOfAttempts(numberOfAtempts + 1)
        if (numberOfAtempts < MaxAttempts) {
          setShowIncorrectPasswordText(true)
        }
        if (numberOfAtempts >= MaxAttempts) {
          router.replace('/login') 
        }
    }
  };

  return (
    <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={0} style={{   flex: 1, backgroundColor: 'rgb(255, 121, 0)',}} >
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'rgb(255, 121, 0)',}} >
        <View style={{ alignSelf: "center", width: "100%"}}>
          <View style={{backgroundColor: "white", }} >
              <Image source={require("@/assets/images/splash/splash3.png")} style={[{ flex: 1, maxHeight:200, marginTop: 80,  alignSelf: "center", height: height * 0.17,  } ]} resizeMode='contain'/>
              <Animated.View  entering={FadeInUp.delay(100).duration(1000).springify().damping(2)} style={{ width: "90%", alignSelf: "center", paddingBottom: 20}}>
                  <Text style={{fontSize: 24, fontFamily: "Kanit"}} >EDUZOLVE PASCO </Text>
                  <Text style={{ fontFamily: "OpenSans", fontSize: 24}} >A collection of WAEC past questions and answers</Text>
              </Animated.View>
          </View>
          <View style={{backgroundColor: "white",  }} >
              <View style={{backgroundColor: "rgb(255, 121, 0)", borderTopLeftRadius: 60, borderTopRightRadius: 60,   }} >
                <Animated.View entering={FadeInUp.delay(200).duration(1000)} style={{  width: "80%", alignSelf: "center", marginTop: 50,  borderRadius: 15}}>
                    <Text style={{ fontFamily: "Inconsolata", fontSize: 16,  color: "white" }} >Four-digit password</Text>
                    <View style={{ flexDirection: 'row', alignSelf: "center", }}>
                        <View style={{  width: "24%", backgroundColor: "white", borderRadius: 10,   padding: 15, margin: 3}}>
                            <TextInput style={{ flex: 1, textAlign: "center",  }} maxLength={1} secureTextEntry value={digit1} keyboardType="numeric" ref={input1Ref} onChangeText={(text) => handleTextChange(text, setDigit1, input2Ref)}/>
                        </View>
                        <View style={{   width: "24%", backgroundColor: "white", borderRadius: 10,  padding: 15, margin: 3}}>
                            <TextInput style={{ flex: 1, textAlign: "center" }} maxLength={1} secureTextEntry  value={digit2} keyboardType="numeric" ref={input2Ref} onChangeText={(text) => handleTextChange(text, setDigit2, input3Ref)}/>
                        </View>
                        <View style={{  width: "24%", backgroundColor: "white", borderRadius: 10,   padding: 15, margin: 3}}>
                            <TextInput style={{ flex: 1, textAlign: "center" }} maxLength={1} secureTextEntry  value={digit3} keyboardType="numeric" ref={input3Ref} onChangeText={(text) => handleTextChange(text, setDigit3, input4Ref)}/>
                        </View>
                        <View style={{   width: "24%", backgroundColor: "white", borderRadius: 10,  padding: 15, margin: 3}}>
                            <TextInput style={{ flex: 1, textAlign: "center" }} maxLength={1} secureTextEntry value={digit4} keyboardType="numeric" ref={input4Ref}  onChangeText={(text) => handleTextChange(text, setDigit4, input1Ref)}/>
                        </View>
                    </View>
                    {showIncorrectPasswordText && ( <Text style={{ fontFamily: "Kanit", fontSize: 14,  color: "black" }} >Wrong password. {(MaxAttempts + 1 - numberOfAtempts).toString() +  (numberOfAtempts > 1 ? " attempt left" : " attempts left" )} </Text>)}
                    <TouchableOpacity style={{alignSelf: "center", padding: 5, width: "100%" }} onPress={() => { router.replace('/login') }}> 
                      <Text  style={{textAlign: "right", color: "white", fontFamily: "OpenSans",  }}>
                          Use email and password to login
                      </Text>  
                    </TouchableOpacity>
                    <Image source={require("@/assets/images/splash/splash7.png")} style={[{ flex: 1, maxHeight:300, marginTop: 30,  alignSelf: "center", height: height * 0.25,  } ]} resizeMode='contain'/>
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

export default SplashScreen;