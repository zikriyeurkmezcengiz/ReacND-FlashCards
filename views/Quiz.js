import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import { Colors, FAB, Text } from "react-native-paper";
import CardFlip from "react-native-card-flip";
import { connect } from "react-redux";
import { handleDeleteDeck } from "../store/actions/decks";
import { addQuizData } from "../utils/api";
import TextLabel from "../components/TextLabel";
import Main from "../components/Main";
import Button from "../components/Button";
import { white, orange, green, red, purple } from "../utils/colors";

class Quiz extends React.Component {
  state = {
    cardRotated: false,
    questionIndex: 0,
    correctCount: 0,
    quizCompleted: false,
    viewedAnswer: 0,
    actionsDisabled: false,
    actionsFadeValue: new Animated.Value(1),
  };

  _handleActionsFade = () => {
    Animated.timing(this.state.actionsFadeValue, {
      toValue: 0.3,
      duration: 500,
      useNativeDriver: true, // Add this line
    }).start();
  };

  handleCardFlip() {
    if (!this.state.quizCompleted) {
      this.card.flip();
      if (!this.state.cardRotated) {
        this.setState({
          viewedAnswer: ++this.state.viewedAnswer,
        });
        console.log("view count: " + this.state.viewedAnswer);
      }
    }
  }

  handleMarkQuestion(isCorrect) {
    if (!this.state.quizCompleted) {
      const updatedQuestionIndex = this.state.questionIndex + 1;
      this.state.viewedAnswer === 0 && this.handleCardFlip();
      this._handleActionsFade();
      this.setState({
        actionsDisabled: true,
      });

      setTimeout(
        function () {
          if (this.props.deck.questions.length != updatedQuestionIndex) {
            this.handleCardFlip();
            this._handleActionsFade();
          }
          setTimeout(
            function () {
              this.setState((state, props) => {
                return {
                  correctCount: isCorrect
                    ? ++state.correctCount
                    : state.correctCount,
                  questionIndex: updatedQuestionIndex,
                  quizCompleted:
                    props.deck.questions.length === updatedQuestionIndex,
                  viewedAnswer: 0,
                  actionsDisabled: false,
                };
              });
              addQuizData();
            }.bind(this),
            400
          );
        }.bind(this),
        1000
      );
    }
  }

  render() {
    if (this.state.quizCompleted) {
      return this.renderQuizCompleted();
    } else {
      return this.renderQuiz();
    }
  }

  restartQuiz() {
    this.setState({
      cardRotated: false,
      correctCount: 0,
      questionIndex: 0,
      quizCompleted: false,
      viewedAnswer: 0,
    });
    if (!this.state.cardRotated) {
      this.handleCardFlip();
    }
  }

  renderQuiz() {
    const { questions } = this.props.deck;
    const { questionIndex } = this.state;

    return (
      <Main>
        <View style={styles.cardContainer}>
          <Text style={styles.remainingQuestionText}>
            Remaining
            {this.props.deck.questions.length - questionIndex > 1
              ? " questions : "
              : " question : "}
            {this.props.deck.questions.length - questionIndex}{" "}
          </Text>
          <CardFlip style={styles.cardFlip} ref={(card) => (this.card = card)}>
            <TouchableOpacity
              style={[styles.card, styles.card1]}
              activeOpacity={0.9}
              onPress={() => this.handleCardFlip()}
            >
              <Text style={[styles.label, styles.label1]}>
                {questions[questionIndex].question}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, styles.card2]}
              activeOpacity={0.9}
              onPress={() => this.handleCardFlip()}
            >
              <Text style={[styles.label, styles.label2]}>
                {questions[questionIndex].answer}
              </Text>
            </TouchableOpacity>
          </CardFlip>
        </View>
        <View style={styles.actionContainer}>
          <FAB
            style={[
              styles.fab,
              styles.fabWrong,
              this.state.actionsDisabled && {
                opacity: this.state.actionsFadeValue,
              },
            ]}
            disabled={this.state.actionsDisabled}
            color={red}
            icon="thumb-down"
            onPress={() => this.handleMarkQuestion(false)}
          />
          <FAB
            style={[
              styles.fab,
              styles.fabShowAnswer,
              this.state.actionsDisabled && {
                opacity: this.state.actionsFadeValue,
              },
            ]}
            disabled={this.state.actionsDisabled}
            color={white}
            icon="eye"
            onPress={() => this.handleCardFlip()}
          />
          <FAB
            style={[
              styles.fab,
              styles.fabCorrect,
              this.state.actionsDisabled && {
                opacity: this.state.actionsFadeValue,
              },
            ]}
            disabled={this.state.actionsDisabled}
            color={Colors.green500}
            icon="thumb-up"
            onPress={() => this.handleMarkQuestion(true)}
          />
        </View>
      </Main>
    );
  }

  renderQuizCompleted() {
    return (
      <Main>
        <View style={styles.quizCompletedContainer}>
          <TextLabel style={styles.deckTitle}>Quiz Completed</TextLabel>
          <Text style={styles.text}>
            {" "}
            You have answered{" "}
            {Math.round(
              (this.state.correctCount / this.props.deck.questions.length) * 100
            )}
            % correct
          </Text>

          <Button mode="contained" onPress={() => this.restartQuiz()}>
            Restart Quiz
          </Button>

          <Button
            mode="outlined"
            onPress={() => this.props.navigation.goBack()}
          >
            Back to Deck
          </Button>
        </View>
      </Main>
    );
  }
}

function mapStateToProps({ decks }, props) {
  const { deckId } = props.route.params;
  // console.log(JSON.stringify(decks));
  return {
    deck: decks[deckId],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteDeck: (deckId) => {
      dispatch(handleDeleteDeck(deckId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#4BB6F3",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animatedCardContainer: { flex: 1 },
  cardContainer: {
    flex: 4,
    alignItems: "center",
  },
  cardFlip: {
    flex: 1,
    height: hp("100%"),
    width: wp("100%") - 45,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  actionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  card1: {
    backgroundColor: orange,
  },
  card2: {
    backgroundColor: green,
  },
  label: {
    textAlign: "center",
    fontSize: 24,
    padding: 20,
    fontFamily: "System",
  },
  label1: { color: white },
  label2: { color: white },
  fab: {
    position: "absolute",
    margin: 60,
    bottom: 0,
    zIndex: 9999,
    borderWidth: 5,
    borderRadius: 50,
    backgroundColor: "#FFF",
  },
  fabShowAnswer: {
    borderWidth: 0,
    backgroundColor: green,
    marginBottom: 25,
  },
  fabWrong: {
    left: 0,
    marginBottom: 20,
    borderColor: red,
  },
  fabCorrect: {
    right: 0,
    marginBottom: 20,
    borderColor: green,
  },
  quizCompletedContainer: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  remainingQuestionText: {
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 10,
    color: Colors.grey500,
  },
  text: {
    fontSize: 18,
    lineHeight: 26,
    color: purple,
    textAlign: "center",
    marginBottom: 14,
  },
});
