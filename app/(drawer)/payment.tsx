import React, { useState, useEffect, useRef,   } from "react";
import { Image, StyleSheet, Platform, ScrollView, TouchableOpacity, Text, View, useWindowDimensions, useColorScheme  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Purchases, { PurchasesOffering} from "react-native-purchases";
import { Ionicons } from '@expo/vector-icons';

import RevenueCatUI,  {PAYWALL_RESULT} from 'react-native-purchases-ui';
import Animated, { FadeInUp  } from "react-native-reanimated"; 

import { appSTUDENTS, dbSTUDENTS, authSTUDENTS } from '@/firebaseconfig';
import { doc, getDoc, updateDoc } from "firebase/firestore";

// import EduZolveLogo from "../../../assets/eduzolvereport-logo-black.png"
// import { db, auth } from "../../../firebaseConfig";
// import { SET_USER } from "../../context/actions/userActions";
import { SET_USER, SET_SUBSCRIPTION_STATUS } from "@/assets/context/actions/userActions";

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"; 
import useInactivityLogout from '@/components/useInactivityLogout';

// Purchases.setDebugLogsEnabled(true);

const PaymentScreen = () => {

  const user = useSelector((state) => state.user.user); 

  const router = useRouter();
  const dispatch   = useDispatch()
  const colorScheme = useColorScheme();
  useInactivityLogout(30); 

  const subscriptionStatus = useSelector((state) => state.subscription.status);
  const [subscribedAlready, setSubscribedAlready] = useState(false);

  const active = subscriptionStatus?.entitlements?.active?.["pro"]?.isActive ?   true : false; 
  const expirationDateMillis = subscriptionStatus?.entitlements?.active?.["pro"]?.expirationDateMillis;
  const originalPurchaseDateMillis = subscriptionStatus?.entitlements?.active?.["pro"]?.originalPurchaseDateMillis;


  const [payment, setPayment] = useState(""); 
  const [onboardingOffering, setOnboardingOffering] = useState<PurchasesOffering>()
  const [subscribedAlreadyMessaage, setSubscribedAlreadyMessaage] = useState("")


  const isSubscribed = async () => {
        // Present paywall for current offering:
        // const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywallIfNeeded({requiredEntitlementIdentifier: "pro"})

        const customerInfo = await Purchases.getCustomerInfo();
        const isProSubscriber = customerInfo.entitlements.active["pro"]

        if (isProSubscriber) {
          setSubscribedAlready(true)
          return true
        } else {
          const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall()
          switch (paywallResult) {
              case PAYWALL_RESULT.NOT_PRESENTED:
              case PAYWALL_RESULT.ERROR:
              case PAYWALL_RESULT.CANCELLED:
                  return false;
              case PAYWALL_RESULT.PURCHASED:
              case PAYWALL_RESULT.RESTORED:
                  return true;
              default:
                  return false;
          }
        }
  }


  const [disablemakePaymentCustomizeBtn, setDisablemakePaymentCustomizeBtn] = useState(false)
  const makePaymentCustomize = async () => {
    setDisablemakePaymentCustomizeBtn(true)
    // setPayment("Initiating payment")
    if (await isSubscribed() ) {
      try {
        await updateDoc(doc( dbSTUDENTS, "eduzolve-users", user?._id), {isSubscribed: true} );
        const updatedData = await getDoc(doc( dbSTUDENTS, "eduzolve-users", user?._id));
        dispatch(SET_USER(updatedData.data())); 
        const jsonValue = JSON.stringify(updatedData.data());
        AsyncStorage.setItem('eduzolveReportUsersLocalStorage', jsonValue); 


        if (subscribedAlready) {
          alert("You already have an active subscription. No need to do anything.")
          // setSubscribedAlreadyMessaage
        } else {
          Purchases.setAttributes({ "username" : user?.username, "email": user?.email });
          const customerInfo = await Purchases.getCustomerInfo();
          dispatch( SET_SUBSCRIPTION_STATUS( customerInfo ) );
          alert("Payment successful. You can now procced to enjoy your PRO features")
        }
        setDisablemakePaymentCustomizeBtn(false)


                    
      } catch (error) {
      alert("Error: Update unsuccessful. Try again later " + error.message);
      setDisablemakePaymentCustomizeBtn(false)
    }
    } else {
      // setPayment("Not subscribed")
      alert("Payment / Restoration unsuccessful")
      setDisablemakePaymentCustomizeBtn(false)
    }
  }





  return (
    <View style={{ flex: 1,    alignSelf: "center",     width: "100%",  }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{}} >
      
          {/* <View style={{alignSelf: "center", paddingLeft: 10, width: "90%", borderRadius: 10, marginTop: 10,}} > 
            <Text  style={{  fontSize: 20, textAlign: "left", fontFamily: "KanitBold", color: active ? "green" : "red" }}>
                {active ? "SUBSCRIPTION ACTIVE": "NOT SUBSCRIBED"}
            </Text>
          </View> */}

          <View  style={{ flexDirection: 'row', paddingVertical: 5, alignSelf: "center",  borderRadius: 10, width: "90%", marginTop: 10 }} >
            <View style={{ flex: 1 }} >
              <Text style={{  fontSize: 24,  marginBottom: 3, color:  colorScheme === "dark" ? "white" : "black", fontFamily: "Kanit" }}>PRO Features</Text>
              {/* <Text style={{ paddingLeft: 5, fontSize: 24,  marginBottom: 3, color: "black", fontFamily: "Kanit" }}>Profile Information</Text> */}
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

        <View style={{alignSelf: "center",  width: "90%", borderRadius: 10, marginVertical: 10}} > 
            <Text  style={{  fontSize: 13, textAlign: "left", fontFamily: "Kanit", color:  colorScheme === "dark" ? "white" : "black" }}>
                {active ? "You have an active subscription. Enjoy access to the following features!": "You do not have an active subscription. Some features are locked. Subscribe now to enjoy all the PRO features."}
            </Text>
          </View>

 
        
      

          <PackagesInformations delay={100} duration={1000} onPress={makePaymentCustomize} access={active} offering="Access to all available past questions and solutions."     description="For each subject, once the years are available, you get access to it"/>
          <PackagesInformations delay={120} duration={1200} onPress={makePaymentCustomize} access={active} offering="Practice offline without any interruptions"     description="Practicing the past questions and solutions are offline. You only need internet connection for login authentication" />
          <PackagesInformations delay={140} duration={1400} onPress={makePaymentCustomize} access={active} offering="Access to all available subjects"     description="There are over 50 subjects in SHS cirriculum. Once the past questions and solution is available, you get an instance access to all of them" />
          <PackagesInformations delay={160} duration={1600} onPress={makePaymentCustomize} access={active} offering="Get instant solutions and performance assessment"     description="After practicing and set of questions, you get instant solutions and performance assessment"/>
          {/* <PackagesInformations offering="Ace Your WAEC Exams: Practice Anytime, Anywhere"      description="You are ble to ace your examinations with ease with EduZolve PastQuo" delay={50} duration={3000}/> */}
          <PackagesInformations delay={180} duration={1800} onPress={makePaymentCustomize} access={true} offering="Your WAEC Success, Simplified"                        description="The practice is simplified with little hussle" />
          <PackagesInformations delay={200} duration={2000} onPress={makePaymentCustomize} access={true} offering="Master the WAEC with Confidence: Practice Past Questions and Solutions"     description="You are able to master and face WAEC examination with confidence"  />
          {/* <PackagesInformations offering="Comprehensive Past Questions and Answers"         description="Prepare for WAEC Success: Comprehensive Past Questions and Answers" delay={50} duration={2000}/> */}
          <PackagesInformations delay={220} duration={2200} onPress={makePaymentCustomize} access={true} offering="Prepare for WAEC with Smart Practice"                 description="Study smart, not neccessarily hard. EduZolve PastQuo makes you achieve that" />
          <PackagesInformations delay={240} duration={2400} onPress={makePaymentCustomize} access={active} offering="Be up to date with new app features"                 description="There are more to come - MentorMee feature, AI-assisted learning tool. You wil be able to see new features anytime they are launched" />
          

          {/* {(active === false) && ( */}
            <Animated.View entering={FadeInUp.delay(260).duration(2600)} style={{  width: "95%", alignSelf: "center", marginTop: 5,  borderRadius: 15}}>
              <TouchableOpacity style={{alignSelf: "center", padding: 10, width: "90%", backgroundColor: disablemakePaymentCustomizeBtn ? "#b4b4b4" : "green", borderRadius: 30, marginTop: 20 }} onPress={makePaymentCustomize} disabled={disablemakePaymentCustomizeBtn}> 
                  <Text  style={{  fontSize: 16, textAlign: "center", fontFamily: "Kanit", color: "white" }}>
                    {disablemakePaymentCustomizeBtn ? "Please wait !" : "Start your subscription today"}
                  </Text>  
              </TouchableOpacity>
            </Animated.View>

          {/* )} */}


</ScrollView>
    </View>
  );
};



const PackagesInformations = ({ offering="", description="", delay=50, duration=1000, access=false, onPress}) => {

 
   return (
    <Animated.View entering={FadeInUp.delay(delay).duration(duration)} style={{  width: "90%", alignSelf: "center", marginTop: 5,  borderRadius: 15}}>
      <TouchableOpacity disabled={access} onPress={onPress} style={{ flexDirection: 'row', padding: 5, alignSelf: "center", backgroundColor: access ? "white" : "#d4d4d4", borderRadius: 10 }} >
          <View style={{ justifyContent: "center", alignItems: "center", borderRadius: 50, marginRight: 5 }}>
            <Text style={{   fontFamily: "Kanit", fontSize: 20, textAlign: "center", }}>✔</Text> 
          </View> 
          <View style={{ flex: 1 }} >
            <Text style={{ paddingLeft: 5, fontSize: 13,  marginBottom: 3, color: "black", fontFamily: "Kanit" }}>{offering}</Text>
            <Text style={{ paddingLeft: 5, color: "gray",fontSize: 10,fontFamily: "JosefinSans",}}>{description}</Text>
          </View>
          <View style={{ height: 1, backgroundColor: 'black' }} /> 

        { access === false && (
          <View style={{ justifyContent: "center", alignItems: "center", borderRadius: 10, marginHorizontal: 3,  backgroundColor: "#b4b4b4", padding: 3 }}>
            <Ionicons name={'lock-closed'}  size={20} color="gray" style={{ }}/>
            <Text style={{   fontFamily: "Kanit", fontSize: 10, textAlign: "center", paddingHorizontal: 3 }}>LOCKED</Text> 
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
 
   )
 };
 




export default PaymentScreen;
