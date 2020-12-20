import React from "react";
import { StyleSheet, Text } from "react-native";
import { purple } from "../utils/colors";

const TextLabel = ({ style, children }) => (
  <Text style={styles.header}>{children}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    color: purple,
    fontWeight: "bold",
    paddingTop: 16,
    paddingBottom: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TextLabel;
