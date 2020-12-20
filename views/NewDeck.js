import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { Card, Colors } from "react-native-paper";
import Main from "../components/Main";
import TextLabel from "../components/TextLabel";
import { connect } from "react-redux";
import { handleAddDecks, resetNewDeckId } from "../store/actions/decks";
import Header from "../components/Header";
import { white, orange } from "../utils/colors";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
class NewDeck extends React.Component {
  state = {
    deckTitle: "",
  };
  onAddCreateDeckPress() {
    if (!this.state.deckTitle) {
      return alert("Enter a valid deck title");
    }
    this.props.addDeck(this.state.deckTitle);
  }

  handleChange = (name) => (value) => {
    this.setState({ [name]: value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.newDeckId !== this.props.newDeckId) {
      this.props.navigation.navigate("Deck", {
        deckId: nextProps.newDeckId,
        title: this.state.deckTitle,
      });

      this.setState({ deckTitle: "" });
    }
  }

  render() {
    return (
      <Main>
        <View style={{ flex: 1, backgroundColor: orange }}>
          <Header title="New Deck" />
          <ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
              <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <TextLabel>What is the title of new deck?</TextLabel>
                  <TextInput
                    label="Deck Title"
                    returnKeyType="done"
                    onChangeText={this.handleChange("deckTitle")}
                    autoCapitalize="sentences"
                  />
                </Card.Content>
                <Card.Actions>
                  <Button
                    mode="contained"
                    onPress={() => this.onAddCreateDeckPress()}
                    style={styles.button}
                  >
                    Create New Deck
                  </Button>
                </Card.Actions>
              </Card>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Main>
    );
  }
}

function mapStateToProps({ newDeckId }) {
  return {
    newDeckId: newDeckId.newDeckId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addDeck: (deckTitle) => {
      dispatch(handleAddDecks(deckTitle));
    },
    resetNewDeckId: () => {
      dispatch(resetNewDeckId());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingTop: 10,
  },
  card: {
    flex: 1,
  },
  cardContent: {
    paddingTop: 30,
    paddingBottom: 30,
  },
});
