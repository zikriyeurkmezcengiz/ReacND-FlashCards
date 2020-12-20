import React from "react";
import { StyleSheet, Text } from "react-native";
import { DefaultTheme, Colors } from "react-native-paper";

const TextLabel = ({ style, children }) => (
  <Text style={styles.header}>{children}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    color: Colors.purple900,
    fontWeight: "bold",
    paddingTop: 16,
    paddingBottom: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TextLabel;
