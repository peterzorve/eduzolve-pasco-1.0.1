import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity, useWindowDimensions, Dimensions, useColorScheme, Linking, Animated,    } from 'react-native';
import { useRouter } from 'expo-router';
import { Link, Stack } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import { degreePrograms } from '@/assets/universities/degreePrograms';
import { TitleAndDescription, HorizontalLine, ModalCustomized2, TouchableOpacityCustomized } from '@/components/customized/MyComponents';

export default function BachelorDegree() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const {universityInformation } = useLocalSearchParams();
  const universityInfo = JSON.parse(universityInformation)
  const bachelorsPrograms = degreePrograms.filter( (university) => (university.name === universityInfo?.name) &&  (university.category === "bachelors") );
  const { width } = Dimensions.get('window');
  const [selectProgram, setSetProgram] = useState({})
  // const [isZoomed, setIsZoomed] = useState(true);

  const handleSelection = (program, index) => {
    if (selectProgram?.name === program?.name) {
      setSetProgram(program); 
    } else {
      setSetProgram(program); 
    }
  }



  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{  width: "100%", alignSelf: "center", marginTop: 50 }} showsVerticalScrollIndicator={false}> 
  
          <View style={{  height: 250,  borderColor: "#388e3c", paddingTop: 10, alignItems: "center", justifyContent: "center", marginBottom: 20 }} >
            <Image source={{ uri: universityInfo?.logo }} style={{ width: "100%", height: "100%",  }} resizeMode="cover" />
            <View style={{position: "absolute", bottom: 10,  left: 10, backgroundColor: "rgba(0,0,0,0.7)", borderRadius: 10, }} >
              <Text style={{  fontFamily: "Kanit", color: "#fff", fontSize: 20,  paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, }} >
              {universityInfo?.name}
              </Text>
            </View>
            <TouchableOpacity onPress={() => { router.push("/(drawer)/universities")}} style={{position: "absolute", top: 10,  left: 10, backgroundColor: "rgb(255, 255, 255)", borderRadius: 50, marginTop: 10}} >
              <Ionicons name={'arrow-back'}  size={24} color="black" style={{margin: 10}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {Linking.openURL(universityInfo?.["web_pages"])}} style={{position: "absolute", top: 10,  right: 10, backgroundColor: "rgba(0,0,0,1)", borderRadius: 50, marginTop: 10}} >
              <Ionicons name={'globe'}  size={24} color="orange" style={{margin: 10}} />
            </TouchableOpacity>
          </View>

          <View style={{ width: "90%", alignSelf: "center",  }} >
            <TitleAndDescription title={ "Bachelor's programs"} titleFontSize={26} titleColor={colorScheme === "dark" ? "white" : "black"} />
            <ScrollView horizontal style={{ marginTop: 20,  }} showsHorizontalScrollIndicator={false}>
              {bachelorsPrograms && bachelorsPrograms.map((programs, index) => (
                <TouchableOpacity onPress={() => handleSelection(programs, index)} key={index} 
                style={[{ 
                  marginRight: 20, width: 0.6 * width, padding: 10, borderRadius: 10, 
                   backgroundColor : selectProgram?.programme === programs?.programme ? "rgb(104, 53, 8)" : "transparent",
                  },]}>
                  <View style={{   height: 0.4 * width,   borderRadius: 10,   borderColor: "#388e3c",   overflow: "hidden",   alignItems: "center",   justifyContent: "center", }} >
                    { programs?.logo && (
                      <Image source={{   uri: programs?.logo, }} style={{ width: "100%", height: "100%" }} resizeMode="cover"/>
                    )}
                  </View>
                  <View style={{ marginTop: 5, flexDirection: "row", }}>
                    <TitleAndDescription description={programs?.programme} descriptionFontSize={16} descriptionColor={colorScheme === "dark" ? "white" : "black"} />
                    <Text style={{   color: "gray",   fontSize: 12,   fontFamily: "Kanit",   }}>
                      ~ 4 yrs
                    </Text>
                  </View>
                  <Text style={{   color: "gray",   fontSize: 12,   fontFamily: "Kanit", marginBottom: 15  }}>
                      Faculty - {programs?.faculty}
                    </Text>

                  <View style={{ backgroundColor: "#00c04b", alignSelf: "flex-start", borderRadius: 10, paddingHorizontal: 10, marginBottom: 10}} >
                    <Text style={{   color: colorScheme === "dark" ? "white" : "black",   fontSize: 12,   fontFamily: "Kanit",   marginVertical: 1, lineHeight: 26,}}>
                      Fee unavailable
                    </Text>
                  </View>
                  <Text style={{   color: colorScheme === "dark" ? "gray" : "gray",   fontSize: 10,   fontFamily: "Kanit",   marginBottom: 10, }}>
                    Due to the frequent adjustments in tuition fees, we cannot provide an exact figure at this time. For the most accurate and current information, please visit the university website at {" "}
                    <Text style={{   color: selectProgram?.programme === programs?.programme ? "white" : "black", textDecorationLine: "underline" }}>
                      {programs?.web_pages}
                    </Text>
                  </Text>

                    <TouchableOpacity style={{ }} onPress={(e) => { e.stopPropagation(); Linking.openURL(universityInfo?.["web_pages"]); }} >
                      <Text style={{ fontFamily: "KanitBold", fontSize: 12, paddingVertical: 5, color: selectProgram?.programme === programs?.programme ? "gold" : "black",  }}>Click here to visit website</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
              ))}

              {bachelorsPrograms?.length === 0 &&(
                <TitleAndDescription description={ "No available programs"} descriptionFontSize={18} descriptionColor={colorScheme === "dark" ? "white" : "black"} />
              )}

            </ScrollView>

            {  selectProgram?.requirement && (
                <View style={{  }}>
                  <TitleAndDescription title={"Admission Requirements"} titleFontSize={26} titleColor={colorScheme === "dark" ? "white" : "black"} />
                  <Text style={{   color: colorScheme === "dark" ? "gray" : "gray",   fontSize: 11,   fontFamily: "Kanit",   marginBottom: 10, lineHeight: 24,  }}>
                    {selectProgram?.requirement}
                  </Text>
                </View>
            )}
           </View>

          
      </ScrollView>
    </View>
  );
}
