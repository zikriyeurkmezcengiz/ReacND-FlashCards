import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Colors, FAB } from "react-native-paper";
import Main from "../components/Main";
import { connect } from "react-redux";
import Header from "../components/Header";
import { white, orange } from "../utils/colors";
import Deck from "./Deck";

class DeckList extends React.Component {
  state = {
    decks: null,
  };

  onDeckAdd() {
    this.props.navigation.navigate("NewDeck");
  }

  onDeckCardPress(deck) {
    debugger;
    this.props.navigation.navigate("DeckDetail", {
      deckId: deck.id,
      title: deck.title,
      navigation: this.props.navigation,
    });
  }
  render() {
    const { decks } = this.props;
    return (
      <Main>
        <View style={{ flex: 1, backgroundColor: orange }}>
          <Header title="Mobile Flash Cards" />
          <ScrollView style={styles.container}>
            {decks &&
              Object.keys(decks).map((id) => (
                <TouchableOpacity
                  key={id}
                  onPress={() => this.onDeckCardPress(decks[id])}
                >
                  <Deck
                    title={decks[id].title}
                    countOfCards={decks[id].questions.length}
                  />

                  <Divider />
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
        <FAB style={styles.fab} icon="plus" onPress={() => this.onDeckAdd()} />
      </Main>
    );
  }
}

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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: orange,
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "500",
  },
  avatarIcon: {
    backgroundColor: Colors.orange500,
  },
  avatarText: {
    marginRight: 16,
    backgroundColor: Colors.orange100,
  },
});

function mapStateToProps({ decks }) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckList);
