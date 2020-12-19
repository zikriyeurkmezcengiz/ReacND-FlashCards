import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { gray, green } from "../utils/colors";

export class AddCard extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>Mobile Flashcards - Add Card</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: gray,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 16,
    color: green,
  },
});

export default AddCard;
