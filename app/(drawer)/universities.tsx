import React, { useState, useEffect, useRef  } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, ActivityIndicator, Image, Dimensions, useColorScheme, Animated, PanResponder, Linking } from 'react-native';
import { router, useRouter } from 'expo-router';


// import { ghana } from '@/assets/database/ghana';
import { universities_ghana } from '@/assets/universities/universities_ghana';
import { HorizontalLine, TitleAndDescription } from '@/components/customized/MyComponents';

export default function UniversityScreen() {
  const colorScheme = useColorScheme();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{  width: "90%", alignSelf: "center", marginTop: 0 }}>
        <TitleAndDescription title='Universities in Ghana' titleAlign='center' titleColor={colorScheme === "dark" ? "white" : "black"}/>
        <TitleAndDescription description='Find your university and program of your dream' descriptionFontSize={12} descriptionAlign='center' descriptionColor={colorScheme === "dark" ? "white" : "black"}/>
        <HorizontalLine lineColor='#c4c4c4'/>
        <FetchSubject1 data={universities_ghana} />
      </ScrollView>
    </View>
  );
}

const FetchSubject1 = ({ data}) => {
  const colorScheme = useColorScheme();
  const handleSelectedVideo = (option) => {
    router.push({ pathname: '/(tabsUniversities)', params: { universityInformation: JSON.stringify(option) }, });
  };
  return (
    <View style={{width: '100%', marginBottom: 20}}>
      {data.map((option, index) => (
        <View key={index}>
          <TouchableOpacity style={[ {  marginVertical: 3, borderRadius: 5, },]} onPress={() => handleSelectedVideo(option)} >
            <View style={{ flexDirection: 'row', padding: 5, }} >
                <View style={{ width: 50, height: 50, borderColor: "#388e3c", paddingVertical: 1, alignItems: "center", justifyContent: "center", marginRight: 10 }} >
                  { option?.logo && (
                    <Image source={{ uri: option?.logo }} style={{ width: "100%", height: "100%", borderRadius: 30 }} resizeMode="cover" />
                  )}
                </View>
                <View style={{ flex: 1 }} >
                  <Text style={{ paddingLeft: 5, fontSize: 18,  marginBottom: 3, color: colorScheme === "dark" ? "white" : "black", fontFamily: "Kanit" }}>{ option?.name}</Text>
                  <Text style={{ paddingLeft: 5, color: "gray",fontSize: 12, fontFamily: "Kanit",}}>More than {option?.number_of_degrees } bachelors, masters, and phd programs</Text>
                </View>
              
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
};
