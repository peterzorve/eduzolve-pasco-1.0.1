// // src/app/login.js
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Linking } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';

// // import { Constants } from 'expo';
// import Constants from 'expo-constants';
// import * as Device from 'expo-device'
// import * as Application from 'expo-application';
// import { Platform } from 'react-native';


// import DeviceInfo from 'react-native-device-info';
// // import { getUniqueId, getManufacturer } from 'react-native-device-info';



// import { dbSTUDENTS, authSTUDENTS } from '@/firebaseconfig';
// import { doc, setDoc } from 'firebase/firestore';
// import { createUserWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";

// import useInactivityLogout from '@/components/useInactivityLogout';


// // import CryptoJS from 'crypto-js';
// // import * as Crypto from 'expo-crypto';

// // import * as SecureStore from 'expo-secure-store';



// const DeviceID = () => {

//   const router = useRouter();
//   const {height}   = useWindowDimensions()

// //   useInactivityLogout(5 * 60 * 1000);
// // const deviceId = Constants?.deviceId;  
// // const uniqueId = Application?.androidId || Application?.iosId;
// const deviceId = DeviceInfo.getUniqueId();


// // const [isID, setIsID] = useState("")


// const DEVICE_ID_KEY = 'device_id';
// const getPersistentDeviceId = async () => {
//   // Check if the ID already exists
//   let deviceId = await SecureStore.getItemAsync(DEVICE_ID_KEY);

//   if (!deviceId) {
//     // Generate a new unique ID and store it
//     deviceId = 'unique-id-' + Date.now();
//     await SecureStore.setItemAsync(DEVICE_ID_KEY, deviceId);
//   }

//   return deviceId;
// };

    

//   const [username, setUsername] = useState("");

//   const getDeviceID = () => {


//   }



//   return (
//     <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "black", }}>
//         <View style={{backgroundColor: "white", width: "99%", alignSelf: "center", marginVertical: 0.005*height, borderRadius: 5, height: 0.9 * height}}>

//             <View style={{ }}>
//                 <Text style={{fontSize: 16, padding: 20, fontFamily: "Kanit"}} >
//                     {/* Manufacturer : {deviceId} {"\n"} */}
//                     Manufacturer : {Device.manufacturer} {"\n"}
//                     Model Name : {Device.modelName} {"\n"}
//                     Brand : {Device.brand} {"\n"}
//                     Device Name : {Device.deviceName} {"\n"}
//                     Model ID : {Device.deviceName} {"\n"}
//                     Product Name : {Device.deviceName} {"\n"}
//                     os Build ID : {Device.productName} {"\n"}
//                     os Internal Build ID : {Device.osInternalBuildId} {"\n"}
//                     os Name : {Device.osName} {"\n"}
//                     {/* Deice ID : {Device.getUniqueId()} {"\n"} */}
//                     {/* Deice ID : {DeviceInfo.getUniqueId} {"\n"} */}
//                     os Version : {Device.osVersion} {"\n"}
//                 </Text>
//             </View>

//             <View style={[styles.container, {marginTop: 50, borderColor: "green", borderWidth:  1 }]}>
//                 <Ionicons name={'person'}  size={20} color="gray" style={styles.icon}/>
//                 <TextInput style={[styles.input]}  placeholder="username" value={username}  onChangeText={(text) => setUsername( ( text )  )}/>
//             </View>

//             <TouchableOpacity onPress={getDeviceID} disabled={false} style={{padding: 8, backgroundColor:"#2F5597", width: "80%", alignSelf: "center", margin: 5, borderRadius: 20, borderWidth: 1, borderColor: "gray" }} >
//                 <Text style={{textAlign: "center", color: "white"}}>{"Check ID"}</Text>
//             </TouchableOpacity>

//         </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   root: {
//     alignItems: "center", 
//     padding: 20, 
//     marginBottom: 100
//   },

//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover', // or 'stretch' or 'contain'
//     // backgroundColor: 'rgba(255, 255, 255, 0.5)',
//   },

//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // borderColor: 'gray',
//     // borderWidth: 1,
//     borderRadius: 10,
//     width: "80%",
//     alignSelf: "center",
//     padding: 5,
//     margin: 10
//   },
//   input: {
//     flex: 1,
    
//   },
//   icon: {
//     marginRight: 10,
//   },



// });

// export default DeviceID;
