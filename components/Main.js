import * as React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { connect } from "react-redux";
import { handleGetAllDecks } from "../store/actions/decks";
import { getQuizData } from "../utils/api";
import { clearLocalNotification, setLocalNotification } from "../utils/helper";

class Main extends React.Component {
  componentDidMount() {
    this.props.initilizeData();

    getQuizData().then((data) => {
      if (data !== null) {
        const { lastAttemptedAt } = data;
        if (
          new Date(lastAttemptedAt).toDateString() !== new Date().toDateString()
        )
          clearLocalNotification().then(setLocalNotification);
      } else {
        clearLocalNotification().then(setLocalNotification);
      }
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container} behavior="padding">
          {this.props.children}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    initilizeData: () => {
      dispatch(handleGetAllDecks());
    },
  };
}

export default connect(null, mapDispatchToProps)(Main);
