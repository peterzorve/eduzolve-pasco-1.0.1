import React, { useState, useEffect } from 'react'
import { StyleSheet, Platform, View, Text, ScrollView, TextInput, TouchableOpacity, useWindowDimensions, ImageBackground, KeyboardAvoidingView, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import useInactivityLogout from '@/components/useInactivityLogout';
import { dbSTUDENTS, authSTUDENTS, dbTEACHERS, authTEACHERS } from '@/firebaseconfig';
import { SET_USER } from "@/assets/context/actions/userActions";
import { addDoc, collection, doc, setDoc, getDoc, updateDoc, onSnapshot, orderBy, query, serverTimestamp,} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { LocalStorageEduZolvePasco, TitleAndDescription } from '@/components/customized/MyComponents';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const dispatch   = useDispatch()
  useInactivityLogout(30); 
  const user = useSelector((state) => state.user.user); 
  const [remainingTime, setRemainingTime] = useState("")
  const subscriptionStatus = useSelector((state) => state.subscription.status);
  const active = subscriptionStatus?.entitlements?.active?.["pro"]?.isActive ?   true : false
  // const active = true

  const originalPurchaseDateMillis = subscriptionStatus?.entitlements?.active?.["pro"]?.originalPurchaseDateMillis
  const expirationDateMillis = subscriptionStatus?.entitlements?.active?.["pro"]?.expirationDateMillis

  const updateReferralStatus = async () => {
    try {
      await updateDoc(doc( dbSTUDENTS, "eduzolve-users",  user?._id), {"hasReferralCode": false});
      const updatedData = await getDoc(doc(dbSTUDENTS, "eduzolve-users",  user?._id));
      dispatch(SET_USER(updatedData.data()));
      LocalStorageEduZolvePasco(updatedData.data());
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
        setRemainingTime(`${days}d, ${remainingHours}hr, ${remainingMinutes}min`);
     }
    }
   }, [ user?.dateRegister, user?.hasReferralCode ]); 

  return (
      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={80} style={{ flex: 1, }} >
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: colorScheme === "dark" ? "black" : "white",}} >
          <View  style={{ flexDirection: 'row', padding: 5, alignSelf: "center",  borderRadius: 10, width: "95%" }} >
            <TitleAndDescription title='Profile Information' titleFontSize={24} titleColor={colorScheme === "dark" ? "white" : "black"} />
            <TouchableOpacity disabled={active} onPress={() => { router.push('/payment') }} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10, marginHorizontal: 3,  backgroundColor: active ? "green" : "red", padding: 3 }}>
              <Ionicons name={active ? 'lock-open' : 'lock-closed'}  size={24} color="white" style={{ }}/>
              <Text style={{   fontFamily: "Kanit", fontSize: 10,  paddingHorizontal: 3, color:"white" }}>{ active ? "Active" : "Inactive"}{"\n"}Subscription</Text> 
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 20,  marginBottom: 20, marginHorizontal: 10, backgroundColor: colorScheme === "dark" ? "black" : "white", marginVertical: 3, width: "100%", alignSelf: "center", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, flex: 1 }}>
            {(user?.username )    && ( <UserData header={"Email"} title={ user?.username } /> )} 
            {(user?.email )       && ( <UserData header={"Name"}  title={ user?.email } /> )} 
            {(user?.dateRegister) && ( <UserData header={"Registration date"}  title={ new Date( parseInt(user?.dateRegister)).toLocaleTimeString("en-US", {day: "2-digit",  year: "numeric", month: "long", hour: "numeric", minute: "numeric", hour12: true, })}  /> )} 
            {(user?.hasReferralCode && remainingTime) && ( <UserData header={"Opportunity to add your referral code expires in"}  title={ remainingTime } /> )}
            {(user?.referralCode) && ( <UserData header={"Used referral code"}  title={ user?.referralCode?.slice(0, 20) + " . . ." } /> )} 
            <UserDataWithTouchableOpacity header='Password' title='*********************' onPress={() => {router.push('/settings')}} icon='pencil'/>
            {active ? (
              <>
                {(originalPurchaseDateMillis) && ( <UserData header={"You subscribed on"}  title={ new Date( parseInt(originalPurchaseDateMillis)).toLocaleTimeString("en-US", {day: "2-digit",  year: "numeric", month: "long", hour: "numeric", minute: "numeric", hour12: true, })}  /> )} 
                {(expirationDateMillis) &&       ( <UserData header={"Subscription expires on"}  title={ new Date( parseInt(expirationDateMillis)).toLocaleTimeString("en-US", {day: "2-digit",  year: "numeric", month: "long", hour: "numeric", minute: "numeric", hour12: true, })}  /> )} 
              </>
            ) : (
              <UserDataWithTouchableOpacity header='Subscription' title='You have no active subscription' onPress={() => {router.push('/payment')}}/>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
  );
}

const UserData = ({ header="", title="" }) => {
  const colorScheme = useColorScheme();
  return (
    <View style={{ }}>
        <Text style={{ paddingTop: 8,paddingLeft: 5, color: "gray",fontSize: 11,fontFamily: "Kanit",}}>{header}</Text>
        <Text style={{ paddingLeft: 5, fontSize: 15,  marginBottom: 3, color: colorScheme === "dark" ? "white" : "black", fontFamily: "Kanit" }}>{ title }</Text>
      <View style={{ height: 1, backgroundColor: colorScheme === "dark" ? "gray" : "gray" }} /> 
    </View>
  );
};

const UserDataWithTouchableOpacity = ({ header="", title="", onPress=() => {}, icon="today"}) => {
  const colorScheme = useColorScheme();
  return (
    <View style={{ }}>
      <View style={{flexDirection: "row", }}>
          <View style={{ flexGrow: 1, }} >
            <Text style={{paddingTop: 8,paddingLeft: 5, color: "gray",fontSize: 12,fontFamily: "Kanit", }}>{ header }</Text>
            <Text style={{ paddingLeft: 5, fontSize: 15,  marginBottom: 3, color: colorScheme === "dark" ? "white" : "black", fontFamily: "Kanit" }}>{ title }</Text>
          </View>
          <TouchableOpacity style={{  width: 40, height: 40, backgroundColor: "#e4e4e4", justifyContent: "center", alignItems: "center", margin: 5, borderRadius: 20}}  onPress={onPress} >
            <Ionicons name={icon}  size={20} color="black" />
          </TouchableOpacity>
      </View>
      <View style={{ height: 1, backgroundColor: colorScheme === "dark" ? "gray" : "gray" }} />
    </View>
  );
};
