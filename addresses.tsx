
// import { BoldText } from '@/mathnotation'
import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, FlatList, TouchableOpacity, ImageBackground } from 'react-native'






export const letterHead = (recipient="") => {
    let randomNumber = Math.floor(Math.random() * 8) + 1;
     switch (randomNumber) {
        case 1: 
          return "45 Kofi Annan St, \nAccra, Ghana \nDigital Address: GA1184349 \n\nDear " + recipient ;
        case 2: 
          return "45 Kofi Annan St, \nAccra, Ghana \nDigital Address: GA1184349 \n\nDear " + recipient;
        case 3: 
          return "45 Kofi Annan St, \nAccra, Ghana \nDigital Address: GA1184349 \n\nDear " + recipient;
        case 4: 
          return "45 Kofi Annan St, \nAccra, Ghana \nDigital Address: GA1184349 \n\nDear " + recipient;
        case 5: 
          return "45 Kofi Annan St, \nAccra, Ghana \nDigital Address: GA1184349 \n\nDear " + recipient;
        case 6: 
          return "45 Kofi Annan St, \nAccra, Ghana \nDigital Address: GA1184349 \n\nDear " + recipient;
        default: 
          return "45 Kofi Annan St, \nAccra, Ghana \nDigital Address: GA1184349 \n\nDear " + recipient;
     }
  };

  export const conclusion = (myName="Your name", address="Your Contact Information") => {
    let randomNumber = Math.floor(Math.random() * 8) + 1;
     switch (randomNumber) {
        case 1: 
          return "\nWith love and respect, \n"+ myName + "\n" + address ;
        case 2: 
          return "\nWith love and respect, \n"+ myName + "\n" + address;
        case 3: 
          return "\nWith love and respect, \n"+ myName + "\n" + address;
        case 4: 
          return "\nWith love and respect, \n"+ myName + "\n" + address;
        case 5: 
          return "\nWith love and respect, \n"+ myName + "\n" + address;
        case 6: 
          return "\nWith love and respect, \n"+ myName + "\n" + address;
        default: 
          return "\nWith love and respect, \n"+ myName + "\n" + address;
     }
  };
      




  

  export const EasyTitle = ({ text }) => {
    return (
      <Text style={{ fontWeight: 'bold', fontFamily: "KanitBold", textTransform: "capitalize" }}>{text} </Text>
    );
  };

  
  export const EasySubTitle = ({ text }) => {
    return (
      <Text style={{ fontWeight: 'bold', fontFamily: "KanitBold",}}>{text} </Text>
    );
  };


