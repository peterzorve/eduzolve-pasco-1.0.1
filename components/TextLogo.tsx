import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SubjectLogo = ({ text }) => {
  // Define the logo function to return emojis
  const logo = () => {
    if (text === "English Language") {
      return "📚"; 
    } else if (text === "Integrated Science") {
      return "🔬"; 
    } else if (text === "Social Studies") {
      return "🌍"; 
    } else if (text === "Core Mathematics") {
      return "📐";
    } else {
      return "👋"; 
    }
  };

  return (
    <View style={styles.container}>
      {/* Display both the logo (emoji) and the text */}
      <Text style={styles.textStyle}>{logo()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: "red"
  },
  textStyle: {
    fontSize: 22,
    // color: 'black',
  },
});

export default SubjectLogo;
