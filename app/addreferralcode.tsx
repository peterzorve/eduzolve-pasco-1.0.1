// src/app/login.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from "react-redux"; 


import * as Device from 'expo-device'
import { dbSTUDENTS, authSTUDENTS, dbTEACHERS, authTEACHERS } from '@/firebaseconfig';
// import { } from 'firebase/firestore';
import { addDoc, collection, doc, setDoc, getDoc, updateDoc, onSnapshot, orderBy, query, serverTimestamp,} from "firebase/firestore";

import { createUserWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";

import useInactivityLogout from '@/components/useInactivityLogout';
import { SET_USER } from "@/assets/context/actions/userActions";



const ReferralCodeScreen = () => {
  const router = useRouter();
  const {height}   = useWindowDimensions()
  const user = useSelector((state) => state.user.user);
  const dispatch   = useDispatch()
  useInactivityLogout(10 * 60 * 1000);  

  // const [referralCode, setReferralCode] = useState("eduzolve-peterzorve-h3m4bucn");
  const [referralCode, setReferralCode] = useState("");



    

  // === Customize Signin Button ==================================================================
  const [buttontext, setButtonText] = useState("Submit");
  const [disableButton, setDisableButton] = useState(false);



  



  const submitReferralCodeBtn = async ()  => {
      if (referralCode.trim() ) { 
        
        try {
          setDisableButton(true);
          setButtonText("Please wait!!!")

          const docSnap = await getDoc(doc(dbTEACHERS, "referral-codes", referralCode,)); 

          if (docSnap?.data()) {
    
            const data = {name: user?.username,  date: `${Date.now()}`, referralCode: referralCode, aimAndVision: "We (EduZolve Oy) aim to provide the the best educational materials for J-H-S. and Senior High School Students and young professionals"};
            
            if (docSnap?.data()?.accountReady) {
              await setDoc(doc(dbTEACHERS, "eduzolve-referrals", docSnap?.data()?._id, "members", user?._id.slice(3, 13)), data);
              await updateDoc(doc( dbSTUDENTS, "eduzolve-users",  user?._id), {"hasReferralCode": false, referralCode: referralCode});
              const updatedData = await getDoc(doc(dbSTUDENTS, "eduzolve-users",  user?._id));
              dispatch(SET_USER(updatedData.data()));
              try {
                const jsonValue = JSON.stringify(updatedData.data());
                AsyncStorage.setItem('eduzolveReportUsersLocalStorage', jsonValue);
              } catch (error) {
  
              }
  
              alert("Referal code\n '"+ referralCode + "' \nhas been registered successfully")
              setDisableButton(false);
              setButtonText("Submit");
              setReferralCode("")

            } else {
              alert("Referral code is not ready. Contact the owner of the code");
              setDisableButton(false);
              setButtonText("Submit");
            }



          } else {
            alert("The referral code does not exist. \nPlease check the code or contact the owner for the correct referral code.");
            setDisableButton(false);
            setButtonText("Submit");
          }
          
          }
          catch (error) { 
            alert("Something went wrong\n" + error.message)
            setDisableButton(false);
          setButtonText("Submit")

          }

        } else {
          alert("Enter referral code")
        }
     
      } 
 

  return (

      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "black", }}>
        <View style={{backgroundColor: "white", width: "99%", alignSelf: "center", marginVertical: 0.005*height, borderRadius: 5, height: 0.93 * height}}>
            {/* {hasReferralCode && ( */}
              {/* <> */}
                <View  style={styles.textheader}>
                    <Text style={{ fontFamily: "Kanit", fontSize: 18,  }} >Enter referral code</Text>
                </View>
                <View style={[styles.container, {borderColor: "gray", borderWidth: 1 }]}>
                    <Ionicons name={'share-social'}  size={20} color="gray" style={styles.icon}/>
                    <TextInput style={styles.input}  placeholder="Referral code" value={referralCode.replace(" ", "")} onChangeText={(text) => setReferralCode(text.replace(" ", ""))}/>
                </View>
              {/* </> */}
            {/* )} */}
            <TouchableOpacity onPress={submitReferralCodeBtn} disabled={disableButton} style={{padding: 8, backgroundColor: disableButton ? "gray" : "#2F5597", width: "85%", alignSelf: "center", margin: 5, borderRadius: 20, }} >
                <Text style={{textAlign: "center", color: "white", fontFamily: "Kanit"}}>{buttontext}</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={{alignSelf: "center", margin: 8, padding: 8,  width: "85%"}} onPress={() => { router.back() }}> 
              <Text  style={{fontFamily: "Kanit", textAlign: "center"}}>Go Back
              </Text>  
            </TouchableOpacity>
        </View>
      </ScrollView>
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
    width: "85%",
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
    width: "85%", alignSelf: "center", borderRadius: 15, marginTop: 15 
  }



});

export default ReferralCodeScreen;
