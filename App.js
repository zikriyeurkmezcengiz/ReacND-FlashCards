import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";
import reducer from "./reducers/index";
import Constants from "expo-constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { setLocalNotification } from "./utils/helpers";
import { purple, white } from "./utils/colors";
import { AddCard } from "./components/AddCard";
import { NewDeck } from "./components/NewDeck";
import { DeckList } from "./components/DeckList";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dde",
  },
});

//Create Store
const store = createStore(reducer, applyMiddleware(thunk, logger));

function FlashcardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
FlashcardStatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
};

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

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <NavigationContainer>
            <FlashcardStatusBar
              backgroundColor="green"
              barStyle="light-content"
            />
            <MainNav />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
