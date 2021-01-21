import React from 'react';
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import StoryFeedScreen from "./screens/StoryFeedScreen";

import firebase from "firebase";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig)

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  StoryFeedScreen: StoryFeedScreen
})

const AppNavigator = createAppContainer(AppSwitchNavigator)

export default function App() {
  return (
    <AppNavigator />
  );
}
