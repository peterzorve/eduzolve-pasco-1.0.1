import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, useWindowDimensions, Linking, useColorScheme} from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Modal from "react-native-modal";
import Animated, { FadeInUp  } from "react-native-reanimated"; 
// import { LinearGradient } from 'expo-linear-gradient';
import * as Device from 'expo-device'
import { useRouter } from 'expo-router';
// import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage'





// ======= TitleAndDescription ================================================================================================================
export const TitleAndDescription = ({ title="", description="", titleFontSize=22, titleColor="black", descriptionColor="black", descriptionFontSize=14, descriptionFontFamily="Kanit", titleAlign="left", descriptionAlign="left" }) => {
  // const colorScheme = useColorScheme();
return (
  <View style={{ flex: 1 }}>
    {title && (
      <Text style={{ color: titleColor,   fontSize: titleFontSize,   fontFamily: "Kanit",  marginVertical: 5, textAlign: titleAlign, textTransform: "uppercase" }}>
        { title }
      </Text>
    )}

    {description && (
      <Text style={{ color: descriptionColor,   fontSize: descriptionFontSize,   fontFamily: descriptionFontFamily,  marginBottom: 10, textAlign: descriptionAlign }}>
        { description }
      </Text>
    )}
  </View>
  );
}; 

// ======= TitleAndDescription ================================================================================================================
export const HorizontalLine = ({  lineColor="black", lineHeight=1, marginTop=5, marginBottom=5 }) => {
  return (
    <View style={{backgroundColor: lineColor, height: lineHeight, marginTop: marginTop, marginBottom: marginBottom}}> 
    </View>
  );
  }; 

// ======= Capitalize Text ================================================================================================================
export const capitalizeText = (text) => {  
  return text.toLowerCase().replace(/(^\w{1})|(\s\w{1})/g, match => match.toUpperCase()); 
}


// ======= Text Inputs ========================================================================================================================
export const TextInputCustomized = ({ title="", value="", onChangeText, leftIcon="person", isSecure=false, removeSpaces=false, textColor="black", }) => {
const [showpswd, setShowPswd] = useState(false)
const isEmpty = value.trim() === ""; 
const togglePassword = () => {
setShowPswd(!showpswd)
}
return (
<View style={{width: '100%', marginBottom: 10, }}>
    <View  style={[ {}]}>
      <Text style={{ fontFamily: "Kanit", fontSize: 14, color: textColor }} >{title}</Text>
    </View>
    <View style={[{flexDirection: 'row', borderRadius: 10, borderColor: isEmpty ? "red" : "gray", borderWidth: 1, padding: 5,  }]}>
        {leftIcon && (
          <Ionicons name={leftIcon}  size={20} color="gray" style={{}}/>
        )}
        <TextInput style={{flex: 1, paddingHorizontal: 5, color: textColor}} secureTextEntry={showpswd}  placeholder={"Enter " + title.toLocaleLowerCase()} value={removeSpaces ? value.replace(" ", "") : value} onChangeText={(text) => onChangeText( removeSpaces ? text.replace(" ", "") : text)}/>
        {isSecure && (
          <Ionicons name={showpswd ? 'eye-off' : 'eye'}  size={20} color="gray" onPress={togglePassword}  style={{}}/>
        )}
    </View>
</View>
)
};


// ======= TouchableOpacity ===================================================================================================================
export const TouchableOpacityCustomized = ({ buttontext="Submit", onPress, disableButton=false, backgroundColor="#ed9107", textColor="white" }) => {
return (
  <View style={{width: '100%', marginBottom: 10}}>
    <TouchableOpacity onPress={onPress} disabled={disableButton} style={{padding: 8, backgroundColor: disableButton ? "gray" : backgroundColor, width: "100%", alignSelf: "center",  borderRadius: 10, }} >
      <Text style={{textAlign: "center", color: textColor, fontFamily: "Kanit"}}>{disableButton ? "Please wait!!!" : buttontext}</Text>
    </TouchableOpacity>
  </View>
)
};

