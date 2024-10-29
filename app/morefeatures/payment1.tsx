import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CardField, useConfirmPayment, StripeProvider } from "@stripe/stripe-react-native";
// import { StripeProvider } from "@stripe/stripe-react-native";
//ADD localhost address of your server
const API_URL = "http://localhost:3000";

const StripeApp = props => {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          
        }
      }
    } catch (e) {
    
    }
    //3.Confirm the payment with the card details
  };

  return (
    <StripeProvider publishableKey="pk_test_51OQB72EnMJO2dRUpdP0OFB9Z9XIZH6mNtHQZUV0tyf6gTOn5jzv337akhpuLOOePM8OMWDDUyAch0KGmCocwUOEs00HAKEaXmG">
      <View style={styles.container}>
        <TextInput
          autoCapitalize="none"
          placeholder="E-mail"
          keyboardType="email-address"
          onChange={value => setEmail(value.nativeEvent.text)}
          style={styles.input}
        />
        <CardField
          postalCodeEnabled={true}
          placeholder={{ number: "4242 4242 4242 4242",}}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={cardDetails => { setCardDetails(cardDetails); }}
          // cardNumberInputProps={{ style: styles.cardInput, }}
          // expiryInputProps={{ style: styles.cardInput, }}
          // cvcInputProps={{ style: styles.cardInput, }}
        />
      
        <Button onPress={handlePayPress} title="Pay" disabled={loading} />
      </View>
    </StripeProvider>
  );
};
export default StripeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    // backgroundColor: "#efefefef",
    backgroundColor: '#000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 10,
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
    flexDirection: 'column',
  },
  cardInput: {
    // Style for the individual input fields within the CardField
    marginBottom: 10, // Add margin bottom to create spacing between inputs
  },
  cardForm: {
    height: 270,
    width: '80%',
  },

});
