import React, { useState, useRef  } from 'react';
import { View, Button, StyleSheet, Alert, Platform, Text, useColorScheme, TouchableOpacity  } from 'react-native';
import { StripeProvider, CardForm, useStripe } from '@stripe/stripe-react-native';

import { useSelector } from "react-redux";

import { SET_USER } from "@/assets/context/actions/userActions"
import { useDispatch } from 'react-redux';

import { appSTUDENTS, dbSTUDENTS, authSTUDENTS } from '@/firebaseconfig';
import { addDoc, collection, doc, setDoc, getDoc, getDocs, updateDoc   } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile  } from "firebase/auth";

import AsyncStorage from '@react-native-async-storage/async-storage'


const PaymentScreen = () => {
  const colorScheme = useColorScheme();
  const { confirmPayment } = useStripe();
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const [cardFormKey, setCardFormKey] = useState(0); // Add a key state

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);


  const handlePayPress = async () => {
    setIsPaymentLoading(true);

    try {
      const response = await fetch('http://172.20.10.4:3000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ amount: 799, }),
      });
      
      const { clientSecret } = await response.json();
  
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card', 
        paymentMethodData: {
          billingDetails: {
            email: user?.email,
            name: user?.username,
          },
        }
      });
      if (error) {
        alert(`Payment failed 1:\n${error?.message}`);
        setIsPaymentLoading(false);
      } else if (paymentIntent) { 
        
        try {
          await updateDoc(doc(dbSTUDENTS, "eduzolvePastQuoClients", "profile",  "profile", user?._id), {paidSubscription: true, paidAmount: 7.99})   
          const docSnap = await getDoc(doc(dbSTUDENTS, "eduzolvePastQuoClients", "profile",  "profile", user?._id,)); 
          if (docSnap.exists()) { 
            dispatch(SET_USER(docSnap.data()));
            try {
                const jsonValue = JSON.stringify(docSnap.data());
                await AsyncStorage.setItem('eduzolveReportUsersLocalStorage', jsonValue); 
            } catch (error) { }
            alert('Payment successful');
            setIsPaymentLoading(false);
            setCardFormKey(prevKey => prevKey + 1);
          }
        } catch (error) {
          alert("Payment successful, but failed to uodate your profile. Contact support team");
          setIsPaymentLoading(false);
          setCardFormKey(prevKey => prevKey + 1);
        }

      }
    } catch (error) {
      alert(`Payment failed: 2\n${error?.message}`);
      setIsPaymentLoading(false);
    }




  };




  return (
    <StripeProvider  publishableKey="pk_test_51OQB72EnMJO2dRUpdP0OFB9Z9XIZH6mNtHQZUV0tyf6gTOn5jzv337akhpuLOOePM8OMWDDUyAch0KGmCocwUOEs00HAKEaXmG">
      <View style={styles.container}>
          <View  style={{  width: "100%", alignSelf: "center", marginVertical: 10,  borderRadius: 15}}>
              <Text style={{ fontFamily: "Kanit", fontSize: 14,  color: colorScheme === "dark" ? "white" : "black" }} >Make payment with you Visa, Debit, etc, card</Text>
          </View>
          <CardForm
            key={cardFormKey} // Use key to force re-render
            style={styles.cardForm}
            onFormComplete={(cardDetails) => {
      
            }}
          />

        {/* <Button onPress={handlePayPress} title={isPaymentLoading ? "Processing..." : "Pay"} disabled={false} /> */}

        <TouchableOpacity onPress={handlePayPress} disabled={isPaymentLoading} style={{padding: 8, backgroundColor: isPaymentLoading ? "rgba(0, 0, 255, 0.3)" : "rgba(0, 0, 255, 0.7)", width: "100%", alignSelf: "center", margin: 5, borderRadius: 50 }} >
                <Text style={{textAlign: "center", color: "white", fontFamily: "Kanit",}}>{isPaymentLoading ? "Processing..." : "Pay"}</Text>
            </TouchableOpacity>
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardForm: {
    height: 180,
    // marginVertical: 30,
  },
});

export default PaymentScreen;
