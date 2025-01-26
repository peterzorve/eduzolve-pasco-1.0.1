
// src/app/login.js
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, Image, useColorScheme, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import useInactivityLogout from '@/components/useInactivityLogout';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { TitleAndDescription, HorizontalLine, ModalCustomized2, TouchableOpacityCustomized } from '@/components/customized/MyComponents';
import { AllSubjectsInformations, coreSubjectsInformation } from '@/assets/database/subjectsInformations';
import { usePreventScreenCapture } from 'expo-screen-capture';
import { enableSecureView } from 'react-native-prevent-screenshot-ios-android';
import { useLocalSearchParams } from 'expo-router';
import { dbSTUDENTS, authSTUDENTS, dbTEACHERS, authTEACHERS } from '@/firebaseconfig';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, getDoc, updateDoc} from "firebase/firestore";
// import { TitleAndDescription, customEncrypt, LocalStorageEduZolvePasco, RetrieveLocalStorageEduZolvePasco, capitalizeText, PasscodeSetup, TextInputCustomized, ModalCustomized2, TouchableOpacityCustomized, SelectOneOption, TouchableOpacityWithoutBackground, PasscodeCustomized, BottomSheetCustomized, ModalCustomized, DisplayData1, DisplayData2, AnimationCustomized } from '@/components/customized/MyComponents';


const StudyRoom = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  useInactivityLogout(30);
  const subscriptionStatus = useSelector((state) => state.subscription.status);
  const active = subscriptionStatus?.entitlements?.active?.["pro"]?.isActive ?   true : false
  // const active = true

  const { videosInfoObj } =  useLocalSearchParams();
  const videosInfo = JSON.parse( videosInfoObj );


  usePreventScreenCapture();
  const ScreenshotPrevention = () => {
    if (Platform.OS === 'ios') {
      enableSecureView();
    }
  };
  useEffect(() => {
    ScreenshotPrevention()
  }, []);

  const [videosInformation, setVideosInformation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useLayoutEffect(() => {
    const msgQuery = query(collection(dbSTUDENTS,  "educational-materials", "youtube-links", videosInfo?.category, ) );
    const unsubscribe = onSnapshot(msgQuery, (querySnap) => {
      const upMsg = querySnap?.docs?.map((doc) => doc?.data()); 
      setVideosInformation(upMsg);
    });
    return unsubscribe;
  }, []);





  return (
    <View style={{ flex: 1,    alignSelf: "center",     width: "100%", }}>
      <ScrollView style={{   width: "100%",  alignSelf: "center"   }} >        
        { videosInformation && <AllSubjectsDisplay data={videosInformation} title='Core Subjects'/>}
        
        <View style={{alignSelf: "center", marginBottom: 30, padding: 5,}}>
          <TitleAndDescription description="* We’re committed to improving future updates by reducing and eliminating any errors for a seamless experience." descriptionFontSize={10} descriptionColor='gray'/> 
        </View>
      </ScrollView>
    </View>
  );
};


const AllSubjectsDisplay = ({ data, title="", }) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const handleSelectedVideo = (option) => {
    if (option) {
      Linking.openURL(option)
    }
  };
  return (
    <View style={{width: '100%', marginBottom: 20, alignSelf: "center"}}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between",  backgroundColor: "black" }}> 

        { data.map((option, index) => (
          <TouchableOpacity key={index} style={{ width: "100%", marginBottom: 30, marginVertical: 5,  borderRadius: 5,  }} onPress={() => handleSelectedVideo(option?.youtubelink)} >
            <View style={{ padding: 5 }}>

              <View style={{ height: 230, borderRadius: 0, borderColor: "#388e3c", paddingVertical: 1, alignItems: "center", justifyContent: "center", }} >
                { option?.logo && (
                  <Image source={{ uri: option?.logo }} style={{ width: "100%", height: "100%", }} resizeMode="cover" />
                )}
              </View>

              <View style={{ flexDirection: 'row', padding: 5, marginHorizontal: 5, }} >

                <View style={{ width: 50, height: 50, borderColor: "gray", borderRadius: 30, borderWidth: 1, paddingVertical: 1, alignItems: "center", justifyContent: "center", marginRight: 5 }} >
                  { option?.logo && (
                    <Image source={{ uri: option?.logo }} style={{ width: "100%", height: "100%", borderRadius: 30, }} resizeMode="cover" />
                  )}
                </View>

                <View style={{ flex: 1, alignContent: "center" }} >
                  <Text style={{ paddingLeft: 5, fontSize: 18,  marginBottom: 3, color: colorScheme === "dark" ? "white" : "white", fontFamily: "Kanit" }}>{ option?.title?.length > 60 ? option?.title?.slice(0, 60) + " . . ." : option?.title }</Text>
                  <Text style={{ paddingLeft: 5, color: "gray", fontSize: 11, fontFamily: "Kanit",}}>{ option?.description?.slice(0, 200) } </Text>
                </View>

              </View>

            </View>
          </TouchableOpacity>
        ))}
        
      </View>
    </View>
  )
};

export default StudyRoom;
