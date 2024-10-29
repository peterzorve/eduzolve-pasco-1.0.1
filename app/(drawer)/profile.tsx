import React, { useState, useEffect } from 'react'
import { StyleSheet, Platform, View, Text, ScrollView, TextInput, TouchableOpacity, useWindowDimensions, ImageBackground, KeyboardAvoidingView, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import useInactivityLogout from '@/components/useInactivityLogout';
import { dbSTUDENTS, authSTUDENTS, dbTEACHERS, authTEACHERS } from '@/firebaseconfig';
import { SET_USER } from "@/assets/context/actions/userActions";
import { addDoc, collection, doc, setDoc, getDoc, updateDoc, onSnapshot, orderBy, query, serverTimestamp,} from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from "react-redux";


export default function HomeScreen() {
  const {height}   = useWindowDimensions()
  const router = useRouter();
  const colorScheme = useColorScheme();
  const dispatch   = useDispatch()
  useInactivityLogout(30 * 60 * 1000); 




  // const user = {username: "Peter Zorve", email: "zorvepeter28@gmail.com", phonenumber: "+358417289032", schoolname: "University of Eastern Finland", program: "Chemistry", level: "400", semester: "2nd Semester", dateOfBirth: "25th Jan. 2000"}
  const user = useSelector((state) => state.user.user); 
  const [remainingTime, setRemainingTime] = useState("")

  const updateReferralStatus = async () => {
    try {

      await updateDoc(doc( dbSTUDENTS, "eduzolve-users",  user?._id), {"hasReferralCode": false});
      const updatedData = await getDoc(doc(dbSTUDENTS, "eduzolve-users",  user?._id));
      dispatch(SET_USER(updatedData.data()));
      try {
        const jsonValue = JSON.stringify(updatedData.data());
        AsyncStorage.setItem('eduzolveReportUsersLocalStorage', jsonValue);
      } catch (error) {
  
      }
    } catch (error) {

    }
  }


  useEffect(  () => {  
    if ( user?.hasReferralCode && user?.dateRegister) {
 
     const timeNow = Date.now()
     const registeredDate = parseInt(user?.dateRegister, 10); 
     const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000;
     const fiveMinutesInMillis = 5 * 60 * 1000; 
     const expiryDate = registeredDate + sevenDaysInMillis;
 
 
  
 
     if (timeNow >= expiryDate) {
      updateReferralStatus();
     } else {
      const differenceInMillis = Math.abs(expiryDate - timeNow);
      const seconds = Math.floor(differenceInMillis / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      const remainingMinutes = minutes % 60;
      const remainingSeconds = seconds % 60;
      setRemainingTime(`${days}d, ${remainingHours}hr, ${remainingMinutes} min`);
     }
    }
   }, [ user?.dateRegister, user?.hasReferralCode ]); 


  return (

    <ImageBackground source={require('@/assets/images/background/background3.jpg')} style={{ flex: 1, }} >
    <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={80} style={{   flex: 1, }} >
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "rgba(255, 255, 255, 1)",}} >
          {/* <View style={{ width: "95%", alignSelf: "center", marginTop: 10, flexDirection: "row", backgroundColor: "#43cc98", borderTopLeftRadius: 10, borderTopRightRadius: 10 } }>
              <View style={{ flexGrow: 1,}}>
                  <Text style={{color: "black", textAlign: "center", padding: 5, fontFamily: "Kanit", fontSize: 18}}>Profile  Information</Text>
              </View>
              <TouchableOpacity  style={{  justifyContent: 'center', alignItems: "center", backgroundColor: "white", borderRadius: 20, marginHorizontal: 8, margin:3 }}  onPress={() => {  }}>
                  <Ionicons name={'settings'}  size={20} color="black" style={{margin: 5}}/>
              </TouchableOpacity>
          </View> */}
          <View style={{ width: "90%", alignSelf: "center", marginTop: 20  }}>
              <Text style={{fontFamily: "Kanit",  fontSize: 24,  }} >
                Profile Information
              </Text>
 
          </View>

          <View style={{ paddingHorizontal: 20,  marginBottom: 20, marginHorizontal: 10, backgroundColor: "white", marginVertical: 3, width: "100%", alignSelf: "center", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, flex: 1 }}>

              {(user?.username )    && ( <UserData header={"Email"} title={ user?.username } /> )} 
              {(user?.email )       && ( <UserData header={"Name"}  title={ user?.email } /> )} 

              
              <EditUserDate user={user}  header={"Phone number"}    previousData={"NA"}  firebaseVariable={"phonenumber"} numeric={true} />


              <View style={{ }}>
                  <View style={{flexDirection: "row", }}>
                      <View style={{ flexGrow: 1, }} >
                          <Text style={{paddingTop: 8,paddingLeft: 5, color: "gray",fontSize: 12,fontFamily: "Kanit", }}>{ "Password" }</Text>
                          <Text style={{paddingLeft: 5, fontWeight: "bold",  marginBottom: 3, color: "black", fontFamily: "Kanit"}}>{  "************"  }</Text>
                      </View>
                      <TouchableOpacity style={{  width: 40, height: 40, backgroundColor: "#e4e4e4", justifyContent: "center", alignItems: "center", margin: 5, borderRadius: 20}}  onPress={() => {router.push('/changepassword')}} >
                        <Ionicons name={'pencil'}  size={20} color="black" />
                      </TouchableOpacity>
                  </View>
                  <View style={{ height: 1, backgroundColor: 'black' }} />
              </View>

              {(user?.dateRegister) && ( <UserData header={"Registration date"}  title={ new Date( parseInt(user?.dateRegister)).toLocaleTimeString("en-US", {day: "2-digit",  year: "numeric", month: "long", hour: "numeric", minute: "numeric", hour12: true, })}  /> )} 
              {(user?.referralCode) && ( <UserData header={"Used referral code"}  title={ user?.referralCode } /> )} 
              {(user?.hasReferralCode && remainingTime) && ( <UserData header={"Opportunity to add your referral code expires in"}  title={ remainingTime } /> )}
          </View>
        </ScrollView>



    



  </KeyboardAvoidingView>
</ImageBackground>

  );
}





