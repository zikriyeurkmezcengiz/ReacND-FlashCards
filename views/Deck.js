import React from "react";
import { StyleSheet } from "react-native";
import { white, orange, mintGreen } from "../utils/colors";
import { Avatar, Card } from "react-native-paper";

const Deck = ({ title, countOfCards }) => {
  return (
    <Card.Title
      title={title}
      left={(props) => (
        <Avatar.Icon
          {...props}
          style={styles.avatarIcon}
          icon="folder-multiple"
          color={white}
        />
      )}
      right={(props) => (
        <Avatar.Text
          color={white}
          size={24}
          style={styles.avatarText}
          label={countOfCards}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingTop: 10,
  },
  deck: {
    marginRight: 10,
    paddingLeft: 10,
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "500",
  },
  avatarIcon: {
    backgroundColor: mintGreen,
  },
  avatarText: {
    marginRight: 16,
    backgroundColor: mintGreen,
  },
});

export default Deck;
