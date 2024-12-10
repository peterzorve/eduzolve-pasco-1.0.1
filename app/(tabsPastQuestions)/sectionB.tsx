import React, { useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions, useColorScheme } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
// import { View, Text, TextInput, Button, StyleSheet, useWindowDimensions, ImageBackground, KeyboardAvoidingView, ScrollView, Platform, Image, TouchableOpacity } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import useInactivityLogout from '@/components/useInactivityLogout';
import { useRouter } from 'expo-router';

import gifImageSectionB from "@/assets/images/gif-images/sectionB.gif"
import { usePreventScreenCapture } from 'expo-screen-capture';

// import fetchDatabaseQuestions
import { fetchDatabaseQuestionsB } from "@/assets/pastquestions/fetchDatabaseQuestionsB"

import { useLocalSearchParams } from 'expo-router';
import Modal from "react-native-modal";


import SubjectLogo from '@/components/TextLogo';
import { useSelector } from "react-redux";


export default function TabTwoScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const { width, height } = Dimensions.get('window');


  useInactivityLogout(30); 
  usePreventScreenCapture()

  
  const subscriptionStatus = useSelector((state) => state.subscription.status);
  const active = subscriptionStatus?.entitlements?.active?.["pro"]?.isActive ?   true : false
  const expirationDateMillis = subscriptionStatus?.entitlements?.active?.["pro"]?.expirationDateMillis
  const originalPurchaseDateMillis = subscriptionStatus?.entitlements?.active?.["pro"]?.originalPurchaseDateMillis
  


  const {  subjectInfoObj } = useLocalSearchParams();
  const subjectInfo = JSON.parse( subjectInfoObj ); 

  const [questionsDatabase, setQuestionsDatabase] = useState(null)
  const [questions, setQuestions] = useState([])

  const [year, setYear] = useState(null);

  const [previousBtnColor, setPreviousBtnColor] = useState("black")
  const [nextBtnColor, setNextBtnColor] = useState("black")



  const [subjectYear, setSubjectYear] = useState([])




  useEffect(() => {  
    const [fetchedQuestions, fetchedYears] = fetchDatabaseQuestionsB(subjectInfo?.shortName, active);
    setQuestionsDatabase(fetchedQuestions);                                
    setSubjectYear(fetchedYears);
  }, [ subjectInfo?.shortName ]);


  useEffect(() => {
    if (year) {
      const lengthOfYears = subjectYear.length
      const index = subjectYear.findIndex(item => item.label === year);
      setQuestions(questionsDatabase[subjectInfo?.shortName + "B" + year])

      if (index === 0) { 
          setPreviousBtnColor("white");
            setNextBtnColor("black");
        } else if (index === lengthOfYears-1) { 
          setPreviousBtnColor("black");
          setNextBtnColor("white");
        } else {
          setPreviousBtnColor("black");
          setNextBtnColor("black")
        }
      } else {
        setPreviousBtnColor("white");
        setNextBtnColor("white");
      }
    }, [year]);





  
  // useEffect(() => {
  //   if (year) {
  //     if (subjectInfo?.shortName === "ENGLISHLANGUAGE") { 
  //         setQuestions( ENGLISHLANGUAGEBDATABASE[subjectInfo?.shortName + "B" + year]); 
  //         const lengthOfData = yearsENGLISHLANGUAGEB.length
  //         const index = yearsENGLISHLANGUAGEB.findIndex(item => item.label === year);
  //         if (index === 0) { setPreviousBtnColor("white")}
  //         if (index === lengthOfData-1) { setNextBtnColor("white")}

  //     } else if ( subjectInfo?.shortName === "INTEGRATEDSCIENCE" ) {
  //       setQuestions( INTEGRATEDSCIENCEBDATABASE[subjectInfo?.shortName + "B" + year]); 
  //       const lengthOfData = yearsINTEGRATEDSCIENCEB.length
  //       const index = yearsINTEGRATEDSCIENCEB.findIndex(item => item.label === year);
  //       if (index === 0) { setPreviousBtnColor("white")}
  //       if (index === lengthOfData-1) { setNextBtnColor("white")} 

  //     }  else if ( subjectInfo?.shortName === "SOCIALSTUDIES" ) {
  //       setQuestions( SOCIALSTUDIESBDATABASE[subjectInfo?.shortName + "B" + year]); 
  //       const lengthOfData = yearsSOCIALSTUDIESB.length
  //       const index = yearsSOCIALSTUDIESB.findIndex(item => item.label === year);
  //       if (index === 0) { setPreviousBtnColor("white")}
  //       if (index === lengthOfData-1) { setNextBtnColor("white")}

  //     }  else if ( subjectInfo?.shortName === "COREMATHEMATICS" ) {
  //       setQuestions( COREMATHEMATICSBDATABASE[subjectInfo?.shortName + "B" + year]); 
  //       const lengthOfData = yearsCOREMATHEMATICSB.length
  //       const index = yearsCOREMATHEMATICSB.findIndex(item => item.label === year);
  //       if (index === 0) { setPreviousBtnColor("white")}
  //       if (index === lengthOfData-1) { setNextBtnColor("white")}
  //     }

  //     }
  //   }, [year]);






    const previousQuestion = () => { 

      const index = subjectYear.findIndex(item => item.label === year);
      if (index > 0) { setNextBtnColor("black");  setPreviousBtnColor("black");  setYear( subjectYear[index - 1].value ); }



      // if (subjectInfo?.shortName === "ENGLISHLANGUAGE") { 
      //     const index = yearsENGLISHLANGUAGEB.findIndex(item => item.label === year);
      //     if (index > 0) { setNextBtnColor("black");  setPreviousBtnColor("black");  setYear( yearsENGLISHLANGUAGEB[index - 1].value ); }
      // }

      // if (subjectInfo?.shortName === "INTEGRATEDSCIENCE") { 
      //   const index = yearsINTEGRATEDSCIENCEB.findIndex(item => item.label === year);
      //   if (index > 0) { setNextBtnColor("black");  setPreviousBtnColor("black");  setYear( yearsINTEGRATEDSCIENCEB[index - 1].value ); }
      // }
      
      // if (subjectInfo?.shortName === "SOCIALSTUDIES") { 
      //   const index = yearsSOCIALSTUDIESB.findIndex(item => item.label === year);
      //   if (index > 0) { setNextBtnColor("black");  setPreviousBtnColor("black");  setYear( yearsSOCIALSTUDIESB[index - 1].value ); }
      // }

      // if (subjectInfo?.shortName === "COREMATHEMATICS") { 
      //   const index = yearsCOREMATHEMATICSB.findIndex(item => item.label === year);
      //   if (index > 0) { setNextBtnColor("black");  setPreviousBtnColor("black");  setYear( yearsCOREMATHEMATICSB[index - 1].value ); }
      // }



    }

    const nextQuestion = () => {
      const lengthOfData = subjectYear.length
      const index = subjectYear.findIndex(item => item.label === year);
      if ( (index >= 0) && (index < (lengthOfData - 1)) ) {  setNextBtnColor("black");  setPreviousBtnColor("black");  setYear( subjectYear[index + 1].value );  } 


      // if (subjectInfo?.shortName === "ENGLISHLANGUAGE") { 
      //   const lengthOfData = yearsENGLISHLANGUAGEB.length
      //   const index = yearsENGLISHLANGUAGEB.findIndex(item => item.label === year);
      //   if ( (index >= 0) && (index < (lengthOfData - 1)) ) {  setNextBtnColor("black");  setPreviousBtnColor("black");  setYear( yearsENGLISHLANGUAGEB[index + 1].value );  } 
      // }
      // if (subjectInfo?.shortName === "INTEGRATEDSCIENCE") { 
      //   const lengthOfData = yearsINTEGRATEDSCIENCEB.length
      //   const index = yearsINTEGRATEDSCIENCEB.findIndex(item => item.label === year);
      //   if ( (index >= 0) && (index < (lengthOfData - 1)) ) {  setNextBtnColor("black");  setPreviousBtnColor("black");  setYear( yearsINTEGRATEDSCIENCEB[index + 1].value );  } 
      // }
      // if (subjectInfo?.shortName === "SOCIALSTUDIES") { 
      //   const lengthOfData = yearsSOCIALSTUDIESB.length
      //   const index = yearsSOCIALSTUDIESB.findIndex(item => item.label === year);
      //   if ( (index >= 0) && (index < (lengthOfData - 1)) ) {  setNextBtnColor("black");  setPreviousBtnColor("black");  setYear( yearsSOCIALSTUDIESB[index + 1].value );  } 
      // }
      // if (subjectInfo?.shortName === "COREMATHEMATICS") { 
      //   const lengthOfData = yearsCOREMATHEMATICSB.length
      //   const index = yearsCOREMATHEMATICSB.findIndex(item => item.label === year);
      //   if ( (index >= 0) && (index < (lengthOfData - 1)) ) {  setNextBtnColor("black");  setPreviousBtnColor("black");  setYear( yearsCOREMATHEMATICSB[index + 1].value );  } 
      // }

    }

    const [showMenu, setShowMenu] = useState(true)

    const [countClicks, setCountClicks] = useState(0)

    const countingAttempts = () => { 
      if (active === false) {
        if (countClicks < 15) {
          setCountClicks(countClicks + 1); 
        } else {
          setCountClicks(0);
        }
      } 
    }

  return (
    <>
      <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }} headerImage={  <Image source={require('@/assets/images/splash/splash6.png')} style={styles.reactLogo} /> }>

          <View style={{ marginBottom: 0, alignItems: "center",     width: "100%",  }}>
              
            <View  style={{ flexDirection: 'row',  alignSelf: "center",  borderRadius: 10,  }} >
              <TouchableOpacity disabled={active} onPress={() => { router.back() }} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10, marginHorizontal: 3,  backgroundColor: "gray", padding: 3 }}>
                <Ionicons name={'arrow-undo-circle'}  size={24} color="white" style={{ }}/>
                <Text style={{   fontFamily: "Kanit", fontSize: 10,  paddingHorizontal: 3, color:"white" }}>Back</Text> 
              </TouchableOpacity>
                <View style={{ flex: 1 }} >
                  <Text style={{ paddingLeft: 5, fontSize: 10,  marginBottom: 3, color: colorScheme === "dark" ? "white" : "black", fontFamily: "Kanit" }}>{active ? "Active subscription. \nAccess to ALL available years." : "Inactive subscription. \nAccess limited to ONLY FIVE years"}</Text>
                </View>
              <TouchableOpacity disabled={active} onPress={() => { router.push('/payment') }} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10, marginHorizontal: 3,  backgroundColor: active ? "green" : "red", padding: 3 }}>
                <Ionicons name={active ? 'lock-open' : 'lock-closed'}  size={24} color="white" style={{ }}/>
                <Text style={{   fontFamily: "Kanit", fontSize: 8,  paddingHorizontal: 3, color:"white" }}>{ active ? "Active" : "Inactive"}{"\n"}Subscip...</Text> 
              </TouchableOpacity>
            </View>

              <View style={{backgroundColor: "#d4d4d4", height: 2, width: "100%", marginVertical: 10}} >
              </View>
              
              
              <View style={{ width: '100%', alignSelf: 'center', paddingVertical: 3,  backgroundColor:  "rgba(255, 255, 255, 1)", margin: 1, borderRadius: 10, borderColor: "gray", borderWidth: 0 }} >
                  <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity onPress={previousQuestion} style={{  justifyContent: "center",   height: 30, borderRadius: 10,  }}>
                          <Ionicons name="arrow-back" size={30} color={previousBtnColor} style={{paddingHorizontal: 10}} />
                      </TouchableOpacity>

                      <Dropdown  style={{flexGrow: 1,  }}   placeholder={'Select year'}    search  value={year}  onChange={(item) => setYear(item.value)}  data={subjectYear} searchPlaceholder="Search"  
                        maxHeight={400}  labelField="label"  valueField="value"  selectedTextStyle={{ textAlign: "center", fontWeight: "bold", fontSize: 30 }}  placeholderStyle={{ textAlign: "center", fontSize: 24, fontFamily: "Kanit", color: "green" }}   inputSearchStyle={{ textAlign: "center" }}
                        renderItem={(item) => (
                          <View style={{ alignItems: 'center', height: 40, justifyContent: 'center', }}>
                              <Text style={{ fontSize: 25, fontFamily: "Kanit" }}>{item?.label}</Text>
                          </View>
                          )}
                        />

                      <TouchableOpacity onPress={ nextQuestion } style={{   marginHorizontal: 5, justifyContent: "center",  height: 30, borderRadius: 3, }}>
                          <Ionicons name="arrow-forward" size={30} color={nextBtnColor} style={{paddingHorizontal: 10}} />
                      </TouchableOpacity>
                  </View>
              </View>

              <View style={{backgroundColor: "#d4d4d4", height: 2, width: "100%", marginVertical: 10}} >
              </View>


          </View>

          <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">{ subjectInfo?.subjectName }</ThemedText>
              {/* <HelloWave /> */}
              <SubjectLogo text={subjectInfo?.subjectName}/>
          </ThemedView>
          <ThemedView style={styles.titleContainer}>
              <ThemedText type="subtitle">Theory </ThemedText>
          </ThemedView>

          <ThemedText style={{ textAlign: "justify", fontFamily: "Kanit", fontSize: 18,}}>Read the question, try to answer them and check the answers later</ThemedText>

          {questions?.length === 0  && (
            <View style={{ borderRadius: 20, marginVertical: 10 }} >
              <Image source={gifImageSectionB} style={[{ flex: 1,  alignSelf: "center", height: width * 1.2, width: "75%", backgroundColor: "white", borderRadius: 20 } ]} resizeMode='contain'/>
            </View>
          )}

          {questions?.map((msg, i) => (
            <View key={i} >

 
              {msg?.section && (    <ThemedText type="title">{msg?.section + "\n"}</ThemedText> )}

              {msg?.instruction && (<ThemedText style={{ textAlign: "justify", fontFamily: "Kanit",  marginVertical: 10}}>{msg?.instruction + ""}</ThemedText>)}



              { (msg?.questionFigure) && (
                        <View style={{borderRadius: 2, marginLeft: 10, marginBottom: 10 }} >
                            <Image source={msg?.questionFigure} style={[{ flex: 1,  alignSelf: "center", height: msg?.imageRatio ? width * 0.5 * msg?.imageRatio * 0.88 : 200 } ]} resizeMode='contain'/>
                        </View>
                  )}


              {msg?.passage    && (
                <>
                  <ThemedText type="subtitle" >PASSAGE </ThemedText>
                  <ThemedText style={{fontSize: 12, textAlign: "justify"}}>{msg?.passage + "\n"}</ThemedText>
                </>
                )}
                

              <Collapsible title={msg?.question} countingFunction={countingAttempts}>
                {msg?.definition && (<ThemedText style={{fontSize: 12, textAlign: "justify"}}>{msg?.definition + "\n"}</ThemedText>)}
                {msg?.options    && (<ThemedText style={{fontSize: 12, textAlign: "justify"}}>{msg?.options}</ThemedText>)}
              </Collapsible>
            </View>
          ))}

      </ParallaxScrollView>

      <View style={{position: 'absolute',  bottom: 10, right: 20, backgroundColor: 'rgba(253,135,28,0.8)', padding: 8, borderRadius: 20, width: showMenu ?  null : "50%" }}>


          { showMenu ? (
            <TouchableOpacity onPress={() => { setShowMenu(!showMenu)}} style={{ justifyContent: "center"}}>
              <Ionicons name="apps" size={30} color={"black"} style={{}} />
            </TouchableOpacity>
          ) : (
            <View style={{flex: 1,  width: "100%",}}>
              <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", }} >
                <View style={{ }} >
                  <Text style={{ fontSize: 28, fontFamily: "Kanit", marginLeft: 15}}>{ year }</Text>
                </View>
                <TouchableOpacity onPress={() => { setShowMenu(!showMenu)}}  style={{ justifyContent: "center"}} >
                  <Ionicons name="close" size={30} color={"black"} style={{}} />
                </TouchableOpacity>
              </View>


              {year && (
                <>
                  <View style={{ height: 1, marginVertical: 5, backgroundColor: "black", marginHorizontal: 20}}></View>
                  <TouchableOpacity onPress={ previousQuestion } style={{flexDirection: "row", flex: 1, width: "100%", padding: 8, alignSelf: "flex-start"}}> 
                    <View style={{ justifyContent: "center", marginRight: 10}}>
                      <Ionicons name="arrow-back" size={30} color={"black"} style={{}} />
                    </View>
                    <View style={{ justifyContent: "center"}}>
                      <Text  style={{fontFamily: "Kanit"}}>Previous</Text>  
                    </View>
                  </TouchableOpacity>

            
                  <View style={{ height: 1, marginVertical: 5, backgroundColor: "black", marginHorizontal: 20}}></View>
                  <TouchableOpacity onPress={ nextQuestion } style={{flexDirection: "row", flex: 1, width: "100%", padding: 8}}> 
                    <View style={{ justifyContent: "center", marginRight: 10}}>
                      <Ionicons name="arrow-forward" size={30} color={"black"} style={{}} />
                    </View>
                    <View style={{ justifyContent: "center"}}>
                      <Text  style={{fontFamily: "Kanit"}}>Next</Text>  
                    </View>
                  </TouchableOpacity>
                </>
                  )}

                      <View style={{ height: 1, marginVertical: 5, backgroundColor: "black", marginHorizontal: 20}}></View>
                      <TouchableOpacity onPress={() => { router.back() }} style={{flexDirection: "row", flex: 1, width: "100%", padding: 8}}> 
                        <View style={{ justifyContent: "center", marginRight: 10}}>
                          <Ionicons name="arrow-undo-circle" size={30} color={"black"} style={{}} />
                        </View>
                        <View style={{ justifyContent: "center"}}>
                          <Text  style={{fontFamily: "Kanit"}}>Go back</Text>  
                        </View>
                      </TouchableOpacity>
          


            </View>

            

          )}



        <Modal isVisible={((countClicks === 15) )} style={{}} >
          <View style={{backgroundColor: "black", borderRadius: 20, width: "90%", alignSelf: "center", borderBottomLeftRadius: 20 }} >

            <View style={{ flexDirection: "row", backgroundColor: "green", borderTopLeftRadius: 20, borderTopEndRadius: 20}}> 
              <View style={{flex: 1, justifyContent: "center"}} >
                <Text style={{textAlign: "center", fontSize: 22, padding: 10, fontFamily: "Kanit"}} >
                  Considering subscription?
                </Text>
              </View >
              <TouchableOpacity onPress={() => { setCountClicks(countClicks + 1); }} style={{   justifyContent: "center", backgroundColor: "red", margin: 5, borderRadius: 30  }} >
                <Ionicons name={'close'} size={34} color="white" style={{ padding: 5,  alignSelf: "center", }}/>
              </TouchableOpacity> 
            </View>

            <View  style={{ paddingVertical: 10, justifyContent: "center", alignItems: "center",   backgroundColor: "#f4f4f4",  paddingBottom: 20, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }} >
              <View style={{borderRadius: 20, alignSelf: "center", marginTop: 30, width: "100%" }} >
                
                <View style={{  }}>
                  <Text style={{color: "green", textAlign: "center",  fontFamily: "Kanit", fontSize: 14, padding: 10}}>You do not have an active subscription. Subscribe to unlock all the PRO features.</Text>
                </View>

                <View style={{flexDirection: "row", marginBottom: 20}} >
                  <TouchableOpacity onPress={() => { router.push("/(drawer)/payment"); }} style={{backgroundColor: "green", flex: 1, marginHorizontal: 20, justifyContent: "center", borderRadius: 10  }} >
                    <Text style={{padding: 10, textAlign: "center",  fontFamily: "Kanit", }} >
                      Subscribe
                    </Text>
                  </TouchableOpacity> 
                  <TouchableOpacity onPress={() => { setCountClicks(countClicks + 1); }} style={{backgroundColor: "red", flex: 1, marginHorizontal: 20, justifyContent: "center", borderRadius: 10  }} >
                    <Text  style={{padding: 10, textAlign: "center",  fontFamily: "Kanit", }} >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>

              </View> 
            </View>


          </View> 
        </Modal>











      </View>
</>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  reactLogo: {
    height: 200,
    width: 150,
    bottom: 0,
    left: 50,
    position: 'absolute',
  },
});
