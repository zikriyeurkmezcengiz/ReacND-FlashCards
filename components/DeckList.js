import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { bgPrimary, purple, white } from "../Util/colors";
import { objectsToArray } from "../Util/helper";
import Header from "./Header";
import Deck from "./Deck";

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
});

const DeckList = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: purple }}>
      <Header title="Deck List" />
      <ScrollView style={styles.container}>
        {Object.values(props.decks).map((deck) => {
          return (
            <TouchableOpacity
              style={styles.deck}
              key={deck.title}
              onPress={() =>
                navigation.navigate("DeckDetail", { title: deck.title })
              }
            >
              <Deck title={deck.title} numberOfCards="0" />
            </TouchableOpacity>
          );
        })}
        <View style={{ marginBottom: 30 }} />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({ decks }) => ({
  isLoaded: true,
  decks: objectsToArray(decks).sort((a, b) => b.createdAt - a.createdAt),
});

export default connect(mapStateToProps)(DeckList);
