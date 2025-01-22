import { View, Text, Image, useWindowDimensions,  ScrollView, StyleSheet, KeyboardAvoidingView, Platform, ImageBackground, TextInput, TouchableOpacity, useColorScheme } from "react-native";
import React, { useState, useEffect, useRef,   } from "react";
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from "react-redux"; 
import { useSelector } from "react-redux";
import { useRouter } from 'expo-router';
import { doc, getDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'
import useInactivityLogout from '@/components/useInactivityLogout';
import Constants from 'expo-constants';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, updatePassword, getAuth   } from "firebase/auth"; 
import { appSTUDENTS, dbSTUDENTS, authSTUDENTS, dbTEACHERS, authTEACHERS  } from '@/firebaseconfig'; 
import { TitleAndDescription, customEncrypt, LocalStorageEduZolvePasco, BottomSheetCustomized, TextInputCustomized, PasscodeSetup, TouchableOpacityCustomized, ModalCustomized2 } from "@/components/customized/MyComponents";
import { SET_USER } from "@/assets/context/actions/userActions";
import { settingData, referralOption } from "@/assets/database/settingData";


const PasswordSettingsScreen = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const dispatch   = useDispatch()
  useInactivityLogout(10);
  const offlineID = Constants?.expoConfig?.extra?.offlineID

  const subscriptionStatus = useSelector((state) => state.subscription.status);
  const active = subscriptionStatus?.entitlements?.active?.["pro"]?.isActive ?   true : false
  // const active = true
  const user = useSelector((state) => state.user.user); 

  

  const bottomSheetRef = useRef(null);
  const openBottomSheet = (option) => {
    bottomSheetRef.current?.snapToIndex(2); setBottomSheetTitle(option?.title); setBottomSheetImage(option?.image);
  };
  const closeBottomSheet = () => { bottomSheetRef.current?.close(); };
  const [bottomSheetTitle, setBottomSheetTitle] = useState("Change Settings");
  const [bottomSheetImage, setBottomSheetImage] = useState(require("@/assets/images/settings-images/password.png"))
  const [disableButton, setDisableButton] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalDescription, setModalDescription] = useState("")

  // ==== 2. Change password ===============================================================
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const changePasswordFunction = async () => {
    if ((oldPassword?.length >= 8) && (newPassword?.length >= 8)) {
      try { 
        setDisableButton(true);
        await signInWithEmailAndPassword(authSTUDENTS, user?.email, oldPassword);
        const userCredential = authSTUDENTS.currentUser;
        await updatePassword(userCredential, newPassword)
        await updateDoc(doc( dbSTUDENTS, "eduzolve-users", user?._id), {offlineID:  customEncrypt(newPassword, offlineID)});
        const verifiedData = await getDoc(doc(dbSTUDENTS, "eduzolve-users", user?._id,)); 
        LocalStorageEduZolvePasco(verifiedData?.data());
        setDisableButton(false); setOldPassword(""); setNewPassword(""); 
        setShowModal(true); setModalTitle("Successfully changed"); setModalDescription("Password has been change successfully");
      } catch (error) {
        setDisableButton(false)
        // alert("Something went wrong. \nYour old password is probably incorrect. If problem persist, logout and login again before changing the pasword. If you do not remember your password, logout and use the Forget password to resist your password" )
        setShowModal(true); setModalTitle("Password change failed"); setModalDescription("Your old password is probably incorrect. If you do not remember your password, logout and use the Forget password to reset your password");
      }
    } else {
      // alert("password should be at least 8 character")
      setShowModal(true); setModalTitle("Incorrect Password"); setModalDescription("Password must be filled or should be at least 8 character.");
     
    }
  }

  // ==== 3. Set passcode  ===============================================================
  const [shortPswd, setShortPswd] = useState("") 
  const updatePassCodeFunction = async () => {
    if (shortPswd?.length >= 4) {
      try {
        setDisableButton(true);
        await updateDoc(doc( dbSTUDENTS, "eduzolve-users", user?._id), {"shortPswd": shortPswd.trim()});
        const verifiedData = await getDoc(doc(dbSTUDENTS, "eduzolve-users", user?._id,)); 
        LocalStorageEduZolvePasco(verifiedData?.data());
        setDisableButton(false); setShortPswd(""); 
        setShowModal(true); setModalTitle("Successfully changed"); setModalDescription("Passcode has been set successfully");
      } catch (error) {
        setDisableButton(false);
        setShowModal(true); setModalTitle("Something went wrong"); setModalDescription(error?.message);
      }
    } 
  }

  // ==== 4. Add referral code  ===============================================================
  // const [referralCode, setReferralCode] = useState("eduzolve-danielbrobbe-cvwlklkkje");
  const [referralCode, setReferralCode] = useState("");
  const addReferralCodeFunction = async () => {
    if (referralCode) {
      try {
        setDisableButton(true);
          const docSnap = await getDoc(doc(dbTEACHERS, "referral-codes", referralCode,));
          if (docSnap?.data()?.accountReady) {
          const data = {name: user?.username,  date: `${Date.now()}`, referralCode: referralCode, aimAndVision: "We (EduZolve Oy) aim to provide the the best educational materials for J-H-S. and Senior High School Students and young professionals"};
          await setDoc(doc(dbTEACHERS, "eduzolve-referrals", docSnap?.data()?._id, "members", user?._id.slice(3, 13)), data);
          await updateDoc(doc( dbSTUDENTS, "eduzolve-users",  user?._id), { hasReferralCode: false, referralCode: referralCode});
          const updatedData = await getDoc(doc(dbSTUDENTS, "eduzolve-users",  user?._id));
          dispatch(SET_USER(updatedData.data()));
          LocalStorageEduZolvePasco(updatedData?.data());
          setShowModal(true); setModalTitle("Successfully added"); setModalDescription("Referal code '"+ referralCode + "' has been registered successfully");
          setReferralCode("");
        } else {
          // alert("Referral code is not ready. Contact the owner of the code");
          setShowModal(true); setModalTitle("Referral code inavailable"); setModalDescription("Referral code is not ready or currently unavailable. Contact the owner of the code");
        }
        setDisableButton(false); 
      } catch (error) {
        setDisableButton(false);
        setShowModal(true); setModalTitle("Something went wrong"); setModalDescription(error?.message);
      }
    } else {
      alert("Enter a referral code")
      setShowModal(true); setModalTitle("Empty field"); setModalDescription("Referral code field must be filled");
    }
  }

  // ==== 5. Delete account  ===============================================================
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteAccountPassword, setDeleteAccountPassword] = useState("")
  const deleteAccountFunction = async () => {
      if (deleteAccountPassword.trim()) {
        try {
          setDisableButton(true);
            await signInWithEmailAndPassword(authSTUDENTS, user?.email, deleteAccountPassword);
            setShowDeleteModal(true); setDisableButton(false);
        } catch (error) {
          setDisableButton(false);
          // alert("Something went wrong. Check your password or internet connection");
          setShowModal(true); setModalTitle("Something went wrong"); setModalDescription("Check your password or internet connection\n" + error?.message);
        }
      }
  }

  // ==== 6. Confirm delete account  ===============================================================
    const confirmDeleteAccountBtn = async () => {
      try {
        setDisableButton(true);
        setShowDeleteModal(false);
        const userDocRef = doc(dbSTUDENTS, 'eduzolve-users', user?._id);
        await deleteDoc(userDocRef);
        const currentUser = authSTUDENTS.currentUser 
        await currentUser?.delete();
        router.replace('/login');  
        setDisableButton(false);
        LocalStorageEduZolvePasco({});
        setShowModal(true); setModalTitle("Account deleted"); setModalDescription("You have successfully deleted your account. To get access again, you need to register" );
      } catch (error) {
        // alert("Something went wrong. Check your password or internet connection");
        setShowModal(true); setModalTitle("Something went wrong"); setModalDescription("Check your password or internet connection" );
        setDisableButton(false);
      }
    }
  

  return (
      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={80} style={{   flex: 1, }} >
          <View style={{flex: 1, justifyContent: "center",  width: "100%", alignSelf: "center", }}>
              
              <ScrollView style={{ width: "100%", alignSelf: "center", marginVertical: 0}} >
                  <View  style={{ flexDirection: 'row', padding: 5, alignSelf: "center",  borderRadius: 10, width: "90%", marginVertical: 10 }} >
                    <TitleAndDescription title="settings" titleFontSize={26} titleColor={colorScheme === "dark" ? "white" : "black"}/>
                    <TouchableOpacity disabled={active} onPress={() => { router.push('/payment') }} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10, marginHorizontal: 3,  backgroundColor: active ? "green" : "red", padding: 3 }}>
                      <Ionicons name={active ? 'lock-open' : 'lock-closed'}  size={24} color="white" style={{ }}/>
                      <Text style={{   fontFamily: "Kanit", fontSize: 8,  paddingHorizontal: 3, color:"white" }}>{ active ? "Active" : "Inactive"}{"\n"}Subscription</Text> 
                    </TouchableOpacity>
                  </View>
                  {( active === false ) && ( 
                    <EachSettings onPress={() => { router.push('/payment') }} title="Subscribe" description="Subscribe to unlock full access to all past questions and premium features" image={require("@/assets/images/settings-images/subscribe.png")}/>
                  )}  
                  {( active && user?.hasReferralCode ) && ( 
                    <EachSettings onPress={() => openBottomSheet(referralOption) } title="Add a referral code" description="Got a referral code? Add it here!" image={require("@/assets/images/settings-images/referral.png")}/>
                  )} 
                  { settingData?.map((option, index) => (
                    <View key={index}>
                        <EachSettings onPress={() => openBottomSheet(option)} title={option?.title} description={option?.description} image={option?.image}/>
                    </View>
                  ))}
              </ScrollView>

              <BottomSheetCustomized title={""} bottomSheetRef={bottomSheetRef} closeBottomSheet={closeBottomSheet}>
                <View style={{marginBottom: 100, width: "90%", alignSelf: "center"}}>
                  <TitleAndDescription title={bottomSheetTitle} titleFontSize={28} titleColor="green" titleAlign="center"/>
                  <View style={{ width: "100%", height: 200, borderColor: "#388e3c", paddingVertical: 1, alignItems: "center", justifyContent: "center", marginBottom: 20 }} >
                    <Image source={bottomSheetImage} style={{ width: "100%", height: "100%", borderRadius: 10, }} resizeMode="cover" />
                  </View>
                  { bottomSheetTitle === "change password" && (
                    <>
                      <TextInputCustomized title='Previous password'         value={oldPassword}        onChangeText={setOldPassword}       leftIcon={'lock-closed'} isSecure/>
                      <TextInputCustomized title='New password'              value={newPassword}        onChangeText={setNewPassword}       leftIcon={'lock-closed'} isSecure/>
                      <TouchableOpacityCustomized onPress={changePasswordFunction} disableButton={disableButton} />
                    </>
                  )}
                  { bottomSheetTitle === "forget password" && (
                    <>
                      <TitleAndDescription description="If you don’t remember your password, log out first and use the 'Forgot Password' feature to reset it."/>
                    </>
                  )}
                  { bottomSheetTitle === "set passcode" && (
                      <PasscodeSetup passcode={shortPswd} setPasscode={setShortPswd} onPress={updatePassCodeFunction} disableButton={disableButton} />
                  )}
            
                  { bottomSheetTitle === "add referral code" && (
                    <>
                      <TextInputCustomized title='Referral code'         value={referralCode}        onChangeText={setReferralCode}       leftIcon={'person'} />
                      <TouchableOpacityCustomized onPress={addReferralCodeFunction} disableButton={disableButton}/>
                    </>
                  )}
                  { bottomSheetTitle === "delete account" && (
                    <>
                      <TitleAndDescription description="To delete your account, provide your password first"/>
                      <TextInputCustomized title='Password'         value={deleteAccountPassword}        onChangeText={setDeleteAccountPassword}       leftIcon={'lock-closed'} isSecure/>
                      <TouchableOpacityCustomized onPress={deleteAccountFunction} disableButton={disableButton} />
                    </>
                  )}
                </View>
              </BottomSheetCustomized>

              <ModalCustomized2 isModalVisible={showDeleteModal} setIsModalVisible={setShowDeleteModal} > 
                <View style={{backgroundColor: "white", borderRadius: 20, width: "90%", alignSelf: "center", borderBottomLeftRadius: 20 }} >
                  <TitleAndDescription title="delete account?"/>
                  <TitleAndDescription description="Are you certain you want to delete your account? All your information will be permanently lost upon"/>
                  <View style={{ flexDirection: "row", }}> 
                    <TouchableOpacity onPress={() => { setShowDeleteModal(false); setDeleteAccountPassword("")  }} style={{  flex: 1,  justifyContent: "center", backgroundColor: "red", margin: 5, borderRadius: 10  }} >
                      <Text style={{textAlign: "center", fontSize: 16, padding: 5, fontFamily: "Kanit"}} >
                        Cancel
                      </Text>
                    </TouchableOpacity> 
                    <TouchableOpacity onPress={confirmDeleteAccountBtn} style={{  flex: 1,  justifyContent: "center", backgroundColor: "green", margin: 5, borderRadius: 10  }} >
                    <Text style={{textAlign: "center", fontSize: 16, padding: 5, fontFamily: "Kanit"}} >
                        Proceed
                      </Text>
                    </TouchableOpacity> 
                  </View>
                </View> 
              </ModalCustomized2>

              <ModalCustomized2 isModalVisible={showModal} setIsModalVisible={setShowModal}>
                <TitleAndDescription title={modalTitle} description={modalDescription}/>
              </ModalCustomized2>

          </View>
      </KeyboardAvoidingView>
  );
  };
  

