import React, { Component } from "react";
import { connect } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { View, StatusBar } from "react-native";
import Constants from "expo-constants";
import MainNav from "./components/MainNav";
import { purple, orange } from "./utils/colors";

function FlashcardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

class MyApp extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <FlashcardStatusBar
            backgroundColor={purple}
            barStyle="light-content"
          />
          <MainNav />
        </NavigationContainer>
      </View>
    );
  }
}

export default connect()(MyApp);
