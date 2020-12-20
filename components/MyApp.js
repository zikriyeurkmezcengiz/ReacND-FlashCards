import React, { Component } from "react";

import { connect } from "react-redux";
import { handleReceiveData } from "../Actions/deck";
import { getQuizData, initializeData, setLocalNotification } from "../Util/api";

import { NavigationContainer } from "@react-navigation/native";

import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  Platform,
} from "react-native";

import Constants from "expo-constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { purple, white } from "../Util/colors";
import { AddCard } from "./AddCard";
import { NewDeck } from "./NewDeck";
import DeckList from "./DeckList";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
//Styles

function FlashcardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

const TabNav = () => (
  <Tabs.Navigator
    initialRouteName="DeckList"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        switch (route.name) {
          case "DeckList": {
            return <Ionicons name="ios-bookmarks" size={size} color={color} />;
          }
          case "NewDeck": {
            return <FontAwesome name="plus-square" size={size} color={color} />;
          }

          default:
            return "";
        }
      },
    })}
    tabBarOptions={{
      header: null,
      activeTintColor: Platform.OS === "ios" ? purple : white,
      showIcon: Platform.OS === "ios",
      style: {
        height: Platform.OS === "ios" ? 80 : 50,
        backgroundColor: Platform.OS === "ios" ? white : purple,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    }}
  >
    <Tabs.Screen name="DeckList" component={DeckList} />
    <Tabs.Screen name="NewDeck" component={NewDeck} />
  </Tabs.Navigator>
);

const Stack = createStackNavigator();
const MainNav = () => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen
      name="Home"
      component={TabNav}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AddCard"
      component={AddCard}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
        headerTitleStyle: { width: Dimensions.get("window").width },
      }}
    />
  </Stack.Navigator>
);

class MyApp extends Component {
  state = { storeReady: false };
  componentDidMount() {
    initializeData()
      .then((decks) => this.props.dispatch(handleReceiveData(decks)))
      .then(() => this.setState({ storeReady: true }));

    getQuizData().then((data) => {
      if (data !== null) {
        const { lastAttemptedAt } = data;
        // If Quiz is taken today ?
        if (
          new Date(lastAttemptedAt).toDateString() === new Date().toDateString()
        )
          setLocalNotification(false);
        else setLocalNotification(true);
      } else {
        // Quiz not taken today
        // Set today's & tomorrow's 5pm Notifs
        setLocalNotification(true);
      }
      console.log(data);
    });

    console.log();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.storeReady && (
          <NavigationContainer>
            <FlashcardStatusBar
              backgroundColor="green"
              barStyle="light-content"
            />
            <MainNav />
          </NavigationContainer>
        )}
      </View>
    );
  }
}

export default connect()(MyApp);