const EachSettings = ({ title="Settings", onPress, description="", image=require("@/assets/images/splash/splash3.png")}) => {
  const colorScheme = useColorScheme();
  return (
    <View style={{width: '90%', marginBottom: 0, alignSelf: "center"}}>
      <TouchableOpacity style={[ {  marginVertical: 3, borderRadius: 10,  },]} onPress={onPress} >
        <View style={{ flexDirection: 'row', padding: 5, }} >
            <View style={{ width: 50, height: 50, borderColor: "#388e3c", paddingVertical: 1, alignItems: "center", justifyContent: "center", marginRight: 10 }} >
              <Image source={image} style={{ width: "100%", height: "100%", borderRadius: 30 }} resizeMode="cover" />
            </View>
            <View style={{ flex: 1 }} >
              <Text style={{ paddingLeft: 5, fontSize: 16,  marginBottom: 3, color: colorScheme === "dark" ? "white" : "black", fontFamily: "Kanit", textTransform: "uppercase" }}>{ title }</Text>
              <Text style={{ paddingLeft: 5, color: "gray",fontSize: 11, fontFamily: "Kanit",}}>{description}</Text>
              <View style={{ height: 1,  marginTop: 5, backgroundColor: colorScheme === "dark" ? "gray" : 'gray' }} /> 
            </View>
        </View>
      </TouchableOpacity>
    </View>
  )
};

export default PasswordSettingsScreen;