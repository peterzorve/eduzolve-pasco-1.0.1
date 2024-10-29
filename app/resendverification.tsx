// src/app/login.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import * as Device from 'expo-device'
import { dbSTUDENTS, authSTUDENTS } from '@/firebaseconfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";

import useInactivityLogout from '@/components/useInactivityLogout';




const ResendVerificationEmail = () => {
  const router = useRouter();
  useInactivityLogout(5 * 60 * 1000);  

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  const [emailIsEmpty, setEmailIsEmpty] = useState(false); 
  const [passwordIsEmpty, setPasswordIsEmpty] = useState(false);

  const [emailBorderRds, setEmailBorderRds] = useState("gray"); 
  const [passwordBorderRds, setPasswordBorderRds] = useState("gray");

  useEffect(() => {
    if ( emailIsEmpty  || passwordIsEmpty ) 
      { const timeout = setTimeout(() => { 
        setEmailIsEmpty(false);     setPasswordIsEmpty(false); 
        setEmailBorderRds("gray");  setPasswordBorderRds("gray"); 
      }, 2000); 
      return () => clearTimeout(timeout);
    }
  }, [emailIsEmpty, passwordIsEmpty ]);



  const capitalizeName = (text) => {  return text.toLowerCase().replace(/(^\w{1})|(\s\w{1})/g, match => match.toUpperCase()); }
    

  // === Customize Signin Button ==================================================================
  const [buttontext, setButtonText] = useState("Resend");
  const [disableButton, setDisableButton] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  


  const togglePasswordVisibility = () => {  setIsPasswordVisible(!isPasswordVisible); };

  const RegisterButton = async ()  => {
    if (!email) { setEmailIsEmpty(true); setEmailBorderRds("red")}
    if (!password) { setPasswordIsEmpty(true);  setPasswordBorderRds("red")}
 
    if ( email.trim() && password ) { 
      setDisableButton(true);
      setButtonText("Please wait!!!")
        try {
          // const userCredential = await createUserWithEmailAndPassword(authTEACHERS, email, password)
          const userCredential = await signInWithEmailAndPassword(authSTUDENTS, email, password);
          await sendEmailVerification(userCredential?.user); 

          alert("Check your email and verify your account to proceed")
          setDisableButton(false); setEmail("");  setPassword("");   setButtonText("Resend"); 
        }
        catch (error) { 
            setDisableButton(false); setButtonText("Resend")
            if (error?.message.includes("auth/email-already-in-use")) {  alert("Email already in use. Login instead") } 
            else if (error?.message.includes("auth/invalid-email")) { alert("Invalid email address") } 
            else { alert("Something went wrong!!!\nCheck your email and password. \nIf you do not have an account you must create one first" )  }
        }
      }
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "white", }}>
        <View style={{backgroundColor: "white", width: "100%", alignSelf: "center",  borderRadius: 5, }}>

    

            <View  style={styles.textheader}>
                <Text style={{ fontFamily: "Kanit", fontSize: 14, marginTop: 20 }} >Email address</Text>
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

            <TouchableOpacity onPress={RegisterButton} disabled={disableButton} style={{padding: 8, backgroundColor: disableButton ? "gray" : "#2F5597", width: "80%", alignSelf: "center", margin: 5, borderRadius: 10}} >
                <Text style={{textAlign: "center", color: "white", fontFamily: "Kanit",}}>{buttontext}</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={{alignSelf: "center", margin: 8, padding: 8, width: "80%", }} onPress={() => {router.back()}}> 
              <Text  style={{fontFamily: "Kanit", textAlign: "center"}}>Go back</Text>  
            </TouchableOpacity>

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

export default ResendVerificationEmail;
