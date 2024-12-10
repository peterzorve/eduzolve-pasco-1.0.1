import { View, Text, Image, useWindowDimensions,  ScrollView, StyleSheet, KeyboardAvoidingView, Platform, ImageBackground, TextInput, TouchableOpacity, useColorScheme } from "react-native";
import React, { useState, useEffect, useRef,   } from "react";
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from "react-redux"; 
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from 'expo-router';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Font from 'expo-font';
import useInactivityLogout from '@/components/useInactivityLogout';
// import { FontAwesome } from 'react-native-vector-icons';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, updatePassword, getAuth   } from "firebase/auth"; 
// import {  } from "firebase/auth"


import { appSTUDENTS, dbSTUDENTS, authSTUDENTS } from '@/firebaseconfig';

// import EduZolveLogo from "../../../assets/eduzolvereport-logo-black.png"
// import { db, auth } from "../../../firebaseConfig";
// import { SET_USER } from "../../context/actions/userActions";
import { SET_USER } from "@/assets/context/actions/userActions";




// const  
const PasswordSettingsScreen = () => {
    // const {height}   = useWindowDimensions()
    // const navigation = useNavigation();
    const router = useRouter();
    const colorScheme = useColorScheme();
    const dispatch   = useDispatch()
    useInactivityLogout(10);

    const subscriptionStatus = useSelector((state) => state.subscription.status);
    const active = subscriptionStatus?.entitlements?.active?.["pro"]?.isActive ?   true : false
    const expirationDateMillis = subscriptionStatus?.entitlements?.active?.["pro"]?.expirationDateMillis
    const originalPurchaseDateMillis = subscriptionStatus?.entitlements?.active?.["pro"]?.originalPurchaseDateMillis

    // const auth = getAuth()

    const user = useSelector((state) => state.user.user); 


  
  
  
  
    // ==============================================================================================================================================================
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => { 
      setIsPasswordVisible(!isPasswordVisible); 
    };
  




  

  

        // ==============================================================================================================================================================
        const[digit1,  setDigit1]  = useState("");
        const[digit2,  setDigit2]  = useState("");
        const[digit3,  setDigit3]  = useState("");
        const[digit4,  setDigit4]  = useState("");
        const[digit5,  setDigit5]  = useState("");
        const[digit6,  setDigit6]  = useState("");
        const[digit7,  setDigit7]  = useState("");
        const[digit8,  setDigit8]  = useState("");
        const[digit9,  setDigit9]  = useState("");
        const[digit10, setDigit10] = useState("");
        const[digit11, setDigit11] = useState("");
        const[digit12, setDigit12] = useState("");
    
    
        const input1Ref = useRef(null);
        const input2Ref = useRef(null);
        const input3Ref = useRef(null);
        const input4Ref = useRef(null);
        const input5Ref = useRef(null);
        const input6Ref = useRef(null);
        const input7Ref = useRef(null);
        const input8Ref = useRef(null);
        const input9Ref = useRef(null);
        const input10Ref = useRef(null);
        const input11Ref = useRef(null);
        const input12Ref = useRef(null);
    // ==============================================================================================================================================================
    const [selectPasswordShort, setSelectPasswordShort] = useState(false)
    const [selectPasswordLong, setSelectPasswordLong] = useState(false)

    const selectPasswordShortBtn = () => {
      setSelectPasswordShort(!selectPasswordShort); 
      setSelectPasswordLong(false);
      setIsForgetPasscode(false);
    }


    const [disableShortPasswordButton, setDisableShortPasswordButton] = useState(false)
    const shortPasswordSubmitBtn = async () => {
      if (user?.shortPswd) {
        if (digit1 && digit2 && digit3 && digit4 && digit5 && digit6 && digit7 && digit8 && digit9 && digit10 && digit11 && digit12 ) {
          let previousSavedPassword = user?.shortPswd;
          let checkPassword = digit1 + digit2 + digit3 + digit4;
          if (checkPassword === previousSavedPassword) {
            if ((digit5 === digit9) && ((digit6 === digit10) && (digit7 === digit11) && (digit8 === digit12))) {
              let shortPswd = digit5 + digit6 + digit7 + digit8
      
                try {
                  setDisableShortPasswordButton(true)
                  await updateDoc(doc( dbSTUDENTS, "eduzolve-users", user?._id), {"shortPswd": shortPswd.trim()});
                  const updatedData = await getDoc(doc( dbSTUDENTS, "eduzolve-users", user?._id));
                  dispatch(SET_USER(updatedData.data()));
                  const jsonValue = JSON.stringify(updatedData.data());
                  AsyncStorage.setItem('eduzolveReportUsersLocalStorage', jsonValue); 
                  setDigit1(""); setDigit2(""); setDigit3(""); setDigit4(""); setDigit5(""); setDigit6(""); setDigit7(""); setDigit8(""); setDigit9(""); setDigit10(""); setDigit11(""); setDigit12("");
                  alert("Update successful.\nYour new short password is " + shortPswd + "\nFor security reasons, you may need to log in using your email and password before the passcode becomes active.")
                  setSelectPasswordShort(false); 
                  setDisableShortPasswordButton(false);
                } catch (error) {
                alert("Error: Update unsuccessful. Try again later " + error.message);
                setDisableShortPasswordButton(false);
              }
              } else {
                alert("New password and confirmed new password mismatched");
              }
            } else {
            alert("Previous password is incorrect");
          }
        } else {
          alert("Enter the the colums");
        }
      } else {
        if (digit5 && digit6 && digit7 && digit8 && digit9 && digit10 && digit11 && digit12 ) {
          if ((digit5 === digit9) && ((digit6 === digit10) && (digit7 === digit11) && (digit8 === digit12))) {
            let shortPswd = digit5 + digit6 + digit7 + digit8
            try {
              setDisableShortPasswordButton(true);

              // await updateDoc(doc( db, "eduzolvePastQuoClients", "profile",  "profile", user?._id), {"shortPswd": shortPswd.trim()})
              // const updatedData = await getDoc(doc(db, "eduzolvePastQuoClients", "profile",  "profile", user?._id)) 

              await updateDoc(doc( dbSTUDENTS, "eduzolve-users",  user?._id), {"shortPswd": shortPswd.trim()});
              const updatedData = await getDoc(doc(dbSTUDENTS, "eduzolve-users",  user?._id));

              dispatch(SET_USER(updatedData.data()));
              const jsonValue = JSON.stringify(updatedData.data());
              AsyncStorage.setItem('eduzolveReportUsersLocalStorage', jsonValue); 
              setDigit5(""); setDigit6(""); setDigit7(""); setDigit8(""); setDigit9(""); setDigit10(""); setDigit11(""); setDigit12("");
              setDisableShortPasswordButton(false)
              alert("Update successful.\nYour new short password is " + shortPswd + "\nFor security reasons, you may need to logout first and then login again using your email and password before the passcode becomes active.")
            } catch (error) {
       
              alert("Update unsuccessful. \nTry again later");
              setDisableShortPasswordButton(false);
            }
          } else {
            alert("Passcode mismatch");
          }
        } else {
          alert("Enter the the colums");
        }
      } 
    }


    const selectPasswordLongBtn = () => {
      setSelectPasswordShort(false); 
      setSelectPasswordLong(!selectPasswordLong);
      setIsForgetPasscode(false);
    }


    const cancelSubmitBtn = () => {
      setSelectPasswordShort(false); 
      setSelectPasswordLong(false);
      setIsForgetPasscode(false);
    }

  
    // ==============================================================================================================================================================
    const handleTextChange = (text, setDigit, nextInputRef) => {
      const formattedText = text.replace(/[^0-9]/g, '');
      setDigit(formattedText);
      if ( formattedText.length === 1) { nextInputRef.current.focus(); }
    };
  



  
    // ==============================================================================================================================================================
    const [previousPasswordLong, setPreviousPasswordLong] = useState("")
    const [newPasswordLong, setNewPasswordLong]  = useState("") 
    const [confirmNewPasswordLong, setConfirmNewPasswordLong] = useState("") 
    const [disableLongPasswordButton, setDisableLongPasswordButton] = useState(false);



    const [isLongpswdFilled, setIsLongPswdFilled] = useState(false)
    useEffect(() => {
        if ( previousPasswordLong  && newPasswordLong && confirmNewPasswordLong) {
            setIsLongPswdFilled(true)
        } else {
            setIsLongPswdFilled(false)
        }
        }, [previousPasswordLong, newPasswordLong, confirmNewPasswordLong]);
  

    const [isShortPassCodeFilled, setIsShortPassCodeFilled] = useState(false)
    useEffect(() => {
      if (user?.shortPswd) {
        if (digit1 && digit2 && digit3 && digit4 && digit5 && digit6 && digit7 && digit8 && digit9 && digit10 && digit11 && digit12 ) {
          setIsShortPassCodeFilled(true)
        } else {
          setIsShortPassCodeFilled(false)
        }
      } else {
        if (digit5 && digit6 && digit7 && digit8 && digit9 && digit10 && digit11 && digit12 ) {
          setIsShortPassCodeFilled(true)
        } else {
          setIsShortPassCodeFilled(false)
        }
      }
    }, [digit1, digit2, digit3, digit4, digit5, digit6, digit7, digit8, digit9, digit10, digit11, digit12]);


    useEffect(() => {
      if (selectPasswordShort === false) {
        setDigit1(""); setDigit2(""); setDigit3(""); setDigit4(""); setDigit5(""); setDigit6(""); setDigit7(""); setDigit8(""); setDigit9(""); setDigit10(""); setDigit11(""); setDigit12("");
      }
      if (selectPasswordLong === false) {
        setPreviousPasswordLong(""); setNewPasswordLong(""); setConfirmNewPasswordLong("");
      }
    }, [selectPasswordShort, selectPasswordLong]);


        // const [selectPasswordShort, setSelectPasswordShort] = useState(false)
        // const [selectPasswordLong, setSelectPasswordLong] = useState(false)

    const changeLongPasswordBtn = async () => {
      if (previousPasswordLong.trim() && newPasswordLong.trim() && confirmNewPasswordLong.trim()) {
        if (newPasswordLong === confirmNewPasswordLong ) {
          if (newPasswordLong?.length > 7 ) {
            try { 
              setDisableLongPasswordButton(true)
              await signInWithEmailAndPassword(authSTUDENTS, user?.email, previousPasswordLong)
              const userCredential = authSTUDENTS.currentUser  // 00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
              
              await updatePassword(userCredential, newPasswordLong)
              alert("Password has successfully been changed")
              setPreviousPasswordLong("");
              setNewPasswordLong("");
              setConfirmNewPasswordLong("");
              setDisableLongPasswordButton(false)
            } catch (error) {
              alert("Something went wrong. \nYour old password is probably incorrect. If problem persist, logout and login again before changing the pasword. If you do not remember your password, logout and use the Forget password to resist your password" )
              setDisableLongPasswordButton(false)
            }
          
          } else {
            alert("New password must be at least 8 characters")
          }
        } else {
          alert("New password and confirm new password mismatched")
        }
      } else {
        alert("All columns must be filled")
      }
    }

    const [isForgetPasscode, setIsForgetPasscode] = useState(false)
    const [passcodeForget, setPasscodeForget] = useState("")
    const [passcodeForgetEmpty, setPasscodeForgetEmpty] = useState(false)
    const [disablePasscodeFogetBtn, setDisablePasscodeFogetBtn] = useState(false)
    const [showPasscode, setShowPasscode] = useState("")

    const forgetPasscode = async () => {
      if (passcodeForget) {
        setDisablePasscodeFogetBtn(true)
    
        try {
          await signInWithEmailAndPassword(authSTUDENTS, user?.email, passcodeForget)
     
          setShowPasscode(user?.shortPswd);
          setDisablePasscodeFogetBtn(false);
          setPasscodeForget("")
        } catch (error) {
          if (error?.message.includes("auth/too-many-requests")) {
            alert("Too many wrong attempts. Try again after 1 or 2 minutes")
          } else {
            alert("Something went wrong. \nIf you have forgotten your password, log out first and then use the 'Forgot password' button.")
          }
          setDisablePasscodeFogetBtn(false)
        }
      } else {
        setPasscodeForgetEmpty(true)
      }
    }

    useEffect(() => {
      if ( showPasscode || passcodeForgetEmpty  ) 
          { const timeout = setTimeout(() => { 
            setShowPasscode("");  
            setPasscodeForgetEmpty(false);
            // setIsForgetPasscode(false)
          }, 2000); 
          return () => clearTimeout(timeout);
        }
      }, [showPasscode, passcodeForgetEmpty]);

      useEffect(() => {
        if ( showPasscode && showPasscode === user?.shortPswd  ) 
            { const timeout = setTimeout(() => { 
              setIsForgetPasscode(false)
            }, 2000); 
            return () => clearTimeout(timeout);
          }
        }, [showPasscode]);
  



    const focusSelectedColor =  "#bfbfbf"  // "#43cc98"
    const unfocusSelectedColor = "#e4e4e4"  // ? "#5f985e" :
    const focusTextColor = "black"
    const unfocusTextColor = "black"  // ? "#5f985e" :


    
  
      // ==============================================================================================================================================================
    return (
        <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={80} style={{   flex: 1, }} >
            <View style={{flex: 1, justifyContent: "center",  width: "100%", alignSelf: "center", }}>
                <ScrollView style={{ width: "100%", alignSelf: "center", marginVertical: 0}} >
                    
                    <View  style={{ flexDirection: 'row', padding: 5, alignSelf: "center",  borderRadius: 10, width: "90%", marginVertical: 10 }} >
                      <View style={{ flex: 1 }} >
                        <Text style={{ paddingLeft: 5, fontSize: 28,  marginBottom: 3, color:  colorScheme === "dark" ? "white" : "black", fontFamily: "Kanit" }}>Settings</Text>
                      </View>
                      {/* <View style={{ flex: 1, justifyContent: "center", }} >
                          <Text style={{fontFamily: "Kanit", textDecorationLine: "underline", marginBottom: 10,  fontSize: 18, color: colorScheme === "dark" ? "white" : "black" }} >
                            Note 
                          </Text>
                      </View> */}
                      
                      <TouchableOpacity disabled={active} onPress={() => { router.push('/payment') }} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10, marginHorizontal: 3,  backgroundColor: active ? "green" : "red", padding: 3 }}>
                        <Ionicons name={active ? 'lock-open' : 'lock-closed'}  size={24} color="white" style={{ }}/>
                        <Text style={{   fontFamily: "Kanit", fontSize: 8,  paddingHorizontal: 3, color:"white" }}>{ active ? "Active" : "Inactive"}{"\n"}Subscription</Text> 
                      </TouchableOpacity>
                    </View>

                    <View style={{ width: "90%", alignSelf: "center", marginVertical: 10 }}>
                        {/* <Text style={{fontFamily: "Kanit", marginBottom: 10, textAlign: "center", fontSize: 20, color: colorScheme === "dark" ? "white" : "black" }} >
                          Password settings
                        </Text> */}
                        <Text style={{fontFamily: "Kanit",  textAlign: "center", fontSize: 13, color: colorScheme === "dark" ? "white" : "black" }} >
                          Setting up a 4-digit passcode allows you to quickly log in without the hassle of entering your email and password each time.
                          {"\n"}Update your login password by clicking the "Login Password" button. 
                        </Text>
                    </View>

                    {user?.hasReferralCode && (
                        <View style={[{alignSelf: "center", flexDirection: "row", marginTop: 10, width: "80%"}]}>
                            <TouchableOpacity onPress={() => {router.push('/addreferralcode');}} style={{ paddingHorizontal: 15,  alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 3, backgroundColor: unfocusSelectedColor,  margin: 3, borderRadius: 10, flexGrow: 1 }} >
                              <Text style={{ fontSize: 12, color: (unfocusTextColor), padding: 3, textAlign: "center", fontFamily: "Kanit", paddingHorizontal: 5 }}>Add referral code</Text>
                            </TouchableOpacity>         
                        </View>
                    )}

                    <View style={[{alignSelf: "center", flexDirection: "row", marginTop: 10, width: "80%"}]}>
                        <TouchableOpacity onPress={selectPasswordShortBtn} style={{ paddingHorizontal: 15,  alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 3, backgroundColor: (selectPasswordShort === false ? unfocusSelectedColor : focusSelectedColor), margin: 3, borderRadius: 10, flexGrow: 1 }} >
                                <Text style={{ fontSize: 12,  color: (selectPasswordShort  ? focusTextColor :  unfocusTextColor), padding: 3, textAlign: "center", fontFamily: "Kanit", paddingHorizontal: 5  }}>4-digit pass code</Text>
                            {/* </View> */}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={selectPasswordLongBtn} style={{ paddingHorizontal: 15,  alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 3, backgroundColor: (selectPasswordLong === false ? unfocusSelectedColor : focusSelectedColor),  margin: 3, borderRadius: 10, flexGrow: 1 }} >
                                <Text style={{ fontSize: 12, color: (selectPasswordLong   ? focusTextColor :  unfocusTextColor), padding: 3, textAlign: "center", fontFamily: "Kanit", paddingHorizontal: 5 }}>Login password</Text>
                        </TouchableOpacity>         
                    </View>
                    

                  { isForgetPasscode && (
                      <View style={{  width: "82%", justifyContent: "center", alignSelf: "center", marginVertical: 10}}>
                        <View style={{  alignSelf: "center", marginTop: 10}}>
                            {showPasscode && showPasscode?.length === 4 && (
                              <>
                                <Text style={{ fontFamily: "Kanit", textAlign: "center", fontSize: 12, color: colorScheme === "dark" ? "white" : "black" }} >Your login passcode is</Text>
                                <Text style={{ fontFamily: "Kanit", textAlign: "center", fontSize: 24, color: colorScheme === "dark" ? "white" : "black" }} >{showPasscode}</Text>
                              </>


                            )}
                            <Text style={{ fontFamily: "Kanit", fontSize: 12, color: colorScheme === "dark" ? "white" : "black" }} >Enter your old password</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: passcodeForgetEmpty ? 2 : 0.5, borderColor: passcodeForgetEmpty ? "red" :  "gray", borderRadius: 20,  alignSelf: "center", padding: 5,  backgroundColor: "white"}}>
                                <Ionicons name={isPasswordVisible ? 'lock-open' : "lock-closed"}  size={20} color={"gray"} style={{ marginHorizontal: 5, }}/>
                                <TextInput style={{   flex: 1, }} secureTextEntry={!isPasswordVisible} placeholder="Previous password" value={passcodeForget.replace(" ", "")} onChangeText={(text) => setPasscodeForget(text.replace(" ", ""))}/>
                                <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color={"gray"} onPress={togglePasswordVisibility} style={{ marginRight: 10 }}/>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginVertical: 10,  alignSelf: "center",  }} >
                            <TouchableOpacity  style={{ backgroundColor: disablePasscodeFogetBtn ? "#c4c4c4" : "#99c821", padding: 5, borderRadius: 20,  alignItems: "center", flexGrow: 1  }}  onPress={ forgetPasscode } disabled={disablePasscodeFogetBtn} >
                                <Text style={{color: "black", fontSize: 14, paddingVertical: 5, fontFamily: "Kanit"}}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ justifyContent: "center", flex: 1 }} onPress={() => { setIsForgetPasscode(!isForgetPasscode); setPasscodeForget(""); setSelectPasswordShort(true) }}> 
                          <Text  style={{  fontFamily: "Kanit", color: "red", textAlign: "center"  }}>Cancel</Text> 
                      </TouchableOpacity>
                    </View>
                  )}


                        {/* 2. ====================================================================================================================================================================================================== */}
                        { selectPasswordShort && (
               
 

                            <View style={{  width: "90%", alignSelf: "center", marginVertical: 10}}>
                    

                                <View  style={{  width: "90%", alignSelf: "center",  margin: 5, flexDirection: "row", }}>
                                  {user?.shortPswd ? (
                                    <TouchableOpacity style={{ justifyContent: "center", flex: 1 }} onPress={() => { setIsForgetPasscode(!isForgetPasscode); setSelectPasswordShort(false);  setSelectPasswordLong(false);  }}> 
                                        <Text  style={{ fontFamily: "Kanit", color: colorScheme === "light" ? "black" : "white", padding: 8 }}>Forgot passcode </Text> 
                                    </TouchableOpacity>

                                  ) : (
                                    <View style={{ justifyContent: "center", flex: 1 }}  > 
                                      <Text  style={{ fontFamily: "Kanit", color: "red"  }}> </Text> 
                                  </View>
                                  )}
                                    <TouchableOpacity  onPress={cancelSubmitBtn} style={{  alignSelf: "center", padding: 5, margin: 1,  justifyContent: "flex-end"}}>
                                        <Ionicons name={ 'close'} size={30} color={ colorScheme === "dark" ? "white" : "black" } style={{ }}/>
                                    </TouchableOpacity>
                                </View>


                            {user?.shortPswd && (
                                <>
                                  <View style={{ width: "90%", alignSelf: "center", marginTop: 10 }}>
                                      <Text style={{fontFamily: "Kanit", paddingLeft: 5, fontSize: 13, color: colorScheme === "dark" ? "white" : "black" }} >Enter your previous pass code</Text>
                                  </View>
                                  <View style={{ flexDirection: 'row',  flexGrow: 1, width: "90%", alignSelf: "center", borderRadius: 10 }}>
                                      <View style={{ borderColor: 'gray', borderWidth: 0.5, backgroundColor: "white", flexGrow:1, borderRadius: 20,   paddingHorizontal: 5, flexGrow: 1, marginRight: 5,  padding: 5, margin: 2}}>
                                          <TextInput style={{ flex: 1, textAlign: "center",  }} maxLength={1} secureTextEntry={!isPasswordVisible}  value={digit1} keyboardType="numeric" ref={input1Ref} onChangeText={(text) => handleTextChange(text, setDigit1, input2Ref)} autoFocus/>
                                      </View>
                                      <View style={{ borderColor: 'gray', borderWidth: 0.5, backgroundColor: "white",  flexGrow:1, borderRadius: 20,  paddingHorizontal: 5, flexGrow: 1, marginHorizontal: 5,  padding: 5, margin: 2}}>
                                          <TextInput style={{ flex: 1, textAlign: "center" }} maxLength={1} secureTextEntry={!isPasswordVisible}  value={digit2} keyboardType="numeric" ref={input2Ref} onChangeText={(text) => handleTextChange(text, setDigit2, input3Ref)}/>
                                      </View>
                                      <View style={{ borderColor: 'gray', borderWidth: 0.5, backgroundColor: "white", flexGrow:1, borderRadius: 20,   paddingHorizontal: 5, flexGrow: 1, marginHorizontal: 5,  padding: 5, margin: 2}}>
                                          <TextInput style={{ flex: 1, textAlign: "center" }} maxLength={1} secureTextEntry={!isPasswordVisible}  value={digit3} keyboardType="numeric" ref={input3Ref} onChangeText={(text) => handleTextChange(text, setDigit3, input4Ref)}/>
                                      </View>
                                      <View style={{ borderColor: 'gray', borderWidth: 0.5, backgroundColor: "white",  flexGrow:1, borderRadius: 20,  paddingHorizontal: 5, flexGrow: 1, marginHorizontal: 5,  padding: 5, margin: 2}}>
                                          <TextInput style={{ flex: 1, textAlign: "center" }} maxLength={1} secureTextEntry={!isPasswordVisible}  value={digit4} keyboardType="numeric" ref={input4Ref}  onChangeText={(text) => handleTextChange(text, setDigit4, input5Ref)}/>
                                      </View>
                                      <View style={{ padding: 5, }}>
                                        <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={26} color={colorScheme === "dark" ? "white" : "gray"} onPress={togglePasswordVisibility} style={{ }}/>
                                    </View>
                                  </View>
                                </>
                              )}


                                <View style={{ flexDirection: 'row', flexGrow: 1, width: "90%", alignSelf: "center", marginTop: 10 }}>
                                  <Text style={{fontFamily: "Kanit", paddingLeft: 5, fontSize: 13, color: colorScheme === "dark" ? "white" : "black" }} >Enter your new pass code</Text>
                              </View>
                              <View style={{ flexDirection: 'row',  flexGrow: 1, width: "90%", alignSelf: "center", borderRadius: 10 }}>
                                  <View style={{ borderColor: 'gray', borderWidth: 0.5, backgroundColor: "white", flexGrow:1, borderRadius: 20,    paddingHorizontal: 5, flexGrow: 1, marginRight: 5, padding: 5, margin: 2}}>
                                      <TextInput style={{ flex: 1, textAlign: "center",  }} maxLength={1} secureTextEntry={!isPasswordVisible}  value={digit5} keyboardType="numeric" ref={input5Ref} onChangeText={(text) => handleTextChange(text, setDigit5, input6Ref)} autoFocus/>
                                  </View>
                                  <View style={{ borderColor: 'gray', borderWidth: 0.5, backgroundColor: "white",  flexGrow:1, borderRadius: 20,   paddingHorizontal: 5, flexGrow: 1, marginHorizontal: 5, padding: 5, margin: 2}}>
                                      <TextInput style={{ flex: 1, textAlign: "center" }} maxLength={1} secureTextEntry={!isPasswordVisible}  value={digit6} keyboardType="numeric" ref={input6Ref} onChangeText={(text) => handleTextChange(text, setDigit6, input7Ref)}/>
                                  </View>
                                  <View style={{ borderColor: 'gray', borderWidth: 0.5, backgroundColor: "white", flexGrow:1, borderRadius: 20,    paddingHorizontal: 5, flexGrow: 1, marginHorizontal: 5, padding: 5, margin: 2}}>
                                      <TextInput style={{ flex: 1, textAlign: "center" }} maxLength={1} secureTextEntry={!isPasswordVisible}  value={digit7} keyboardType="numeric" ref={input7Ref} onChangeText={(text) => handleTextChange(text, setDigit7, input8Ref)}/>
                                  </View>
                                  <View style={{ borderColor: 'gray', borderWidth: 0.5, backgroundColor: "white",  flexGrow:1, borderRadius: 20,   paddingHorizontal: 5, flexGrow: 1, marginHorizontal: 5, padding: 5, margin: 2}}>
                                      <TextInput style={{ flex: 1, textAlign: "center" }} maxLength={1} secureTextEntry={!isPasswordVisible}  value={digit8} keyboardType="numeric" ref={input8Ref}  onChangeText={(text) => handleTextChange(text, setDigit8, input9Ref)}/>
                                  </View>
                                  <View style={{ padding: 5, }}>
                                      <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={26} color={colorScheme === "dark" ? "white" : "gray"} onPress={togglePasswordVisibility} style={{ }}/>
                                  </View>    
                              </View>


                                <View style={{ flexDirection: 'row', flexGrow: 1, width: "90%", alignSelf: "center", marginTop: 10 }}>
                                  <Text style={{fontFamily: "Kanit", paddingLeft: 5, fontSize: 13, color: colorScheme === "dark" ? "white" : "black" }} >Repear to confirm the new pass code</Text>
                              </View>
                              <View style={{ flexDirection: 'row',  flexGrow: 1, width: "90%", alignSelf: "center", borderRadius: 10, }}>
                                  <View style={{ borderColor: 'gray', borderWidth: 0.5, backgroundColor: "white", flexGrow:1, borderRadius: 20,   paddingHorizontal: 5, flexGrow: 1, marginRight: 5,  padding: 5, margin: 2 }}>
                                      <TextInput style={{ flex: 1, textAlign: "center",  }} maxLength={1} secureTextEntry={!isPasswordVisible}  value={digit9} keyboardType="numeric" ref={input9Ref} onChangeText={(text) => handleTextChange(text, setDigit9, input10Ref)} autoFocus/>
                                  </View>
                                  <View style={{ borderColor: 'gray', borderWidth: 0.5, backgroundColor: "white",  flexGrow:1, borderRadius: 20,  paddingHorizontal: 5, flexGrow: 1, marginHorizontal: 5,  padding: 5, margin: 2}}>
                                      <TextInput style={{ flex: 1, textAlign: "center" }} maxLength={1} secureTextEntry={!isPasswordVisible}  value={digit10} keyboardType="numeric" ref={input10Ref} onChangeText={(text) => handleTextChange(text, setDigit10, input11Ref)}/>
                                  </View>
                                  <View style={{ borderColor: 'gray', borderWidth: 0.5, backgroundColor: "white", flexGrow:1, borderRadius: 20,   paddingHorizontal: 5, flexGrow: 1, marginHorizontal: 5,  padding: 5, margin: 2}}>
                                      <TextInput style={{ flex: 1, textAlign: "center" }} maxLength={1} secureTextEntry={!isPasswordVisible}  value={digit11} keyboardType="numeric" ref={input11Ref} onChangeText={(text) => handleTextChange(text, setDigit11, input12Ref)}/>
                                  </View>
                                  <View style={{ borderColor: 'gray', borderWidth: 0.5, backgroundColor: "white",  flexGrow:1, borderRadius: 20,  paddingHorizontal: 5, flexGrow: 1, marginHorizontal: 5,  padding: 5, margin: 2}}>
                                      <TextInput style={{ flex: 1, textAlign: "center" }} maxLength={1} secureTextEntry={!isPasswordVisible}  value={digit12} keyboardType="numeric" ref={input12Ref}  onChangeText={(text) => handleTextChange(text, setDigit12, user?.shortPswd ? input1Ref : input5Ref)}/>
                                  </View>
                                  <View style={{ padding: 5, }}>
                                      <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={26} color={colorScheme === "dark" ? "white" : "gray"} onPress={togglePasswordVisibility} style={{ }}/>
                                  </View>
                              </View>            

                            {isShortPassCodeFilled && (
                                <View style={{ flexDirection: "row", marginVertical: 10,  alignSelf: "center", width: "92%" }} >
                                    <TouchableOpacity  style={{marginHorizontal: 3, backgroundColor: disableShortPasswordButton ? "#c4c4c4" : "#99c821", padding: 5, borderRadius: 20,  alignItems: "center", flexGrow: 1  }}  onPress={ shortPasswordSubmitBtn } disabled={disableShortPasswordButton}>
                                        <Text style={{fontFamily: "Kanit", color: "black", fontSize: 16, paddingVertical: 5}}>Submit</Text>
                                    </TouchableOpacity>
                                </View>

                            )}

                       



                          </View>
       
                    )}

                        {/* 2. ====================================================================================================================================================================================================== */}
                        {/* <View style={{backgroundColor: "#e4e4e4", width: "90%", justifyContent: "center", alignSelf: "center", borderRadius: 20, marginTop: 20  }}> */}
                        {selectPasswordLong && (
                          <View style={{  width: "90%", alignSelf: "center", marginVertical: 10}}>
       
                            <View  style={{  width: "90%", alignSelf: "center",  margin: 5, flexDirection: "row", }}>
                  
                              <View style={{ justifyContent: "center", flex: 1, marginRight: 50 }}  > 
                                <Text  style={{ fontFamily: "Kanit", color: colorScheme === "light" ? "black" : "white"  }}>If you have forgotten your password, log out first and then use the 'Forgot password' button.</Text> 
                            </View>
                    
                              <TouchableOpacity  onPress={cancelSubmitBtn} style={{  alignSelf: "center", padding: 5,  margin: 1,  justifyContent: "flex-end"}}>
                                  <Ionicons name={ 'close'} size={30} color={ colorScheme === "dark" ? "white" : "black" } style={{ }}/>
                              </TouchableOpacity>
                          </View>



                            <View style={{  width: "100%", justifyContent: "center", alignSelf: "center", borderRadius: 20 }}>
                                <View style={{  width: "90%", alignSelf: "center", marginTop: 10}}>
                                    <Text style={{ fontFamily: "Kanit", fontSize: 12, color: colorScheme === "dark" ? "white" : "black" }} >Enter your old password</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0.5, borderColor: "gray", borderRadius: 10,  alignSelf: "center", padding: 5,  backgroundColor: "white"}}>
                                        <Ionicons name={isPasswordVisible ? 'lock-open' : "lock-closed"}  size={20} color={"gray"} style={{ marginRight: 10, }}/>
                                        <TextInput style={{   flex: 1, }} secureTextEntry={!isPasswordVisible} placeholder="Previous password" value={previousPasswordLong.replace(" ", "")} onChangeText={(text) => setPreviousPasswordLong(text.replace(" ", ""))}/>
                                        <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color={"gray"} onPress={togglePasswordVisibility} style={{ paddingRight: 10 }}/>
                                    </View>
                                </View>
                              <View style={{  width: "90%", alignSelf: "center", marginTop: 10}}>
                                    <Text style={{ fontFamily: "Kanit", fontSize: 12, color: colorScheme === "dark" ? "white" : "black" }} >Enter new password</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0.5, borderColor: "gray", borderRadius: 10,  alignSelf: "center", padding: 5,  backgroundColor: "white"}}>
                                        <Ionicons name={isPasswordVisible ? 'lock-open' : "lock-closed"}  size={20} color={"gray"} style={{ marginRight: 10, }}/>
                                        <TextInput style={{   flex: 1, }} secureTextEntry={!isPasswordVisible} placeholder="New password" value={newPasswordLong.replace(" ", "")} onChangeText={(text) => setNewPasswordLong(text.replace(" ", ""))}/>
                                        <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color={"gray"} onPress={togglePasswordVisibility} style={{ paddingRight: 10 }}/>
                                    </View>
                              </View>
                              <View style={{  width: "90%", alignSelf: "center", marginTop: 10, marginBottom: 15}}>
                                    <Text style={{ fontFamily: "Kanit", fontSize: 12, color: colorScheme === "dark" ? "white" : "black" }} >Confirm new password</Text>
                                  <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0.5, borderColor: "gray", borderRadius: 10,  alignSelf: "center", padding: 5,  backgroundColor: "white"}}>
                                      <Ionicons name={isPasswordVisible ? 'lock-open' : "lock-closed"}  size={20} color={"gray"} style={{ marginRight: 10, }}/>
                                      <TextInput style={{   flex: 1, }} secureTextEntry={!isPasswordVisible} placeholder="Confirm new password" value={confirmNewPasswordLong.replace(" ", "")} onChangeText={(text) => setConfirmNewPasswordLong(text.replace(" ", ""))}/>
                                      <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color={"gray"} onPress={togglePasswordVisibility} style={{ paddingRight: 10 }}/>
                                  </View>
                              </View>

                   
                              { isLongpswdFilled && (
                                <View style={{ flexDirection: "row", marginVertical: 10,  alignSelf: "center", width: "92%" }} >
                                    <TouchableOpacity  style={{marginHorizontal: 3, backgroundColor: disableLongPasswordButton ? "#c4c4c4" : "#99c821", padding: 5, borderRadius: 20,  alignItems: "center", flexGrow: 1  }}  onPress={ changeLongPasswordBtn } disabled={disableLongPasswordButton} >
                                        <Text style={{color: "black", fontSize: 16, paddingVertical: 5, fontFamily: "Kanit"}}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                              )}
                            </View>
                            </View>


 



                      )}


      
                </ScrollView>

            </View>

            </KeyboardAvoidingView>
        // </ImageBackground>
    );
  };
  
  
  const styles = StyleSheet.create({
    container: { flexDirection: 'row', borderColor: 'black', borderWidth: 0.5, backgroundColor: "white", backgroundColor: "white", borderRadius: 10, width: "70%", alignSelf: "center", padding: 5, margin: 5 },
    input: {  },
    icon: { marginRight: 10, },
    logo: { width: "70%",  maxWidth: 500,  maxHeight:200, marginTop: 100,  alignSelf: "center", backgroundColor: "white", padding: 20, borderRadius: 25 },

   

  
    triangle: { width: 0, height: 0, backgroundColor: 'transparent',  borderStyle: 'solid', borderBottomWidth: 30, borderBottomColor: "black", borderLeftWidth: 50, borderRightWidth: 50, borderLeftColor: 'transparent', borderRightColor: 'transparent',},


  })


export default PasswordSettingsScreen;
