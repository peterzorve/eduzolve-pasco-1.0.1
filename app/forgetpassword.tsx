// src/app/login.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { authSTUDENTS } from '@/firebaseconfig';
import {  sendPasswordResetEmail  } from "firebase/auth";

import useInactivityLogout from '@/components/useInactivityLogout';

const ForgetPassword = () => {
  const router = useRouter();
  const {height}   = useWindowDimensions()
  const [email, setEmail] = useState(""); 

  useInactivityLogout(3 * 60 * 1000);  // 30 minutes
  // === Customize Signin Button ==================================================================


  const [buttontext, setButtonText] = useState("Submit");
  const [disableButton, setDisableButton] = useState(false);   




  const [resetFailed, setResetFailed] = useState(false)
  const [resetFailedMessage, setResetFailedMessage] = useState("Reset failed")
  useEffect(() => {
    if ( resetFailed ) 
        { const timeout = setTimeout(() => { 
          setResetFailed(false)   
        }, 3000); 
        return () => clearTimeout(timeout);
      }
    }, [resetFailed]);


    

  const sendPasswordResetEmailBtn = async ()  => {
  if (email.trim()) {
    try {
      setDisableButton(true);
      await sendPasswordResetEmail(authSTUDENTS, email);
      alert('Password reset email sent successfully!'); 
      setEmail("")
      setDisableButton(false);
    } catch (error) {
      setDisableButton(false);
        setResetFailed(true);
        setResetFailedMessage('Error sending password reset email. Try again later')
    }
  } else {
    setResetFailed(true);
    setResetFailedMessage("Enter your email address");
  }
  }
  


  return (
    <ImageBackground source={require('../assets/images/background/background3.jpg')} style={styles.backgroundImage} >
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "rgba(0, 0, 0, 0.8)"}}>
        <View style={{backgroundColor: "white", width: "99%", alignSelf: "center", marginVertical: 0.005*height, borderRadius: 5, height: 0.98 * height}}>


            <View style={{  width: "90%", alignSelf: "center", marginTop: 40,  borderRadius: 15, marginBottom: 10}}>
                <Text style={{ fontFamily: "Kanit", fontSize: 14,  color: "black" }} >Email address</Text>
                <View style={[{ flexDirection: 'row', alignItems: 'center', borderColor: resetFailed ? "red" : 'gray', borderWidth: resetFailed ? 2 : 1, borderRadius: 10,   padding: 5, backgroundColor: "white", }]}>
                    <Ionicons name={'mail'}  size={20} color="gray" style={{ marginRight: 10, }}/>
                    <TextInput style={{   flex: 1, fontFamily: "Kanit", }}  placeholder="Email address" value={email.replace(" ", "")} onChangeText={(text) => setEmail(text.replace(" ", ""))}/>
                </View> 
            </View>

            {resetFailed && (
                <View style={{ marginBottom: 5,  width: "90%", alignSelf: "center", marginTop: -3, }}>
                  <Text style={{ color: "red", fontSize: 16, fontFamily: "Kanit", }} >{resetFailedMessage}</Text>
                </View>
            )}

            <TouchableOpacity onPress={sendPasswordResetEmailBtn} disabled={disableButton} style={{padding: 8, backgroundColor: disableButton ? "gray" : "#2F5597", width: "90%", alignSelf: "center", margin: 5, borderRadius: 30 }} >
                <Text style={{textAlign: "center", color: "white", fontFamily: "Kanit"}}>{buttontext}</Text>
            </TouchableOpacity>
            <View style={{alignSelf: "center", margin: 8, padding: 8,  width: "90%", }}>
                <TouchableOpacity onPress={() => {router.push('/login');}}> 
                      <Text style={{color: "green", fontFamily: "Kanit", textAlign: "center" }} >Go back </Text> 
                </TouchableOpacity>
            </View>


        </View>
    </ScrollView>
  </ImageBackground>
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
    width: "90%",
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

export default ForgetPassword;
