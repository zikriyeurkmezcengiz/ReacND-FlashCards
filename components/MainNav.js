import React, { Component } from "react";

import { Dimensions, Platform } from "react-native";

import Constants from "expo-constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { white, orange } from "../utils/colors";
import AddCard from "../views/AddCard";
import NewDeck from "../views/NewDeck";
import DeckList from "../views/DeckList";
import Quiz from "../views/Quiz";
import DeckDetail from "../views/DeckDetail";
import Deck from "../views/DeckDetail";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

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
      activeTintColor: Platform.OS === "ios" ? orange : white,
      showIcon: Platform.OS === "ios",
      style: {
        height: Platform.OS === "ios" ? 80 : 50,
        backgroundColor: Platform.OS === "ios" ? white : orange,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 10,
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
          backgroundColor: orange,
        },
        headerTitleStyle: { flex: 1, paddingTop: 12 },
      }}
    />
    <Stack.Screen
      name="DeckDetail"
      component={DeckDetail}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: orange,
        },
        headerTitleStyle: {
          flex: 1,
          paddingTop: 12,
        },
      }}
    />
    <Stack.Screen
      name="Quiz"
      component={Quiz}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: orange,
        },
        headerTitleStyle: {
          flex: 1,
          paddingTop: 12,
        },
      }}
    />

    <Stack.Screen
      name="Deck"
      component={Deck}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: orange,
        },
        headerTitleStyle: {
          flex: 1,
          paddingTop: 12,
        },
      }}
    />
  </Stack.Navigator>
);

export default MainNav;
