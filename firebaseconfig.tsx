import { initializeApp } from "firebase/app"; 
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth" 
import { getApp } from "firebase/app"
import { getStorage } from "firebase/storage";

import Constants from 'expo-constants';
// import { AppConfig } from '@env';

// ==== New Version =========================================================
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import {ReactNativeAsyncStorage, AsyncStorage } from '@react-native-async-storage/async-storage'; 



// console.log(console.log(Constants?.expoConfig?.extra?.apiKey))
// console.log(projectId)
// console.log(storageBucket)
// console.log(messagingSenderId)

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional 

const firebaseConfigSTUDENTS = {
  apiKey: Constants?.expoConfig?.extra?.apiKeySTUDENTS,
  authDomain: Constants?.expoConfig?.extra?.authDomainSTUDENTS,
  projectId: Constants?.expoConfig?.extra?.projectIdSTUDENTS,
  storageBucket: Constants?.expoConfig?.extra?.storageBucketSTUDENTS,
  messagingSenderId: Constants?.expoConfig?.extra?.messagingSenderIdSTUDENTS,
  appId: Constants?.expoConfig?.extra?.appIdSTUDENTS,
  measurementId: Constants?.expoConfig?.extra?.measurementIdSTUDENTS
};

// console.log(Constants?.expoConfig?.extra?.apiKeySTUDENTS)
// console.log(Constants?.expoConfig?.extra?.authDomainSTUDENTS)
// console.log(Constants?.expoConfig?.extra?.projectIdSTUDENTS)
// console.log(Constants?.expoConfig?.extra?.storageBucketSTUDENTS)
// console.log(Constants?.expoConfig?.extra?.messagingSenderIdSTUDENTS)
// console.log(Constants?.expoConfig?.extra?.appIdSTUDENTS)
// console.log(Constants?.expoConfig?.extra?.measurementIdSTUDENTS)

const firebaseConfigTEACHERS = {
  apiKey: Constants?.expoConfig?.extra?.apiKeyTEACHERS,
  authDomain: Constants?.expoConfig?.extra?.authDomainTEACHERS,
  projectId: Constants?.expoConfig?.extra?.projectIdTEACHERS,
  storageBucket: Constants?.expoConfig?.extra?.storageBucketTEACHERS,
  messagingSenderId: Constants?.expoConfig?.extra?.messagingSenderIdTEACHERS,
  appId: Constants?.expoConfig?.extra?.appIdTEACHERS,
  measurementId: Constants?.expoConfig?.extra?.measurementIdTEACHERS
};

// console.log(Constants?.expoConfig?.extra?.apiKeyTEACHERS)
// console.log(Constants?.expoConfig?.extra?.authDomainTEACHERS)
// console.log(Constants?.expoConfig?.extra?.projectIdTEACHERS)
// console.log(Constants?.expoConfig?.extra?.storageBucketTEACHERS)
// console.log(Constants?.expoConfig?.extra?.messagingSenderIdTEACHERS)
// console.log( Constants?.expoConfig?.extra?.appIdTEACHERS)
// console.log(Constants?.expoConfig?.extra?.measurementIdTEACHERS)

// Initialize Firebase
export const appSTUDENTS  = initializeApp(firebaseConfigSTUDENTS, 'studentsApp') 
export const dbSTUDENTS   = getFirestore(appSTUDENTS)
export const authSTUDENTS = initializeAuth(appSTUDENTS, { persistence: getReactNativePersistence(ReactNativeAsyncStorage), });
export const storageSTUDENTS = getStorage(appSTUDENTS)


// Initialize Firebase
export const appTEACHERS  = initializeApp(firebaseConfigTEACHERS, 'teachersApp') 
export const dbTEACHERS   = getFirestore(appTEACHERS)
export const authTEACHERS = initializeAuth(appTEACHERS, { persistence: getReactNativePersistence(ReactNativeAsyncStorage), });
export const storageTEACHERS = getStorage(appTEACHERS)