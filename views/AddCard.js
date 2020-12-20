import * as React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { Card, Colors } from "react-native-paper";
import TextLabel from "../components/TextLabel";
import { connect } from "react-redux";
import { handleAddCardToDeck } from "../store/actions/decks";
import Main from "../components/Main";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

class AddCard extends React.Component {
  onAddCardPress() {
    const { deckId } = this.props.route.params;
    const { question, answer } = this.state;
    if (!question || !answer) {
      return alert("Please Enter all the fields");
    }
    this.props.addCardToDeck(deckId, {
      question,
      answer,
    });
    this.props.navigation.goBack();
  }

  state = {
    question: "",
    answer: "",
  };

  handleChange = (name) => (value) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Main>
        <View style={styles.container}>
          <ScrollView>
            <KeyboardAvoidingView behavior="padding">
              <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <TextLabel>What is the question ?</TextLabel>
                  <TextInput
                    label="Question"
                    returnKeyType="done"
                    onChangeText={this.handleChange("question")}
                    autoCapitalize="sentences"
                  />
                  <TextLabel>What is the answer ?</TextLabel>
                  <TextInput
                    label="Answer"
                    returnKeyType="done"
                    onChangeText={this.handleChange("answer")}
                    autoCapitalize="sentences"
                  />
                </Card.Content>
                <Card.Actions>
                  <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => this.onAddCardPress()}
                  >
                    Add New Card
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

function mapDispatchToProps(dispatch) {
  return {
    addCardToDeck: (deckId, card) => {
      dispatch(handleAddCardToDeck(deckId, card));
    },
  };
}

export default connect(null, mapDispatchToProps)(AddCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.grey100,
  },
  card: {
    flex: 1,
  },
  cardContent: {
    paddingTop: 30,
    paddingBottom: 30,
  },
});
