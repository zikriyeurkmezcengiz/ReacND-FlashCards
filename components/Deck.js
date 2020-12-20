import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import { white, textGray } from "../Util/colors";
import { connect } from "react-redux";

const Deck = ({ title, numberOfCards }) => {
  if (title === undefined) {
    return <View style={styles.deckContainer} />;
  }
  return (
    <View style={styles.deckContainer}>
      <View>
        <Text style={styles.deckText}>{title}</Text>
      </View>
      <View>
        <Text style={styles.cardText}>{numberOfCards} cards</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deckContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexBasis: 120,
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor: white,
    borderRadius: 5,
    marginBottom: 10,
  },
  deckText: {
    fontSize: 28,
  },
  cardText: {
    fontSize: 18,
    color: textGray,
  },
});

export default Deck;