// ======= TouchableOpacity ===================================================================================================================
export const TouchableOpacityWithoutBackground = ({ onPress, text1="Submit", text1Color="black", text2="", text2Color="green",  text3="", text3Color="black", bold=false }) => {
  return (
    <TouchableOpacity  style={{alignSelf: "center", margin: 8, padding: 8}} onPress={onPress}> 
      <Text  style={{fontFamily: "Kanit", color: text1Color, textAlign: "center"}}> {text1} {" "}
          {text2 && (
            <Text style={{color: text2Color, fontWeight: bold ? "bold" : "normal" }} >{text2}</Text> 
          )}
          {text2 && (
            <Text style={{color: text3Color, }} > {text3}</Text> 
          )}
      </Text>  
    </TouchableOpacity>
  )
  };
  
  // ======= TouchableOpacity ===================================================================================================================
export const TouchableOpacityNoBackground3 = ({ text1="Submit", text1Color="black", text2="Login", text2Color="green" }) => {
  return (
    <View style={{alignSelf: "center", margin: 30, padding: 5, position: "absolute", bottom: 0 }}>
          <TouchableOpacity onPress={() => {Linking.openURL('https://accounts.google.com/signup');}}> 
            <Text  style={{textAlign: "center", fontFamily: "Kanit"}}>
                If you do not have an email account, 
                <Text style={{color: "red", }} > click here </Text> 
                to create one first. 
            </Text>  
          </TouchableOpacity>
      </View>   
  )
  };

// ======= Passcode ===========================================================================================================================
export const PasscodeSetup = ({passcode, setPasscode, disableButton=false, onPress}) => {
  const handleDigits = (digit) => {
    if (passcode?.length < 4) { setPasscode(passcode + digit) }
  }
  const deleteDigit = () => {
    if (passcode?.length > 0) { setPasscode(passcode.slice(0, -1)) }
  }
return (
<View style={{ flex: 1 }}>

    <View style={{ marginVertical: 5, width: "80%", justifyContent: "center", alignSelf: "center", }}   >
        <Text style={{  fontSize: 22,  color: "black", fontFamily: "Kanit",textAlign: "center" }}>
          Enter passcode
        </Text>
    </View>

    <View style={{ flexDirection: "row",  marginBottom: 20, width: "80%", justifyContent: "center", alignSelf: "center",}}   >
      <View style={{width: 30, height: 30, backgroundColor: passcode?.length >= 1 ? "black" : "white", borderRadius: 30, borderWidth: 2, marginHorizontal: 5}} >
      </View>
      <View style={{width: 30, height: 30, backgroundColor: passcode?.length >= 2 ? "black" : "white", borderRadius: 30, borderWidth: 2, marginHorizontal: 5}} >
      </View>
      <View style={{width: 30, height: 30, backgroundColor: passcode?.length >= 3 ? "black" : "white", borderRadius: 30, borderWidth: 2, marginHorizontal: 5}} >
      </View>
      <View style={{width: 30, height: 30, backgroundColor: passcode?.length >= 4 ? "black" : "white", borderRadius: 30, borderWidth: 2, marginHorizontal: 5}} >
      </View>
    </View>

    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", width: "80%", alignSelf: "center" }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ].map((option) => (
        <View key={option} style={{ width: "33%",  borderRadius: 5, }}>
          <TouchableOpacity style={{backgroundColor: "#c4c4c4", marginVertical: 5, width: 60, height: 60, justifyContent: "center", alignSelf: "center", borderRadius: 60}}   onPress={() => handleDigits(option)} >
              <Text style={{  fontSize: 22,  color: "black", fontFamily: "Kanit",textAlign: "center" }}>
                {option}
              </Text>
        </TouchableOpacity>
        </View>
      ))}
    </View>

      <View style={{flexDirection: "row", alignContent: "center"}} >
        <TouchableOpacity onPress={deleteDigit} style={{ flex: 1, justifyContent: "center", alignSelf: "center",  marginTop: 20, borderRadius: 40, marginHorizontal: 10  }}    >
          <Text style={{  fontSize: 18,  color: "black", fontFamily: "Kanit", textAlign: "center", padding: 10 }}>
            Delete
          </Text>
          </TouchableOpacity>

          { (passcode?.length === 4) && (
          <TouchableOpacity onPress={onPress} disabled={disableButton} style={{flex: 1,  justifyContent: "center", alignSelf: "center",  marginTop: 20, backgroundColor: disableButton ? "gray" : "#ed9107", borderRadius: 40, marginHorizontal: 10 }}    >
            <Text style={{  fontSize: 18,  color: "black", fontFamily: "Kanit", textAlign: "center", padding: 10 }}>
              Submit
            </Text>
          </TouchableOpacity>

          )}

      </View>

</View>

);
}


