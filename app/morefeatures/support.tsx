import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, TextInput, ImageBackground, Image, StyleSheet } from "react-native";
import React, { useLayoutEffect, useRef, useState,  } from "react";
import { Entypo, FontAwesome,} from "@expo/vector-icons";
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp,} from "firebase/firestore";
// import { db } from "../../../firebaseConfig";
import { db } from "@/firebaseconfig";
import { useSelector } from "react-redux";
import axios from 'axios';


const ContactSupport = ({ route }) => {
    const user = useSelector((state) => state.user.user);
    const [message, setMessage] = useState("");
    const [disableBtn, setDisableBtn] = useState(false)

    const sendMessage = async () => {  
      if (message.trim()) {
        const formData = new FormData();
        formData.append("access_key", "45b7e91c-948f-442e-8fda-2749666ca42f");
        formData.append("name", user?.username);
        formData.append("email", user?.email);
        formData.append("message", message.trim() );
    
        try {
          setDisableBtn(true)
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
          });
    
          const data = await response.json();
    
          if (data.success) {
            alert("MESSAGE SUBMITTED SUCCESSFULLY\nThe support team will reach out to you in 2 or 3 working days. Do not send the same message on the same issue.")
            setMessage(""); 
            setDisableBtn(false)
          } else {
            alert(data?.message); 
            setDisableBtn(false);
          }
        } catch (error) {
            alert(error?.message);
            setDisableBtn(false);
        }
      }
    };


  

 

    return (
      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={100} style={{marginBottom: 20}} > 
          <View  style={{  width: "88%", alignSelf: "center", marginTop: 10,  borderRadius: 15}}>
              <Text style={{ fontFamily: "Kanit", fontSize: 14,  color: "black" }} >Send an email to the support team for an assistance</Text>
          </View> 
          <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 10, width: "90%", alignSelf: "center", marginVertical: 5 }}>
              <TextInput  value={message}  multiline={true}  onChangeText={setMessage}  placeholder={"Message"}  style={[{padding: 10, width: "85%", minWidth: "85%"},  {minHeight: 40},   {maxWidth:  "85%"}]}secureTextEntry={false}/> 
          </View> 
          <View  style={{padding: 8, backgroundColor: "#2F5597",  alignSelf: "center",  borderRadius: 30,  width: "90%",   }}>
            <TouchableOpacity onPress={sendMessage} style={{ }} disabled={disableBtn}>
                <Text style={{textAlign: "center", color: "white", fontFamily: "Kanit", fontSize: 15}}>Submit</Text>
            </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
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
      resizeMode: 'cover', 
    },
  
    messageTitle: {
      paddingLeft: 5
    },

    root1: {
      // alignItems: "center", 
      padding: 3, 
      marginBottom: 100
    },

    horizontal1: {
      flexDirection: 'row', 
      // padding: 5
    },
  
    container: { backgroundColor: "white", borderColor: "#e8e8e8", borderWidth: 1,  borderColor: '#000', borderRadius: 10,  margin: 5,
  },

  input: {
      padding: 20
  }
  
  }); 

export default ContactSupport;

