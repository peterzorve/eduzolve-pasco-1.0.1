// src/app/login.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, Image, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import useInactivityLogout from '@/components/useInactivityLogout';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { TitleAndDescription, HorizontalLine, ModalCustomized2, TouchableOpacityCustomized } from '@/components/customized/MyComponents';
import { AllSubjectsInformations, coreSubjectsInformation } from '@/assets/database/subjectsInformations';
import { usePreventScreenCapture } from 'expo-screen-capture';
import { enableSecureView } from 'react-native-prevent-screenshot-ios-android';

const PastQuestionScreen = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  useInactivityLogout(30);
  const subscriptionStatus = useSelector((state) => state.subscription.status);
  const active = subscriptionStatus?.entitlements?.active?.["pro"]?.isActive ?   true : false
  // const active = true

  usePreventScreenCapture();
  const ScreenshotPrevention = () => {
    if (Platform.OS === 'ios') {
      enableSecureView();
    }
  };
  useEffect(() => {
    ScreenshotPrevention()
  }, []);

  return (
    <View style={{ flex: 1,    alignSelf: "center",     width: "100%",  }}>
      <ScrollView style={{   width: "100%",  alignSelf: "center"   }} >     
            <View style={{   width: "90%",  alignSelf: "center"   }} >
            <TitleAndDescription title={"Past questions & solutions"} titleFontSize={23} titleColor={colorScheme === "dark" ? "white" : "black" } titleAlign='center'/> 

            <TitleAndDescription description={active ? "Enjoy all your PRO features!" : "Unlock all content with a subscription."} descriptionFontSize={16} descriptionColor={colorScheme === "dark" ? "white" : "black"} descriptionAlign='center' /> 

            </View>

            {/* <View  style={{ flexDirection: 'row', marginVertical: 10, width: "90%",  padding: 5, alignSelf: "center",  borderRadius: 10 }} >
              <TouchableOpacity disabled={active} onPress={() => { router.push('/payment') }} style={{ flexDirection: "row", width: 50, height: 50, justifyContent: "center", alignItems: "center", borderRadius: 30, marginRight: 5,  backgroundColor: active ? "green" : "red", padding: 3 }}>
                
                <Image source={ require("@/assets/images/settings-images/subscribe.png") }  style={{ width: "100%", height: "100%", borderRadius: 30 }} resizeMode="cover" />
              </TouchableOpacity>
              <View style={{flex: 1}} >
                <Text style={{textTransform: "uppercase", fontFamily: "Kanit", fontSize: 18, color: active ? "green" : "red"}} >
                  {active ? "active subscription" : "Inactive subscription"}
                </Text>
                <TitleAndDescription description={active ? "Enjoy all your PRO features!" : "Unlock all content with a subscription."} descriptionFontSize={12} descriptionColor={active ? "green" : "red"} /> 

              </View>
          </View> */}

          <AllSubjectsDisplay data={coreSubjectsInformation} title='Core Subjects'/>
          <AllSubjectsDisplay  data={AllSubjectsInformations} title='AVAILABLE SUBJECTS' active={active}/>
          <View style={{alignSelf: "center", marginBottom: 30, padding: 5,}}>
            <TitleAndDescription description="* We’re committed to improving future updates by reducing and eliminating any errors for a seamless experience." descriptionFontSize={10} descriptionColor='gray'/> 
          </View>
        </ScrollView>

    </View>
  );
};


  const AllSubjectsDisplay = ({ data, title="", active=false}) => {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const [showModal, setShowModal] = useState(false);
    const handleSelectedVideo = (option) => {
      if (["ENGLISHLANGUAGE", "INTEGRATEDSCIENCE", "COREMATHEMATICS", "SOCIALSTUDIES"].includes(option?.shortName)) {
        const subjectInfoObj = {subjectName: option?.subjectName, shortName:  option?.shortName};
        router.push({ pathname: '/(tabsPastQuestions)', params: { subjectInfoObj: JSON.stringify(subjectInfoObj) }, });
      } else {
        if (active) {
          const subjectInfoObj = {subjectName: option?.subjectName, shortName:  option?.shortName};
          router.push({ pathname: '/(tabsPastQuestions)', params: { subjectInfoObj: JSON.stringify(subjectInfoObj) }, });
        }  else {
          setShowModal(true)
        }
      }

    };
    return (
      <View style={{width: '90%', marginBottom: 20, alignSelf: "center"}}>
        <TitleAndDescription title={title} titleFontSize={20} titleColor={colorScheme === "dark" ? "white" : "black" }/>
        <HorizontalLine lineColor={colorScheme === "dark" ? "white" : "gray" } lineHeight={3}/>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          {data.map((option, index) => (
            <TouchableOpacity key={index} style={{ width: "48%",  marginVertical: 5,  borderRadius: 5,  }} onPress={() => handleSelectedVideo(option)} >
              <View style={{ padding: 5 }}>
                <View style={{ height: 100, borderRadius: 10, borderColor: "#388e3c", paddingVertical: 1, alignItems: "center", justifyContent: "center", }} >
                  <Image source={option?.logo}  style={{ width: "100%", height: "100%", borderRadius: 10 }} resizeMode="cover" />
                </View>
                <TitleAndDescription title={option?.subjectName} titleFontSize={16} titleColor={ colorScheme === "dark" ? "white" : "black" } /> 
                <TitleAndDescription description={option?.description} descriptionFontSize={10} descriptionColor='gray'/> 
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <ModalCustomized2 isModalVisible={showModal} setIsModalVisible={setShowModal}>
          <TitleAndDescription title={"Not subscribed"} description={"You need an active subscription to access this content"}/>
          <TouchableOpacityCustomized onPress={() => { setShowModal(false); router.push("/payment");}} buttontext='Start your subscription today' backgroundColor='green' />
        </ModalCustomized2>
      </View>
    )
  };

export default PastQuestionScreen;
