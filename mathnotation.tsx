
// import { BoldText } from '@/mathnotation'
import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, FlatList, TouchableOpacity, ImageBackground } from 'react-native'



export const SquareRoot = ({ value }) => {
    return (
      <View style={{flexDirection: 'row', }}>
        <Text style={{ }}>√</Text>
        <View style={{ }}>
            <View style={{borderBottomWidth: 1, borderBottomColor: 'black',}} />
            <Text style={{ }}>{value}</Text>
        </View>
      </View>
    );
  };



export const superscriptDigits = {"other": "ᵅᵝᵞᵟᵋᶿᶥᶲᵠᵡᵦᵧᵨᵩᵪ"};


export const superscript = (text) => {
     const superscriptMap = {
        '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
        'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶦ', 'g': 'ᵍ', 'h': 'ʜ', 'i': 'ⁱ', 'j': 'ʲ', 'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'q': 'ᵠ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
        'A': 'ᴬ', 'B': 'ᴮ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ꜰ', 'G': 'G', 'H': 'ʜ', 'I': 'ᴵ', 'J': 'ᴶ', 'K': 'ᴷ', 'L': 'ᴸ', 'M': 'ᴹ', 'N': 'ᴺ', 'O': 'ᴼ', 'P': 'ᴾ', 'Q': 'Q', 'R': 'ʳ', 'S': 'ˢ', 'T': 'ᵀ', 'U': 'ᵁ', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z', 
    }; 
    return text.split('').map(char => superscriptMap[char] || char).join('');
  };
      

  export const subscript = (text) => {
     const subscriptMap = {
        '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉', '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎',
        'a': 'ₐ', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'ₑ', 'f': 'f', 'g': 'g', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'j', 'k': 'k', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ', 'p': 'ₚ', 'q': 'q',  'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ', 'v': 'v',  'w': 'w',  'x': 'x',  'y': 'y',  'z': 'z', 
        'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F', 'G': 'G', 'H': 'H', 'I': 'I', 'J': 'J', 'K': 'K', 'L': 'L', 'M': 'M', 'N': 'N', 'O': 'O', 'P': 'P', 'Q': 'Q', 'R': 'R', 'S': 'S', 'T': 'T', 'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z', 
      };
      return text.split('').map(char => subscriptMap[char] || char).join('');
    };

    export const frac = (text1, text2) => {
      const superscriptMap = {
        '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
        'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶦ', 'g': 'ᵍ', 'h': 'ʜ', 'i': 'ⁱ', 'j': 'ʲ', 'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'q': 'ᵠ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
        'A': 'ᴬ', 'B': 'ᴮ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ꜰ', 'G': 'G', 'H': 'ʜ', 'I': 'ᴵ', 'J': 'ᴶ', 'K': 'ᴷ', 'L': 'ᴸ', 'M': 'ᴹ', 'N': 'ᴺ', 'O': 'ᴼ', 'P': 'ᴾ', 'Q': 'Q', 'R': 'ʳ', 'S': 'ˢ', 'T': 'ᵀ', 'U': 'ᵁ', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z', 
    }; 
      const subscriptMap = {
         '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉', '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎',
         'a': 'ₐ', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'ₑ', 'f': 'f', 'g': 'g', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'j', 'k': 'k', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ', 'p': 'ₚ', 'q': 'q',  'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ', 'v': 'v',  'w': 'w',  'x': 'x',  'y': 'y',  'z': 'z', 
         'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F', 'G': 'G', 'H': 'H', 'I': 'I', 'J': 'J', 'K': 'K', 'L': 'L', 'M': 'M', 'N': 'N', 'O': 'O', 'P': 'P', 'Q': 'Q', 'R': 'R', 'S': 'S', 'T': 'T', 'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z', 
       };
       return text1.split('').map(char => superscriptMap[char] || char).join('') + "/" + text2.split('').map(char => subscriptMap[char] || char).join('') ;
     };
  

  export const BoldText = ({ text }) => {
    return (
      <Text style={{ fontWeight: 'bold', fontFamily: "KanitBold" }}>{text} </Text>
    );
  };

  export const UnderlineText = ({ text }) => {
    return (
      <Text style={{ fontWeight: 'bold', fontFamily: "KanitBold", textDecorationLine: 'underline'  }}>{text} </Text>
    );
  };

  export const UnderlineText2 = ({ text }) => {
    return (
      <View>
        <Text style={{ fontWeight: 'bold', fontFamily: "KanitBold" }}>
          {text}
        </Text>
        {/* The underline */}
        <View style={{
          height: 1, 
          backgroundColor: 'black', // Adjust the underline color
          marginTop: 3, // Adjust spacing between text and underline
        }} />
      </View>
    );
  };


  export const ItalicText = ({ text }) => {
    return (
      <Text style={{ fontStyle: 'italic', fontFamily: "GeorgiaItalic" }}>{text}</Text>
    );
  };


  export const Fraction = ({ numerator, denominator }) => {
    return (
      <View style={{  paddingHorizontal: 3, }}>
          <Text style={{ fontSize: 8, fontWeight: 'bold', textAlign: "center"   }}>{numerator}</Text>
            <View style={{ width: '100%', height: 1, backgroundColor: 'black'}} />
          <Text style={{ fontSize: 8, fontWeight: 'bold', textAlign: "center"  }}>{denominator}</Text>
      </View>
    );
  };


  export const ShortFraction = ({ numerator, denominator }) => {
    return (
      <View style={{  paddingHorizontal: 3, }}>  
        <Text style={{ fontWeight: 'bold', textAlign: "center"   }}>{  (numerator)}/{(denominator)}</Text>
      </View>
    );
  };


  export const LongFraction = ({ numerator, denominator }) => {
    return (
      <View style={{  paddingHorizontal: 3, backgroundColor: "green", }}>
        <Text style={{ fontWeight: 'bold', textAlign: "center"   }}>({  (numerator)})/({(denominator)})</Text>
      </View>
    );
  };

  export const MixedFraction = ({ wholenumber, numerator, denominator }) => {
    return (
        <View style={{flexDirection: "row"}} >
            <View style={{}}>
                <Text style={{ textAlign: "center"   }}>{wholenumber}</Text>
            </View>
            <View style={{}}>
                <Text style={{ textAlign: "right"   }}>{superscript(numerator)}/{subscript(denominator)}</Text>

            </View>
        </View>
    );
  };

  export const Isotopes = ({ numerator, denominator, element }) => {
    return (
        <View style={{flexDirection: "row"}} >
            <View style={{}}>
                <Text style={{ fontSize: 7, textAlign: "right"   }}>{numerator}</Text>
                
                <Text style={{ fontSize: 7, textAlign: "right"   }}>{denominator}</Text>
            </View>
    
            <View style={{}}>
                <Text style={{ textAlign: "center"   }}>{element}</Text>
            </View>
        </View>
    );
  };




export const _superscripts = "·˙¹⁰²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ᵃᵇᶜᵈᵉᵍⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ"
export const _subscripts   = "₁₀₂₃₄₅₆₇₈₉₊₋₌₍₎ₐₑₕᵢₗ ₘ ₙ ₒₚᵣₛₜᵤ"
export const _degree       = "°"
export const _pi           = " π = ²²/₇"
export const _squareroot   = "√" 
export const _angle        = "∠"
export const _signs = " × ÷ 𝜃 µ π Ω ∩ △ ≤  ∞ ϵ ≥ ' ⁽ˣ⁺ʸ⁾ ⁽ˣ⁻ʸ⁾ "
export const _modulo = "⊗ ⨁"
export const _fraction = " ¹/₂ /₂ /₂ ⁻¹ ⁻² ⁻³ ⁻⁴ ⁻⁵ ⁻⁷ ⁽¹⁻ˣ⁾ ⁽¹⁺ˣ⁾"
export const _fraction2 = " ¹/₃ ²/₃ /₃ ¹/₄ ¹/₅ ¹/₆ ¹/₇ ¹/₈ ¹/₉ ⁻¹ "