const UserData = ({ header, title }) => {
  return (
    <View style={{ }}>
      <View style={{ }} >
        <Text style={{ paddingTop: 8,paddingLeft: 5, color: "gray",fontSize: 11,fontFamily: "Kanit",}}>{header}</Text>
        <Text style={{ paddingLeft: 5, fontSize: 15,  marginBottom: 3, color: "black", fontFamily: "Kanit" }}>{ title }</Text>
      </View>
      <View style={{ height: 1, backgroundColor: 'black' }} /> 
    </View>
  );
};



const EditUserDate = ({ user, header, previousData, firebaseVariable, numeric=false }) => {

  // const dispatch = useDispatch()
  const [enableEdit, setEnableEdit] = useState(true)
  const [userinformation, setUserInformation] = useState(previousData)
  const [disableEditingButton, setDisableEditingButton] = useState(false) 

  const editUserInformationBtn = async () => {
    // setEnableEdit(false) 
    // if (enableEdit === false ) {
    //   if ( userinformation.trim() ) {
    //     if (userinformation.trim() != previousData ) {
    //         try {
    //           setDisableEditingButton(true)
    //           await updateDoc(doc( db, "mentorsEduZolveInformation", "profile",  "profile", user?._id,), {[firebaseVariable]: userinformation.trim() })
    //           const updatedData = await getDoc(doc(db, "mentorsEduZolveInformation", "profile",  "profile", user?._id,)) 
  
    //           dispatch(SET_USER(updatedData.data()));
    //           const jsonValue = JSON.stringify(updatedData.data());
    //           AsyncStorage.setItem('mentorsEduZolveInformation', jsonValue); 
    //           setDisableEditingButton(false)
    //           setEnableEdit(true)
    //         } catch (error) {
    //           alert("Error\n: Update unsuccessful. Try again later" + error.message)
    //           setEnableEdit(true)
    //           setDisableEditingButton(false)
    //         }
    //     } else {
    //       alert("Previous and new " + header.toLowerCase() + " are the same as the previous one")
    //       setEnableEdit(true)
    //     }
    //   } else {
    //     alert("Enter " + header.toLowerCase() )
    //     setEnableEdit(true)
    //     setUserInformation(previousData)
    //   }
    // }
  }
  return (
      <View style={{ }}>
          { enableEdit ? (
              <View style={{flexDirection: "row", }}>
                  <View style={{ flexGrow: 1, }} >
                      <Text style={{paddingTop: 8,paddingLeft: 5, color: "gray",fontSize: 12,fontFamily: "Kanit", }}>{ header }</Text>
                      <Text style={{paddingLeft: 5, fontSize: 16,  marginBottom: 3, color: "black", fontFamily: "Kanit"}}>{ previousData }</Text>
                  </View>

                  {/* <TouchableOpacity style={{  width: 40, height: 40, backgroundColor: "#e4e4e4", justifyContent: "center", alignItems: "center", margin: 5, borderRadius: 20}}   disabled={disableEditingButton} onPress={editUserInformationBtn}  >
                  <Ionicons name={'pencil'}  size={20} color="black" />
                </TouchableOpacity> */}
              </View>
          ) : ( 
            <View style={{flexDirection: "row", }}>
                <View style={{ flexGrow: 1, }} >
                    <Text style={{paddingTop: 8,paddingLeft: 5, color: "gray",fontSize: 12,fontFamily: "Kanit", }}>{ header } </Text>
                    <TextInput  keyboardType={numeric ? "numeric" : undefined} style={{paddingLeft: 5, fontSize: 16, marginBottom: 3, color: "black", fontFamily: "Kanit"}}  autoFocus placeholder={"Enter " +  header.toLowerCase()} value={userinformation} onChangeText={(text) => setUserInformation(text)}/>
                </View>
                {/* <TouchableOpacity style={{  width: 40, height: 40, backgroundColor: "#e4e4e4", justifyContent: "center", alignItems: "center", margin: 5, borderRadius: 20}}   disabled={disableEditingButton} onPress={editUserInformationBtn}  >
                    <Ionicons name={'arrow-up'}  size={20} color="black" />
                </TouchableOpacity> */}
   
            </View>
          )}
      <View style={{ height: 1, backgroundColor: 'black' }} /> 
    </View>

  );
};


const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },

  nameTitle: {
    paddingTop: 8,
    paddingLeft: 5, 
    color: "gray",
    fontSize: 12,
    fontFamily: "Kanit",
  },

  nameText: { 
    paddingLeft: 5, 
    fontWeight: "bold",  
    marginBottom: 8, 
    color: "white", 
    fontFamily: "JosefinSans-Bold"
  }, 

  horizontalLine: { height: 0.5, backgroundColor: 'gray' }


});
