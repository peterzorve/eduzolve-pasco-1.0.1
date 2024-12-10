// src/app/login.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import * as Device from 'expo-device'
import { dbSTUDENTS, authSTUDENTS } from '@/firebaseconfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";

import useInactivityLogout from '@/components/useInactivityLogout';




const RegisterScreen = () => {
  const router = useRouter();
  const {height}   = useWindowDimensions()

  useInactivityLogout(5);  


  const deviceModelName = Device?.modelName
  const deviceOsInternalBuildId = Device?.osInternalBuildId
  // const deviceSsVersion = Device?.osVersion







  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [passwordrepeat, setPasswordRepeat] = useState("");
  const [hasReferralCode, setHasReferralCode] = useState(false)
  const [hasReferralCodeSelected, setHasReferralCodeSelected] = useState("")



  const [usernameIsEmpty, setUsernameIsEmpty] = useState(false);
  const [emailIsEmpty, setEmailIsEmpty] = useState(false); 
  const [passwordIsEmpty, setPasswordIsEmpty] = useState(false);
  const [passwordrepeatIsEmpty, setPasswordRepeatIsEmpty] = useState(false); 
  // const [referralCodeIsEmpty, setReferralCodeIsEmpty] = useState(false);

  const [usernameBorderRds, setUsernameBorderRds] = useState("gray");
  const [emailBorderRds, setEmailBorderRds] = useState("gray"); 
  const [passwordBorderRds, setPasswordBorderRds] = useState("gray");
  const [passwordrepeatBorderRds, setPasswordRepeatBorderRds] = useState("gray"); 
  // const [referralCodeBorderRds, setReferralCodeBorderRds] = useState("gray");

  const [passwordMismatched, setPasswordMismatched] = useState(false);
  const [passwordIsLong, setPasswordIsLong] = useState(false);

  


  useEffect(() => {
    if (usernameIsEmpty  || emailIsEmpty  || passwordIsEmpty  || passwordrepeatIsEmpty || passwordMismatched || passwordIsLong ) 
      { const timeout = setTimeout(() => { 
        setUsernameIsEmpty(false);    setEmailIsEmpty(false);     setPasswordIsEmpty(false);    setPasswordRepeatIsEmpty(false);  setPasswordMismatched(false); setPasswordIsLong(false);
        setUsernameBorderRds("gray"); setEmailBorderRds("gray");  setPasswordBorderRds("gray"); setPasswordRepeatBorderRds("gray"); 
      }, 2000); 
      return () => clearTimeout(timeout);
    }
  }, [usernameIsEmpty, emailIsEmpty, passwordIsEmpty, passwordrepeatIsEmpty, passwordMismatched, passwordIsLong ]);



  const capitalizeName = (text) => {  return text.toLowerCase().replace(/(^\w{1})|(\s\w{1})/g, match => match.toUpperCase()); }
    

  // === Customize Signin Button ==================================================================
  const [buttontext, setButtonText] = useState("Register");
  const [disableButton, setDisableButton] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  


  const togglePasswordVisibility = () => {  setIsPasswordVisible(!isPasswordVisible); };

  const RegisterButton = async ()  => {
    if (!username) { setUsernameIsEmpty(true); setUsernameBorderRds("red")}
    if (!email) { setEmailIsEmpty(true); setEmailBorderRds("red")}
    if (!password) { setPasswordIsEmpty(true);  setPasswordBorderRds("red")}
    if (!passwordrepeat) { setPasswordRepeatIsEmpty(true);  setPasswordRepeatBorderRds("red")}
    // if (hasReferralCode && !referralCode) { setReferralCodeIsEmpty(true);  setReferralCodeBorderRds("red")}


    if (deviceModelName && deviceOsInternalBuildId) {
      if (username.trim() && email.trim() && password && passwordrepeat ) { 
        if (password === passwordrepeat) { 
          if (password.length < 8 ) { setPasswordIsLong(true);  setPasswordBorderRds("red"); setPasswordRepeatBorderRds("red");  } 

          

          else { 
            
              setDisableButton(true);
              setButtonText("Registering. Please wait!!!")
                try {
                  const userCredential = await createUserWithEmailAndPassword(authSTUDENTS, email, password)
             
                  
                  const data = { _id: userCredential?.user?.uid, username: capitalizeName(username.trim()),  email: email.trim().toLowerCase(),  dateRegister: `${Date.now()}`, emailVerified: userCredential?.user?.emailVerified,  shortPswd: "", 
                                  paidSubscription: false, paidAmount: 0.00, 
                                  // deviceModelName: deviceModelName, deviceOsInternalBuildId: deviceOsInternalBuildId, deviceSsVersion: deviceSsVersion, 
                                  
                                  deviceID: deviceModelName + deviceOsInternalBuildId, changeDevice: false, 
                                  hasReferralCode: hasReferralCode, referralCode: ""
                                } 

                  await setDoc(doc(dbSTUDENTS, "eduzolve-users", userCredential?.user?.uid,), data); 




                  await sendEmailVerification(userCredential?.user); 
                  alert("Check your email and verify your account to proceed")
                  setDisableButton(false);  
                  setUsername("");  setEmail("");  setPassword("");  setPasswordRepeat(""); setButtonText("Register"); setHasReferralCodeSelected("");
                  router.push('/login')
                }
                catch (error) { 
                    setDisableButton(false); setButtonText("Register")
                    if (error?.message.includes("auth/email-already-in-use")) {  alert("Email already in use. Login instead") } 
                    else if (error?.message.includes("auth/invalid-email")) { alert("Invalid email address") } 
                    else { alert("Something went wrong\n" + error?.message )  }
                  }
              }
        }
        else { 
            setPasswordMismatched(true); setPasswordBorderRds("red"); setPasswordRepeatBorderRds("red");
        }
      }
    } else {
      alert("Could not fetch device information. \nTry again later or try using another device")
    }



  }







  

 

  













  return (
        // <ImageBackground source={require('../../../assets/background/bg1.png')} style={styles.backgroundImage} >
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "black", }}>
   

        <View style={{backgroundColor: "white", width: "99%", alignSelf: "center", marginVertical: 0.005*height, borderRadius: 5, height: 0.9 * height}}>

            <View  style={[styles.textheader, {marginTop: 20,}]}>
                <Text style={{ fontFamily: "Kanit", fontSize: 14,  }} >Full name</Text>
            </View>
            <View style={[styles.container, {borderColor: usernameBorderRds, borderWidth: usernameBorderRds === "red"  ? 2 : 1 }]}>
                <Ionicons name={'person'}  size={20} color="gray" style={styles.icon}/>
                <TextInput style={[styles.input]}  placeholder="Full name" value={username}  onChangeText={(text) => setUsername( ( text )  )}/>
            </View>

            { usernameIsEmpty  && (
                <View style={{ width: "80%", alignSelf: "center", marginTop: -8}} >
                    <Text style={{color: "red",}} >Enter full name</Text>
                </View>
            )}

            <View  style={styles.textheader}>
                <Text style={{ fontFamily: "Kanit", fontSize: 14,  }} >Email address</Text>
            </View>
            <View style={[styles.container, {borderColor: emailBorderRds, borderWidth: emailBorderRds === "red" ? 2 : 1 }]}>
                <Ionicons name={'mail'}  size={20} color="gray" style={styles.icon}/>
                <TextInput style={styles.input}  placeholder="Email address" value={email.replace(" ", "")} onChangeText={(text) => setEmail(text.replace(" ", ""))}/>
            </View>

            { emailIsEmpty  && (
                <View style={{ width: "80%", alignSelf: "center", marginTop: -8}} >
                    <Text style={{color: "red", }} >Enter email address</Text>
                </View>
            )}


            <View  style={styles.textheader}>
                <Text style={{ fontFamily: "Kanit", fontSize: 14,  }} >Enter password</Text>
            </View>
            <View style={[styles.container, {borderColor: passwordBorderRds, borderWidth: passwordBorderRds === "red"  ? 2 : 1 }]}>
                <Ionicons name={isPasswordVisible ? 'lock-open': "lock-closed"}  size={20} color="gray" style={styles.icon}/>
                <TextInput style={styles.input} secureTextEntry={!isPasswordVisible} placeholder="Password" value={password.replace(" ", "")} onChangeText={(text) => setPassword(text.replace(" ", ""))}/>
                <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color="gray" onPress={togglePasswordVisibility} style={styles.icon}/>
            </View>

            { passwordIsEmpty  && (
                <View style={{ width: "80%", alignSelf: "center", marginTop: -8}} >
                    <Text style={{color: "red", }} >Enter password</Text>
                </View>
            )}

            <View  style={styles.textheader}>
                <Text style={{ fontFamily: "Kanit", fontSize: 14,  }} >Confirm password</Text>
            </View>
            <View style={[styles.container, {borderColor: passwordrepeatBorderRds, borderWidth: passwordrepeatBorderRds === "red" ? 2 : 1 }]}>
                <Ionicons name={isPasswordVisible ? 'lock-open': "lock-closed"}  size={20} color="gray" style={styles.icon}/>
                <TextInput style={styles.input} secureTextEntry={!isPasswordVisible} placeholder="Confirm password" value={passwordrepeat.replace(" ", "")} onChangeText={(text) => setPasswordRepeat(text.replace(" ", ""))}/>
                <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color="gray" onPress={togglePasswordVisibility} style={styles.icon}/>
            </View> 

            { passwordrepeatIsEmpty  && (
                <View style={{ width: "80%", alignSelf: "center", marginTop: -8}} >
                    <Text style={{color: "red", }} >Enter your confirm password</Text>
                </View>
            )}

            
            { passwordMismatched  && (
                <View style={{ width: "80%", alignSelf: "center", marginTop: -8, marginBottom: 10}} >
                    <Text style={{color: "red", }} >Password and confirm password do not match</Text>
                </View>
            )} 

            { passwordIsLong  && (
                <View style={{ width: "80%", alignSelf: "center", marginTop: -8, marginBottom: 10}} >
                    <Text style={{color: "red", }} >Password must be at least 8 characters</Text>
                </View>
            )}

            
            <View  style={[styles.textheader, {marginTop: 5}]}>
                <Text style={{ fontFamily: "Kanit", fontSize: 14,  }} >Do you have a referral code?</Text>
            </View>
            <View style={[{alignSelf: "center", flexDirection: "row",  width: "82%", marginBottom: hasReferralCodeSelected ? 0: 30}]}>
                <TouchableOpacity onPress={() => {setHasReferralCode(true); setHasReferralCodeSelected("yes"); }} style={{ paddingHorizontal: 15,  alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 3, backgroundColor: hasReferralCodeSelected === "yes" ? "green" : "#e4e4e4", margin: 3, borderRadius: 10, flexGrow: 1 }} >
                  <Text style={{ fontSize: 12,  color: "black", padding: 3, textAlign: "center", fontFamily: "Kanit", paddingHorizontal: 5  }}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setHasReferralCode(false); setHasReferralCodeSelected("no")}}   style={{ paddingHorizontal: 15,  alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 3, backgroundColor: hasReferralCodeSelected === "no" ? "green" : "#e4e4e4", margin: 3, borderRadius: 10, flexGrow: 1 }} >
                  <Text style={{ fontSize: 12, color: "black", padding: 3, textAlign: "center", fontFamily: "Kanit", paddingHorizontal: 5 }}>No</Text>
                </TouchableOpacity>         
            </View>
            { hasReferralCodeSelected === "yes" && (
              <View  style={[styles.textheader, {marginBottom: 30}]}>
                  <Text style={{ fontFamily: "Kanit", fontSize: 10,  }} >
                    * After registering and logging in, you can add the referral code by navigating to "Settings" and selecting "Add referral code." 
                    You have up to 7 days to add the referral code after logging in. 
                  </Text>
              </View>
            )}
            { hasReferralCodeSelected === "no" && (
              <View  style={[styles.textheader, {marginBottom: 30}]}>
                  <Text style={{ fontFamily: "Kanit", fontSize: 10,  }} >
                    * Not having a referral code will not affect your registration or login
                  </Text>
              </View>
            )}

     




            <TouchableOpacity onPress={RegisterButton} disabled={disableButton} style={{padding: 8, backgroundColor: disableButton ? "gray" : "#2F5597", width: "80%", alignSelf: "center", margin: 5, borderRadius: 20, borderWidth: 1, borderColor: "gray" }} >
                <Text style={{textAlign: "center", color: "white"}}>{buttontext}</Text>
            </TouchableOpacity>


            <TouchableOpacity  style={{alignSelf: "center", margin: 8, padding: 8}} onPress={() => {router.back()}}> 
              <Text  style={{fontFamily: "Kanit"}}>Already have an account? {" "}
                  <Text style={{color: "green", fontWeight: "bold"}} >Login</Text> 
              </Text>  
            </TouchableOpacity>

            <TouchableOpacity style={{alignSelf: "center", margin: 8, padding: 8, width: "80%" }} onPress={() => {router.push("/resendverification")}}> 
              <Text  style={{textAlign: "center", fontFamily: "Kanit"}}>
                  Didn't receive verification email? Resend 
              </Text>  
            </TouchableOpacity>



            <View style={{alignSelf: "center", margin: 30, padding: 5, position: "absolute", bottom: 0 }}>
                <TouchableOpacity onPress={() => {Linking.openURL('https://accounts.google.com/signup');}}> 
                  <Text  style={{textAlign: "center", fontFamily: "Kanit"}}>
                      If you do not have an email account, 
                      <Text style={{color: "red", }} > click here </Text> 
                      to create one first. 
                  </Text>  
                </TouchableOpacity>
            </View>          

            </View>

    </ScrollView>
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
    // borderColor: 'gray',
    // borderWidth: 1,
    borderRadius: 10,
    width: "80%",
    alignSelf: "center",
    padding: 5,
    marginHorizontal: 10,
    marginBottom: 10
  },
  input: {
    flex: 1,
    
  },
  icon: {
    marginRight: 10,
  },
  textheader : {  
    width: "80%", alignSelf: "center", borderRadius: 15,  
  }



});

export default RegisterScreen;
