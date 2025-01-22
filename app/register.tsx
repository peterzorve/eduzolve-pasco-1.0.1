// src/app/login.js
import React, { useState, useRef } from 'react';
import { View, ScrollView, useWindowDimensions, Linking, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import * as Device from 'expo-device'
import { dbSTUDENTS, authSTUDENTS } from '@/firebaseconfig';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
// import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useInactivityLogout from '@/components/useInactivityLogout';
import Constants from 'expo-constants';
import { TitleAndDescription, customEncrypt, LocalStorageEduZolvePasco, RetrieveLocalStorageEduZolvePasco, capitalizeText, PasscodeSetup, TextInputCustomized, ModalCustomized2, TouchableOpacityCustomized, SelectOneOption, TouchableOpacityWithoutBackground, PasscodeCustomized, BottomSheetCustomized, ModalCustomized, DisplayData1, DisplayData2, AnimationCustomized } from '@/components/customized/MyComponents';

const RegisterScreen = () => {
  useInactivityLogout(5);  
  const router = useRouter();
  const {height} = useWindowDimensions()

  // ====== Generated variables =====================================================================================================
  const deviceModelName = Device?.modelName
  const deviceOsInternalBuildId = Device?.osInternalBuildId
  const offlineID = Constants?.expoConfig?.extra?.offlineID

  const [showModal, setShowModal] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalDescription, setModalDescription] = useState("")
  const [userID, setUserID] = useState("")
  const colorScheme = useColorScheme();

  // ====== User Inputs =====================================================================================================
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [passwordrepeat, setPasswordRepeat] = useState("");
  const [hasReferralCodeSelected, setHasReferralCodeSelected] = useState("")
  const [shortPswd, setShortPswd] = useState("")


  const [disableButton, setDisableButton] = useState(false);
  const RegistrationBtn = async () => {
    if (deviceModelName && deviceOsInternalBuildId) {
      if (username.trim() && email.trim() && password && passwordrepeat ) { 
        if (password === passwordrepeat && password.length > 8 ) { 
          try {
            setDisableButton(true);
            const userCredential = await createUserWithEmailAndPassword(authSTUDENTS, email, password)
            setUserID(userCredential?.user?.uid)
            const data = { _id: userCredential?.user?.uid, username: capitalizeText(username.trim()),  email: email.trim().toLowerCase(),  dateRegister: `${Date.now()}`, emailVerified: userCredential?.user?.emailVerified,  shortPswd: "",  paidSubscription: false, paidAmount: 0.00, deviceID: deviceModelName + deviceOsInternalBuildId, changeDevice: false,  hasReferralCode: hasReferralCodeSelected === "yes" ? true : false, referralCode: "",  offlineID: customEncrypt(password, offlineID)} 
            await setDoc(doc(dbSTUDENTS, "eduzolve-users", userCredential?.user?.uid,), data); 
            await sendEmailVerification(userCredential?.user); 
            LocalStorageEduZolvePasco(data);
            setDisableButton(false);  setUsername("");  setEmail("");  setPassword("");  setPasswordRepeat(""); setHasReferralCodeSelected("");
            setRegistrationSuccess(true); setModalTitle("Registration Successful"); setModalDescription("Set up a 4-digit passcode for faster logins, or skip and do it later. \nYou must verify your email using the link sent to your inbox before you can log in.") 
          } catch (error) { 
            setDisableButton(false);
            if (error?.message.includes("auth/email-already-in-use")) {   setShowModal(true); setModalTitle("Acount exits"); setModalDescription("Email already in use. Login instead") } 
            else if (error?.message.includes("auth/invalid-email")) {  setShowModal(true); setModalTitle("Invalid email address"); setModalDescription("Invalid email address") } 
            else { setShowModal(true); setModalTitle("Something went wrong"); setModalDescription(error?.message); }
          }
        } else { 
          setShowModal(true); setModalTitle("Password error"); setModalDescription("Passwords must match and be at least 8 characters long.")
        }
      } else {
        setShowModal(true); setModalTitle("missing field"); setModalDescription("All fields must be filled")
      }
    } else {
      setShowModal(true); setModalTitle("Device unknown"); setModalDescription("Could not fetch device information. Try again later or try using another device")
    }
  }

  const UpdatePassCode = async () => {
    if (shortPswd?.length >= 4) {
      try {
        setDisableButton(true);
        await updateDoc(doc( dbSTUDENTS, "eduzolve-users", userID), {"shortPswd": shortPswd.trim()});
        const verifiedData = await getDoc(doc(dbSTUDENTS, "eduzolve-users", userID,)); 
        LocalStorageEduZolvePasco(verifiedData?.data());
        setDisableButton(false); setShortPswd("");  setRegistrationSuccess(false); 
        router.push('/login');
      } catch (error) {
        setDisableButton(false); setShowModal(true); setModalTitle("Something went wrong"); setModalDescription(error?.message)
        router.push('/login');
      }
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{width: "95%", alignSelf: "center", marginVertical: 0.005*height, borderRadius: 5, height: 0.9 * height, }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ width: "90%", alignSelf: "center"}}>
          <TitleAndDescription title='Registration' titleFontSize={28} titleColor={colorScheme === "dark" ? "white" : "black"} />
          <TextInputCustomized title='Full name'        value={username}        onChangeText={setUsername}       leftIcon={'person'} textColor={colorScheme === "dark" ? "white" : "black"} />
          <TextInputCustomized title='Email address'    value={email}           onChangeText={setEmail}          leftIcon={'mail'} removeSpaces textColor={colorScheme === "dark" ? "white" : "black"}/>
          <TextInputCustomized title='Password'         value={password}        onChangeText={setPassword}       leftIcon={'lock-closed'} isSecure textColor={colorScheme === "dark" ? "white" : "black"}/>
          <TextInputCustomized title='Confirm password' value={passwordrepeat}  onChangeText={setPasswordRepeat} leftIcon={'lock-closed'} isSecure textColor={colorScheme === "dark" ? "white" : "black"}/>
          <SelectOneOption categorySelected={hasReferralCodeSelected} setCategorySelected={setHasReferralCodeSelected} textColor={colorScheme === "dark" ? "white" : "black"} />
          <TouchableOpacityCustomized onPress={RegistrationBtn} disableButton={disableButton} />
          <TouchableOpacityWithoutBackground onPress={() => {router.back()}} text1='Already have an account?' text1Color={colorScheme === "dark" ? "white" : "black"} text2='Login'/>
          <TouchableOpacityWithoutBackground onPress={() => {router.push("/resendverification")}} text1="Didn't receive verification email? Resend" text1Color={colorScheme === "dark" ? "white" : "black"}/>
          <TouchableOpacityWithoutBackground onPress={() => {Linking.openURL('https://accounts.google.com/signup')}} text1="If you do not have an email account" text1Color={colorScheme === "dark" ? "white" : "black"} text2='click here' text2Color='red' text3='to create one first. ' text3Color={colorScheme === "dark" ? "white" : "black"}/>
          <ModalCustomized2 isModalVisible={showModal} setIsModalVisible={setShowModal}>
            <TitleAndDescription title={modalTitle} description={modalDescription}/>
          </ModalCustomized2>
          <ModalCustomized2 isModalVisible={registrationSuccess} setIsModalVisible={setRegistrationSuccess} redirect={() => { router.push('/login') }} >
            <TitleAndDescription title={modalTitle} description={modalDescription}/>
            <PasscodeSetup passcode={shortPswd} setPasscode={setShortPswd} onPress={UpdatePassCode} />
          </ModalCustomized2>
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

export default RegisterScreen;