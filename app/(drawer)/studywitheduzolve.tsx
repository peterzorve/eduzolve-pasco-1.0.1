import React, { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, useColorScheme } from 'react-native';
import { router,} from 'expo-router';
import { useSelector } from "react-redux";
import { dbSTUDENTS, authSTUDENTS, dbTEACHERS, authTEACHERS } from '@/firebaseconfig';
import { programingLanguages } from '@/assets/database/studywitheduzolve';
import { HorizontalLine, TitleAndDescription, TouchableOpacityCustomized } from '@/components/customized/MyComponents';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, getDoc, updateDoc} from "firebase/firestore";
// import { TitleAndDescription, customEncrypt, LocalStorageEduZolvePasco, RetrieveLocalStorageEduZolvePasco, capitalizeText, PasscodeSetup, TextInputCustomized, ModalCustomized2, TouchableOpacityCustomized, SelectOneOption, TouchableOpacityWithoutBackground, PasscodeCustomized, BottomSheetCustomized, ModalCustomized, DisplayData1, DisplayData2, AnimationCustomized } from '@/components/customized/MyComponents';




export default function StudyWithEduZolve() {
    const colorScheme = useColorScheme();
    const user = useSelector((state) => state.user.user); 
    const [conversations, setConversations] = useState(null);
    const [programmingLanguages, setProgrammingLanguages] = useState(null); 

    useLayoutEffect(() => {
      const msgQuery = query(collection(dbSTUDENTS, "educational-materials", "programming-languages",  "programming-languages", ) );
      const unsubscribe = onSnapshot(msgQuery, (querySnap) => {
        const upMsg = querySnap.docs.map((doc) => doc.data()); 
        setProgrammingLanguages(upMsg);
        // setIsLoading(false); 
      });
      return unsubscribe;
    }, []);

    useLayoutEffect(() => {
      const msgQuery = query(collection(dbSTUDENTS, "educational-materials", "conversations",  "conversations", ) );
      const unsubscribe = onSnapshot(msgQuery, (querySnap) => {
        const upMsg = querySnap.docs.map((doc) => doc.data()); 
        setConversations(upMsg);
        // setIsLoading(false); 
      });
      return unsubscribe;
    }, []);
  



    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{  width: "90%", alignSelf: "center", marginTop: 0 }}>
                <TitleAndDescription title='EDUCATIONAL MATERIALS AND VIDEOS' titleFontSize={20} titleAlign='center' titleColor={ colorScheme === "dark" ? "white" : "black" } />
                <TitleAndDescription description='Learn from experts across diverse fields on EduZolve platforms' descriptionFontSize={10} descriptionAlign='center' descriptionColor={ colorScheme === "dark" ? "white" : "gray" } />
                <HorizontalLine lineColor='#c4c4c4'/>

                {programmingLanguages?.length > 0 && <FetchSubject1 data={programmingLanguages} title='Programming Languages' />}
                {conversations?.length > 0        && <FetchSubject1 data={conversations} title='eduzolve conversations' />}

            </ScrollView>
        </View>
    );
}

const FetchSubject1 = ({ data, title="" }) => {

  const colorScheme = useColorScheme();
  const handleSelectedVideo = (option) => {
    router.push({ pathname: '/studyroom', params: { videosInfoObj: JSON.stringify(option) }, });
  };
  return (
    <View style={{width: '100%', marginBottom: 20}}>
        <TitleAndDescription title={title} titleColor={ colorScheme === "dark" ? "white" : "black" } />
        {data && data.map((option, index) => (
            <View key={index}>
            <TouchableOpacity style={[ {  marginVertical: 3, borderRadius: 5,  },]} onPress={() => handleSelectedVideo(option)} >
                <View style={{ flexDirection: 'row', padding: 5, }} >
                    <View style={{ width: 50, height: 50, borderColor: "gray", borderRadius: 30, borderWidth: 0, paddingVertical: 1, alignItems: "center", justifyContent: "center", marginRight: 5 }} >
                      { option?.logo && (
                        <Image source={{ uri: option?.logo }} style={{ width: "100%", height: "100%", borderRadius: 30 }} resizeMode="cover" />
                        )}
                    </View>
                    <View style={{ flex: 1 }} >
                      <Text style={{ paddingLeft: 5, fontSize: 16,  marginBottom: 3, color: colorScheme === "dark" ? "white" : "black", fontFamily: "Kanit" }}>{(index+1) }. { option?.title}</Text>
                      <Text style={{ paddingLeft: 5, color: "gray", fontSize: 11, fontFamily: "Kanit",}}>{option?.description }</Text>
                    </View>
                </View>
            </TouchableOpacity>
            </View>
        ))}
    </View>
  )
};


