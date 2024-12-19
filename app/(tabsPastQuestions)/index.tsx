// import { Image, StyleSheet, Platform } from 'react-native';
import React, { useState, useEffect } from 'react'
// import ScreenshotDetector from 'react-native-screenshot-detector';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, useColorScheme, Platform } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import useInactivityLogout from '@/components/useInactivityLogout';

import Modal from "react-native-modal";
import gifImageSectionA from "@/assets/images/gif-images/sectionA.gif"
// import { usePreventScreenCapture } from 'expo-screen-capture';

import { fetchDatabaseQuestionsA } from "@/assets/pastquestions/fetchDatabaseQuestionsA"

import SubjectLogo from '@/components/TextLogo';
import { useSelector } from "react-redux";


import { usePreventScreenCapture } from 'expo-screen-capture';
import { enableSecureView } from 'react-native-prevent-screenshot-ios-android';



export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  useInactivityLogout(30);
  usePreventScreenCapture()

  const subscriptionStatus = useSelector((state) => state.subscription.status);
  const active = subscriptionStatus?.entitlements?.active?.["pro"]?.isActive ?   true : false
  const expirationDateMillis = subscriptionStatus?.entitlements?.active?.["pro"]?.expirationDateMillis
  const originalPurchaseDateMillis = subscriptionStatus?.entitlements?.active?.["pro"]?.originalPurchaseDateMillis
  
  const { width, height } = Dimensions.get('window');
  const {subjectInfoObj } = useLocalSearchParams();
  const subjectInfo = JSON.parse( subjectInfoObj ); 
  const [questionsDatabase, setQuestionsDatabase] = useState(null)
  const [questions, setQuestions] = useState([])
  const [year, setYear] = useState(null);
  const [previousBtnColor, setPreviousBtnColor] = useState("black")
  const [nextBtnColor, setNextBtnColor] = useState("black")
  const [subjectYear, setSubjectYear] = useState([])


     usePreventScreenCapture();
      const ScreenshotPrevention = () => {
       if (Platform.OS === 'ios') {
          enableSecureView();
        }
      };
      useEffect(() => {
        ScreenshotPrevention()
      }, []);



  useEffect(() => {  
    const [fetchedQuestions, fetchedYears] = fetchDatabaseQuestionsA(subjectInfo?.shortName, active);
    setQuestionsDatabase(fetchedQuestions);                                
    setSubjectYear(fetchedYears);
  }, [ subjectInfo?.shortName ]);

   
    useEffect(() => {
      if (year) {
        const lengthOfYears = subjectYear.length
        const index = subjectYear.findIndex(item => item.label === year);
        setQuestions(questionsDatabase[subjectInfo?.shortName + "A" + year])
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


  const previousQuestion = () => { 
    const index = subjectYear.findIndex(item => item.label === year);
    if (index > 0) { setNextBtnColor("black");  setPreviousBtnColor("black");  setYear( subjectYear[index - 1].value ); 
      setSelectedOptions({}); setScore(0); setShowResults(false); setSubmitBtnText("Submit");
    }
  }

  const nextQuestion = () => {
    const lengthOfData = subjectYear.length
    const index = subjectYear.findIndex(item => item.label === year);
    if ( (index >= 0) && (index < (lengthOfData - 1)) ) {  setNextBtnColor("black");  setPreviousBtnColor("black");  setYear( subjectYear[index + 1].value );  
      setSelectedOptions({}); setScore(0); setShowResults(false); setSubmitBtnText("Submit");
    } 
  }


  const [selectedOptions, setSelectedOptions] = useState({})
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [subject, setSubject] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [start, setStart] = useState(true);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const [submitBtnText, setSubmitBtnText] = useState("Submit");


  const handleOptionSelect = (questionIndex, option) => {
    setSelectedOptions({ ...selectedOptions, [questionIndex]: option, });
  };


  const handleSubmit = () => { 
    if (submitBtnText === "Submit") {
      let correctAnswers = 0;        
      questions.forEach((question, index) => { if (selectedOptions[index] === question.correctOption) {  correctAnswers++ ;   } })
      setIsModalVisible(true);  setScore(correctAnswers);  setShowResults(true);  setSubmitBtnText("Try again");
    } else if (submitBtnText === "Try again") {
      setSelectedOptions({});  setScore(0);  setShowResults(false);  setSubmitBtnText("Submit");
    }
  }

  
 


  // ======  Modal =============================================================================================================
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [gradingSystem, setGradingSystem] = useState(false)
  const widthLength  = Math.floor(( 0.2 * Dimensions.get('window').width) ) ;


  const [showMenu, setShowMenu] = useState(true)




  return (
    // <View>
<>
      <ParallaxScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }} headerImage={ <Image source={require('@/assets/images/splash/splash6.png')} style={styles.reactLogo} />  }>
        <View style={{ marginBottom: 0, alignItems: "center",     width: "100%",  }}>
            
            <View  style={{ flexDirection: 'row',  alignSelf: "center",  borderRadius: 10, marginHorizontal: -8 }} >
              <TouchableOpacity onPress={() => { router.back() }} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10, marginHorizontal: 3,  backgroundColor: "gray", padding: 3 }}>
                <Ionicons name={'arrow-undo-circle'}  size={24} color="white" style={{ }}/>
                <Text style={{   fontFamily: "Kanit", fontSize: 10,  paddingHorizontal: 3, color:"white" }}>Back</Text> 
              </TouchableOpacity>
                <View style={{ flex: 1 }} >
                  <Text style={{ paddingLeft: 5, fontSize: 10,  marginBottom: 3, color: colorScheme === "dark" ? "white" : "black", fontFamily: "Kanit" }}>{active ? "Active subscription. \nAccess to ALL available years." : "Inactive subscription. \nAccess limited to ONLY FIVE years"}</Text>
                </View>
              <TouchableOpacity disabled={active} onPress={() => { router.push('/payment') }} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10, marginHorizontal: 3,  backgroundColor: active ? "green" : "red", padding: 3 }}>
                <Ionicons name={active ? 'lock-open' : 'lock-closed'}  size={24} color="white" style={{ }}/>
                <Text style={{   fontFamily: "Kanit", fontSize: 8,  paddingHorizontal: 3, color:"white" }}>{ active ? "Active" : "Inactive"}{"\n"}Subsciption</Text> 
              </TouchableOpacity>
            </View>

            { (active === false) && (
              <View style={{flex: 1, width: "102%"}} >
                <Text style={{ fontFamily: "Kanit", fontSize: 12,  color: colorScheme === "dark" ? "white" : "black", marginVertical: 10}} >
                  You need an active subscription to access all available years. {"\n"}
                  Currently, you can only access the past 5 years.
                </Text>
                </View>
              )}
            <View style={{backgroundColor: "#d4d4d4", height: 2, width: "100%", marginVertical: 10}} >

            </View>


            <View style={{ width: '100%', alignSelf: 'center', paddingVertical: 3,  backgroundColor:  "rgba(255, 255, 255, 1)", margin: 1, borderRadius: 10, borderColor: "gray", borderWidth: 0 }} >




                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={previousQuestion} style={{  justifyContent: "center",   height: 30, borderRadius: 10,  }}>
                        <Ionicons name="arrow-back" size={30} color={previousBtnColor} style={{paddingHorizontal: 10}} />
                    </TouchableOpacity>

                    <Dropdown  style={{flexGrow: 1, }}   placeholder={'Select year'}  search  value={year}  onChange={(item) => setYear(item.value)}  data={subjectYear} searchPlaceholder="Search"  
                      maxHeight={400}  labelField="label"  valueField="value"  selectedTextStyle={{ textAlign: "center", fontWeight: "bold", fontSize: 30 }}  placeholderStyle={{ textAlign: "center", fontSize: 24, fontFamily: "Kanit", color: "green" }}   inputSearchStyle={{ textAlign: "center" }}
                      renderItem={(item) => (
                        <View style={{ alignItems: 'center', height: 40, justifyContent: 'center', }}>
                            <Text style={{ fontSize: 20, fontFamily: "Kanit" }}>{item.label}</Text>
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
                <ThemedText type="title">{ subjectInfo?.subjectName } </ThemedText>
                <SubjectLogo text={subjectInfo?.subjectName}/>
              </ThemedView>

              <ThemedView style={styles.titleContainer}>
                <ThemedText type="subtitle">Objectives</ThemedText>
              </ThemedView>


        {questions?.length === 0  && (
            <View style={{  marginVertical: 10,  }} >
              <Image source={gifImageSectionA} style={[{ flex: 1,  alignSelf: "center", height: width * 1.2, width: "75%", backgroundColor:  "white", borderRadius: 20, } ]} resizeMode='contain'/>
            </View>
          )}

        {questions?.map((item, index) => (
            <View key={index}  style={{marginHorizontal: -10, marginTop: 10}} >
                <View  key={item?.index}  style={{  borderRadius: 10,  marginBottom: 3,  paddingVertical: 3,  }} >

                  {/* { ( item?.instruction )     && ( <ThemedText  style={{fontSize: 15, fontFamily: "Georgia", textAlign: "justify" }}>{ item.instruction }</ThemedText> ) } */}
                  

                  {item?.section && (    <ThemedText type="title">{ item?.section?.length < 5 ? "SECTION " + item?.section + "\n" : item?.section + "\n" }</ThemedText> )}

                  {item?.instruction && (<ThemedText style={{ fontFamily: "Kanit", }}>{item?.instruction + "\n"}</ThemedText>)}

                  {item?.passage    && (
                    <>
                      <ThemedText type="subtitle">PASSAGE </ThemedText>
                      <ThemedText style={{fontSize: 14, textAlign: "justify"}}>{item?.passage + "\n"}</ThemedText>
                    </>
                    )}



                  { (item?.questionFigure) && (
                    <View style={{ borderRadius: 2, marginVertical: 10 }} >
                            <Image source={item?.questionFigure} style={[{ flex: 1,  alignSelf: "center", height: item?.imageRatio ? width * 0.5 * item?.imageRatio * 0.88 : 200 } ]} resizeMode='contain'/>
                        </View>

                  )}

                  { ( item?.question )     && ( <ThemedText  style={{fontSize: 15, fontFamily: "Kanit" }}>{ item.question }</ThemedText> ) }
                  
                  { ( item?.A ) && (
                      <TouchableOpacity onPress={() => { handleOptionSelect(index, 1) }}  disabled={showResults}
                          style={[ styles.option,  selectedOptions[index] === 1 && styles.selectedOptions,  showResults && item?.correctOption === 1 && styles.correctOption, showResults && selectedOptions[index] === 1 && selectedOptions[index] !== item?.correctOption && styles.wrongOption, ]}>
                            <Text style={{fontSize: 12, fontFamily: "OpenSans" }}>A. {item?.A}</Text> 
                      </TouchableOpacity>
                  ) }
                  { ( item?.B ) && (
                      <TouchableOpacity onPress={() => { handleOptionSelect(index, 2) }}  disabled={showResults}
                          style={[ styles.option,  selectedOptions[index] === 2 && styles.selectedOptions,  showResults && item?.correctOption === 2 && styles.correctOption, showResults && selectedOptions[index] === 2 && selectedOptions[index] !== item?.correctOption && styles.wrongOption, ]}>
                          <Text style={{fontSize: 12, fontFamily: "OpenSans" }}>B. {item?.B}</Text> 
                      </TouchableOpacity>
                  ) }
                  { ( item?.C ) && ( 
                      <TouchableOpacity onPress={() => { handleOptionSelect(index, 3) }}  disabled={showResults}
                          style={[ styles.option,  selectedOptions[index] === 3 && styles.selectedOptions,  showResults && item?.correctOption === 3 && styles.correctOption, showResults && selectedOptions[index] === 3 && selectedOptions[index] !== item?.correctOption && styles.wrongOption, ]}>
                          <Text style={{fontSize: 12, fontFamily: "OpenSans" }}>C. {item?.C}</Text> 
                      </TouchableOpacity>
                  ) }
                  { ( item?.D ) && (
                      <TouchableOpacity onPress={() => { handleOptionSelect(index, 4) }}  disabled={showResults}
                          style={[ styles.option,  selectedOptions[index] === 4 && styles.selectedOptions,  showResults && item?.correctOption === 4 && styles.correctOption, showResults && selectedOptions[index] === 4 && selectedOptions[index] !== item?.correctOption && styles.wrongOption, ]}>
                          <Text style={{fontSize: 12, fontFamily: "OpenSans" }}>D. {item?.D}</Text> 
                      </TouchableOpacity> 
                  ) }
                  { ( item?.E ) && (
                      <TouchableOpacity onPress={() => { handleOptionSelect(index, 5) }}  disabled={showResults}
                          style={[ styles.option,  selectedOptions[index] === 5 && styles.selectedOptions,  showResults && item?.correctOption === 5 && styles.correctOption, showResults && selectedOptions[index] === 5 && selectedOptions[index] !== item?.correctOption && styles.wrongOption, ]}>
                          <Text style={{fontSize: 12, }}>E. {item?.E}</Text> 
                      </TouchableOpacity> 
                  ) }
              </View>
            </View>
        ))}

        { year && (
            <TouchableOpacity onPress={ handleSubmit } style={{ backgroundColor: "green", padding: 8, marginVertical: 5, marginHorizontal: 20, width: "105%", alignSelf: "center", borderRadius: 20, }}>
              <Text style={{textAlign: "center", color: "white",  fontSize: 16}}>{submitBtnText}</Text> 
            </TouchableOpacity>
        )}

        <Modal isVisible={isModalVisible} style={{}} >
          <View style={{backgroundColor: "black", borderRadius: 20, width: "90%", alignSelf: "center", borderBottomLeftRadius: 20 }} >
            <View style={{ flexDirection: "row", backgroundColor: "green", borderTopLeftRadius: 20, borderTopEndRadius: 20}}> 
              <View style={{flex: 1, justifyContent: "center"}} >
                  <Text style={{textAlign: "center", fontSize: 22, padding: 10, fontFamily: "Kanit"}} >
                    Test Result
                  </Text>
              </View >
              <TouchableOpacity onPress={() => { setIsModalVisible(false); setGradingSystem(false); }} style={{   justifyContent: "center", backgroundColor: "red", margin: 5, borderRadius: 30  }} >
                <Ionicons name={'close'} size={34} color="white" style={{ padding: 5,  alignSelf: "center", }}/>
              </TouchableOpacity> 
            </View>
            <View  style={{ paddingVertical: 10, justifyContent: "center", alignItems: "center",   backgroundColor: "#f4f4f4",  paddingBottom: 20, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }} >
              <View style={{ flexDirection: "row", }}>  
                <View style={{ marginRight: 5, marginLeft: -15 }}>
                    <Text style={{color: "green", textAlign: "center",  fontFamily: "Kanit", fontSize: 16}}>Score</Text>
                </View>     
                <View style={{ width: 80, height: 80, borderRadius: 60, borderWidth: 5, borderColor: "green", justifyContent: "center" }}>
                    <Text style={{color: "green", textAlign: "center",  fontFamily: "Kanit", fontSize: 40}}>{score}</Text>
                </View>
                <View style={{ justifyContent: 'center', marginLeft: -30, borderColor: "green", borderWidth: 2, maxHeight: 50, maxWidth: 50, minWidth: 50, borderRadius: 50, bottom: -40, backgroundColor: "white", alignItems: "center" }}>
                    <Text  style={{textAlign: "center", fontFamily: "Kanit", fontSize: 16, fontWeight: 500}}>/{(questions.length)}</Text>  
                </View>
              </View>


                {(active === false) && (
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
                              <TouchableOpacity onPress={() => {setIsModalVisible(false)}} style={{backgroundColor: "red", flex: 1, marginHorizontal: 20, justifyContent: "center", borderRadius: 10  }} >
                              <Text  style={{padding: 10, textAlign: "center",  fontFamily: "Kanit", }} >
                                Cancel
                              </Text>
                              </TouchableOpacity>
                            </View>

                    </View> 
                )}



            </View>

            
          </View> 
        </Modal>

    

  

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



      </View>
</>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 200,
    width: 150,
    bottom: 0,
    left: 50,
    position: 'absolute',
  },
  root: {  alignItems: "center",   marginBottom: 40,   padding: 10, },

  instruction: { fontSize: 12,  marginVertical: 3,  textAlign: 'justify',}, 
  passage: { fontSize: 12,  marginVertical: 3,  textAlign: 'justify', marginBottom: 10, color: "red"}, 
  question: { fontSize: 12,  fontWeight: "bold",  marginVertical: 3, }, 

  title: {  fontSize: 16,  padding:10,     color: "#e6ac0e",   fontWeight: 'bold',  marginBottom: 5,  width: "100%",  textAlign: "center",  borderRadius: 10
  },

  theme: {
      fontSize: 14, 
      marginLeft: 10, 
      color: "black", 
      margin: 4,
  }, 

  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', 
  },


  // horizontal: {
  //     flexDirection: 'row', 
  //   },

  // dropdown: {
  //     height: 35,
  //     borderColor: 'black',
  //     borderWidth: 2,
  //     borderRadius: 5,
  //     paddingHorizontal: 5,
  //     alignContent: "center",
  //     alignItems: "center",
  //     alignSelf: "center",
  //     marginTop: 5, 
  //   },



  questionContainer: { borderColor: "#ffffff",  borderWidth: 5, backgroundColor: "#f5f5f5", borderRadius: 10,  marginBottom: 5,  padding: 10,  shadowColor: "#000", shadowOffset: { width: 0, height: 2},  shadowOpacity: 0.25,  shadowRadius: 3.84,  elevation: 5}, 



  option: {
      flex: 1,
      justifyContent: 'center', // Centers vertically
      // alignItems: 'center', // Centers horizontally
      backgroundColor: "#eee", 
      padding: 5, 
      marginVertical: 3, 
      borderRadius: 5,
      paddingLeft: 10,
      // height: 100
    }, 

  selectedOptions: { backgroundColor: "#949494" }, 

  correctOption: { backgroundColor:  "#65a765" }, 

  wrongOption: { backgroundColor: "#FF4F4B" },

  submitButton: {
      backgroundColor: "blue", 
      padding: 10, 
      marginVertical: 10, 
      borderRadius: 5
    }, 

  submitButtonText:{
      color: "#fff", 
      fontSize: 20
    },

  result: { justifyContent: "center",  alignContent: "center",  alignItems: "center", borderColor: "#063b00", backgroundColor: "gray", borderWidth: 0.4, borderRadius: 10, width: "100%"}  , 

  resultText: {
      fontSize: 20, 
      fontWeight: "bold", 
      marginVertical: 10, 
      padding: 5, 
      color: "#063b00", 
      borderRadius: 10, 
      paddingHorizontal: 30, 
      textAlign: 'center',
      // width: "100%", 
      borderColor: "#063b00",
      // backgroundColor: "red",

    }, 




  
    image: { width: '100%', height: 220, resizeMode: 'contain', margin: 5 }, 

});