export const PasscodeCustomized = ({passcode, setPasscode, correctPasscode="1984", onCorrect}) => {
  const handleDigits = (digit) => {
  if (passcode?.length < 4) { setPasscode(passcode + digit) }
  }
  const deleteDigit = () => {
  if (passcode?.length > 0) { setPasscode(passcode.slice(0, -1)) }
  }
  useEffect( () => {
  if (passcode?.length === 4) {
    if (passcode === correctPasscode) {
      onCorrect();
    } else {
      alert("Password incorrect");
      setPasscode("");
    }
  }
  }, [passcode, correctPasscode, onCorrect] )
  return (
  <View style={{ flex: 1 }}>
  
      <View style={{ marginVertical: 10, width: "80%", justifyContent: "center", alignSelf: "center", }}   >
          <Text style={{  fontSize: 22,  color: "black", fontFamily: "Kanit",textAlign: "center" }}>
            Enter passcode
          </Text>
      </View>
  
      <View style={{ flexDirection: "row",  marginBottom: 30, width: "80%", justifyContent: "center", alignSelf: "center",}}   >
        <View style={{width: 30, height: 30, backgroundColor: passcode?.length >= 1 ? "black" : "white", borderRadius: 30, borderWidth: 2, marginHorizontal: 5}} >
        </View>
        <View style={{width: 30, height: 30, backgroundColor: passcode?.length >= 2 ? "black" : "white", borderRadius: 30, borderWidth: 2, marginHorizontal: 5}} >
        </View>
        <View style={{width: 30, height: 30, backgroundColor: passcode?.length >= 3 ? "black" : "white", borderRadius: 30, borderWidth: 2, marginHorizontal: 5}} >
        </View>
        <View style={{width: 30, height: 30, backgroundColor: passcode?.length >= 4 ? "black" : "white", borderRadius: 30, borderWidth: 2, marginHorizontal: 5}} >
        </View>
      </View>
  
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", width: "80%", alignSelf: "center" }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ].map((option) => (
          <View key={option} style={{ width: "33%",  borderRadius: 5, }}>
            <TouchableOpacity style={{backgroundColor: "#c4c4c4", marginVertical: 10, width: 60, height: 60, justifyContent: "center", alignSelf: "center", borderRadius: 60}}   onPress={() => handleDigits(option)} >
                <Text style={{  fontSize: 22,  color: "black", fontFamily: "Kanit",textAlign: "center" }}>
                  {option}
                </Text>
          </TouchableOpacity>
          </View>
        ))}
      </View>
  
      <TouchableOpacity style={{ justifyContent: "center", alignSelf: "center",  marginTop: 20 }}   onPress={deleteDigit} >
                <Text style={{  fontSize: 18,  color: "black", fontFamily: "Kanit", textAlign: "center", padding: 10 }}>
                  Delete
                </Text>
          </TouchableOpacity>
  
  </View>
  
  );
  }


// ======= BottomSheet ========================================================================================================================
export const BottomSheetCustomized = ({ title="", bottomSheetRef, closeBottomSheet, children }) => {
return (
  <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={[ "40%", "60%", "90%"]} enablePanDownToClose>
    <BottomSheetScrollView contentContainerStyle={{ flexGrow: 1,  }} >
      <View style={{    width: "95%",  alignSelf: "center",   marginVertical: 0 }} >
          <TouchableOpacity onPress={closeBottomSheet}  style={{     alignSelf: "flex-end",    justifyContent: "center",    borderRadius: 30,    backgroundColor: "#e4e4e4",    width: 35,    height: 35  }} >
            <Ionicons name={"close"} size={30} color={"black"} style={{ alignSelf: "center" }} />
          </TouchableOpacity>
          <TitleAndDescription title={title}/>
          {children && (
            <View style={{ marginTop: 20 }}>
                {children}
            </View>
          )}
      </View>
    </BottomSheetScrollView>
  </BottomSheet>
  );
};


// ======= Modal ==============================================================================================================================
export const ModalCustomized = ({ isModalVisible, setIsModalVisible, children}) => {
return (
  // <View style={{  }}>
    <Modal isVisible={isModalVisible} style={{ width: "90%",  backgroundColor: "white", marginVertical: 200, borderRadius: 50 }} >
      <TouchableOpacity onPress={() => {setIsModalVisible(false); }} style={{ position: "absolute", top: 10, right: 10, backgroundColor: "yellow", zIndex: 100 }} >
        <Ionicons name={'close'} size={30} color="red" style={{ padding: 5,  }}/>
      </TouchableOpacity> 
        {children && (
          <View style={{ paddingHorizontal: 10, backgroundColor: "blue" }}>
            <ScrollView style={{backgroundColor: "red"}} >
              {children}
      </ScrollView>
          </View>
        )}
    </Modal>
  // </View>
  );
}


