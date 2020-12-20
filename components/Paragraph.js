import React from "react";
import { StyleSheet, Text } from "react-native";
import { DefaultTheme, Colors } from "react-native-paper";

const TextParagraph = ({ children }) => (
  <Text style={styles.text}>{children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    lineHeight: 26,
    color: Colors.purple500,
    textAlign: "center",
    marginBottom: 14,
  },
});

export default TextParagraph;
