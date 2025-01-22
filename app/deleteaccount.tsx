// src/app/login.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { appSTUDENTS, dbSTUDENTS, authSTUDENTS } from '@/firebaseconfig';
import {  sendPasswordResetEmail  } from "firebase/auth";
import { useSelector } from "react-redux";
import { doc, getDoc, updateDoc, deleteDoc  } from "firebase/firestore";
// import { appSTUDENTS, dbSTUDENTS, authSTUDENTS } from '@/firebaseconfig';

import useInactivityLogout from '@/components/useInactivityLogout';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, updatePassword, getAuth   } from "firebase/auth"; 

// import { appSTUDENTS, dbSTUDENTS, authSTUDENTS } from '@/firebaseconfig';
import Modal from "react-native-modal";

const DeleteAccount = () => {
  const router = useRouter();
  const {height}   = useWindowDimensions()
  const [password, setPassword] = useState(""); 

  useInactivityLogout(20);  // 30 minutes
  // === Customize Signin Button ==================================================================
  const user = useSelector((state) => state.user.user); 

  const [showModal, setShowModal] = useState(false)

  const [disableButton, setDisableButton] = useState(false);   




    

  const deleteAccountBtn = async ()  => {
  if (password.trim()) {
    try {
      setDisableButton(true);
        await signInWithEmailAndPassword(authSTUDENTS, user?.email, password)
        setShowModal(true)  
        setDisableButton(false);
    } catch (error) {
      alert("Something went wrong. Check your password or internet connection");
      setDisableButton(false);
    }
  }
  }

  const confirmDeleteAccountBtn = async () => {
    try {
      setDisableButton(true);
        setShowModal(false)
        const userDocRef = doc(dbSTUDENTS, 'eduzolve-users', user?._id);
        await deleteDoc(userDocRef);
        const currentUser = authSTUDENTS.currentUser 
        await currentUser?.delete();
        router.replace('/login');  
        setDisableButton(false);
    } catch (error) {
      alert("Something went wrong. Check your password or internet connection");
      setDisableButton(false);
    }
  }
  


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "rgba(0, 0, 0, 0.8)"}}>
        <View style={{backgroundColor: "white", width: "100%", alignSelf: "center",   height: 1 * height}}>

        <View style={{ marginBottom: 20,  width: "90%", alignSelf: "center", marginTop: 40,}}>
                  <Text style={{  fontSize: 16, fontFamily: "Kanit", }} >To delete your account, you should provide your password</Text>
                </View>


            <View style={{  width: "90%", alignSelf: "center",   borderRadius: 15, marginBottom: 10}}>
                <Text style={{ fontFamily: "Kanit", fontSize: 14,  color: "black" }} >Password</Text>
                <View style={[{ flexDirection: 'row', alignItems: 'center', borderColor:  'gray', borderWidth:  1, borderRadius: 10,   padding: 5, backgroundColor: "white", }]}>
                    <Ionicons name={'mail'}  size={20} color="gray" style={{ marginRight: 10, }}/>
                    <TextInput style={{   flex: 1, fontFamily: "Kanit", }}  placeholder="Password" value={password.replace(" ", "")} onChangeText={(text) => setPassword(text.replace(" ", ""))}/>
                </View> 
            </View>



            {password && (
              <TouchableOpacity onPress={deleteAccountBtn} disabled={disableButton} style={{padding: 8, backgroundColor: disableButton ? "gray" : "#2F5597", width: "90%", alignSelf: "center", margin: 5, borderRadius: 30 }} >
                  <Text style={{textAlign: "center", color: "white", fontFamily: "Kanit"}}>{disableButton ? "Please wait" : "Submit"}</Text>
              </TouchableOpacity>

            )}

            
                    <Modal isVisible={showModal} style={{}} >
                      <View style={{backgroundColor: "white", borderRadius: 20, width: "90%", alignSelf: "center", borderBottomLeftRadius: 20 }} >
            
                        <View style={{ flexDirection: "row", borderTopLeftRadius: 20, borderTopEndRadius: 20}}> 
                          <View style={{flex: 1, justifyContent: "center"}} >
                            <Text style={{textAlign: "center", fontSize: 18, padding: 10, fontFamily: "Kanit"}} >
                              Are you sure you want to delete your account?
                            </Text>
                          </View >
                
                        </View>

                        <View style={{ flexDirection: "row",  borderTopLeftRadius: 20, borderTopEndRadius: 20}}> 
               
                          <TouchableOpacity onPress={() => { setShowModal(false); setPassword("")  }} style={{  flex: 1,  justifyContent: "center", backgroundColor: "red", margin: 5, borderRadius: 30  }} >
                          <Text style={{textAlign: "center", fontSize: 22, padding: 10, fontFamily: "Kanit"}} >
                              Cancel
                            </Text>
                          </TouchableOpacity> 
                          <TouchableOpacity onPress={confirmDeleteAccountBtn} style={{  flex: 1,  justifyContent: "center", backgroundColor: "green", margin: 5, borderRadius: 30  }} >
                          <Text style={{textAlign: "center", fontSize: 22, padding: 10, fontFamily: "Kanit"}} >
                              Proceed
                            </Text>
                          </TouchableOpacity> 
                        </View>
            
            
                      </View> 
                    </Modal>
            
 


        </View>
    </ScrollView>
  // </ImageBackground>
  );
};


export default DeleteAccount;