// ======= Modal ==============================================================================================================================
export const ModalCustomized2 = ({ isModalVisible, setIsModalVisible, redirect=() => {}, children}) => {
  const router = useRouter();
  const closeModal = () => {
    setIsModalVisible(false);
    if (redirect) {
      redirect()
    }
  }
  return (
        <Modal isVisible={isModalVisible} style={{}} >
          <View style={{backgroundColor: "white", borderRadius: 20, width: "95%", alignSelf: "center",  }} >
            {/* <TouchableOpacity onPress={closeModal} style={{ position: "absolute", top: 10, right: 10, zIndex: 1 }} > */}
            <TouchableOpacity onPress={closeModal} style={{ alignSelf: "flex-end", zIndex: 1, marginRight: 5 }} >
              <Ionicons name={'close'} size={30} color="red" style={{ padding: 5,  }}/>
            </TouchableOpacity>
            {children && (
              <View style={{ paddingHorizontal: 20, paddingBottom: 10,  marginTop: -3 }}>
                <ScrollView style={{}} >
                  {children}
                </ScrollView>
              </View>
              )}
            <View style={{height: 1, backgroundColor: "#c4c4c4", width: "95%", alignSelf: "center"}}>
            </View>
            <TouchableOpacity onPress={closeModal} style={{ marginVertical: 10 }} >
              <Text style={{ fontSize: 20, textAlign: "center", fontFamily: "Kanit", }} >CANCEL</Text>
            </TouchableOpacity>
          </View>
        </Modal>
  )
  }



// ======= Save Locally ==============================================================================================================================
export const LocalStorageEduZolvePasco = async (text) => {  
  try {
    await AsyncStorage.setItem('LocalStorageEduZolvePasco',  JSON.stringify(text)); 
  } catch (error) { 
  }
}

// ======= Retrieve Save Locally ==============================================================================================================================
export const RetrieveLocalStorageEduZolvePasco = async () => {  
  try { 
    const retrievedData = await AsyncStorage.getItem('LocalStorageEduZolvePasco');   
    if (retrievedData !== null) {  
        return JSON.parse(retrievedData) 
      } else {
        return {} 
      }
  } catch (error) {
    return {} 
  }
}


















// ======= GradientBackground =================================================================================================================
// export const GradientBackgroundCustomized = ({colors=['#000000', '#FD871C', 'green', "yellow", "blue"], children}) => {
//   return (
//     <View style={{ flex: 1 }}>
//         <LinearGradient colors={colors} style={{borderTopLeftRadius: 20, borderTopRightRadius: 50, borderBottomLeftRadius: 50, borderBottomRightRadius: 20, width: "95%", alignSelf: "center", paddingBottom: 40,   }} >
//           <ScrollView>
//             {children && (
//               <View style={{ marginTop: 20 }}>
//                   {children}
//               </View>
//             )}
//           </ScrollView>
//         </LinearGradient>
//     </View>
//   );
// }


// ======= First Display Data =================================================================================================================
export const DisplayData1 = ({data}) => {
  return (
    <View style={{ flex: 1 }}>
      {data.map((option, index) => (
        <View key={index}>
          <TouchableOpacity style={[ {  marginVertical: 3, borderRadius: 5, backgroundColor: "#f4f4f4" },]} onPress={() => {}} >
            <View style={{ flexDirection: 'row', padding: 5, }} >
                { option?.logo && (
                  <View style={{ width: 50, height: 50, borderColor: "#388e3c", paddingVertical: 1, alignItems: "center", justifyContent: "center", marginRight: 10 }} >
                    <Image source={option?.logo} style={{ width: "100%", height: "100%", borderRadius: 30 }} resizeMode="cover" />
                  </View>
                )}
                <View style={{ flex: 1 }} >
                    <Text style={{ paddingLeft: 5, fontSize: 16,  marginBottom: 3, color: "black", fontFamily: "Kanit", textTransform: "uppercase" }}>{ option?.title}</Text>
                    <Text style={{ paddingLeft: 5, color: "gray",fontSize: 11,fontFamily: "Kanit",}}>{option?.description?.slice(0, 100) }</Text>
                </View>
                <View style={{ height: 1, backgroundColor: 'black' }} /> 
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}


// ======= Second Display Data ================================================================================================================
export const DisplayData2 = ({data}) => {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
      {data.map((option, index) => (
        <View key={index}>
          <TouchableOpacity  style={{ width: "48%",  marginVertical: 5,  borderRadius: 5, backgroundColor: "#f4f4f4", }} onPress={() => {}} >
            <View style={{ padding: 5 }}>
                <View style={{ height: 100, borderRadius: 10, borderColor: "#388e3c", paddingVertical: 1, alignItems: "center", justifyContent: "center", }} >
                  <Image source={ require("@/assets/images/settings-images/password.png") } style={{ width: "100%", height: "100%", borderRadius: 10 }} resizeMode="cover" />
                </View>
              <View style={{ flex: 1 }}>
                <Text style={{ paddingLeft: 5, fontSize: 22, marginBottom: 3, color: "black", fontFamily: "Kanit", textTransform: "uppercase" }}>
                  Change password
                </Text>
                <Text style={{   paddingLeft: 5,   color: "gray",   fontSize: 10,   fontFamily: "Kanit",   marginBottom: 3, }}>
                  Change your login password
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
    );
}


// ======= Second Display Data ================================================================================================================
export const AnimationCustomized = ( {delay=1000, duration=100, children} ) => {
  return (
    <View style={{flex: 1, width: '100%', marginBottom: 10}}>
      <Animated.View  entering={FadeInUp.delay(delay).duration(duration).springify().damping(2)} style={{ width: "100%", alignSelf: "center"}}>
        {children && (
          <View style={{ }}>
            {children}
          </View>
        )}
      </Animated.View>
    </View>     
  );
}


// ======= Second Display Data ================================================================================================================
export const SelectOneOption = ( { title="Do you have a referral code", options=["yes", "no"], categorySelected, setCategorySelected, textColor="gray"} ) => {
  // const [categorySelected, setCategorySelected] = useState("       All       ")
  const selectCategories = ({category}) => { setCategorySelected(category) }
  return (
    <View>
      <View  style={[{width: "100%", alignSelf: "center", borderRadius: 15, }]}>
          <Text style={{ fontFamily: "Kanit", fontSize: 14,  color: textColor }} >{title}</Text>
      </View>
    <View style={{ flexDirection: "row", width: '100%', marginBottom: 10, }}>
      {options?.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => selectCategories({ category: item })} style={{backgroundColor: categorySelected === item ? "green" : "#d4d4d4", alignItems: 'center', justifyContent: 'flex-start', padding: 3, paddingHorizontal: 10,  margin: 3, borderRadius: 10, flexGrow: 1 }} >
          <Text style={{ fontSize: 12, paddingVertical: 5, fontFamily: "Kanit", textTransform: "uppercase" }}>{item}</Text>
        </TouchableOpacity>
      ))}  
    </View>
       { categorySelected === "yes" && (
          <View  style={[ {marginBottom: 30}]}>
              <Text style={{ fontFamily: "Kanit", fontSize: 10, color: textColor }} >
                * After registering and logging in, you can add the referral code by navigating to "Settings" and selecting "Add referral code." 
                You have up to 7 days to add the referral code after logging in. 
              </Text>
          </View>
        )}
            { categorySelected === "no" && (
          <View  style={[ {marginBottom: 30}]}>
              <Text style={{ fontFamily: "Kanit", fontSize: 10,  color: textColor }} >
                * Not having a referral code will not affect your registration or login
              </Text>
          </View>
        )}
    </View>     
  );
}



export const deviceInfo = () => {
  return Device?.modelName, Device?.osInternalBuildId
}


export const customEncrypt = (input, key) => {
  let output = '';
  for (let i = 0; i < input.length; i++) {
      // XOR each character's code point with the key
      const encryptedChar = input.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      output += String.fromCharCode(encryptedChar);
  }
  // Convert to Base64 for readability
  return btoa(output);
};

export const customDecrypt = (encrypted, key) => {
  const decoded = atob(encrypted); // Decode Base64
  let output = '';
  for (let i = 0; i < decoded.length; i++) {
      // Reverse XOR operation
      const decryptedChar = decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      output += String.fromCharCode(decryptedChar);
  }
  return output;
};