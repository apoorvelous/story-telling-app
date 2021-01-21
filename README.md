# Story Telling App (Steps)

## Class 1 (Blueprint planning plus Google Authentication)

**This app will be a Story Telling App which with Google Login where the users can read stories written by others and can create their own stories! This will also feature the Text to Speech concept for the users who want to enjoy a story by listening to it. It will have the following functionalities -**

***1. Google Login and Signup***
***2. Stories feed (where stories from different users will be available)***
***3. Write your own story (A dedicated page to write your own story and preview it)***
***4. A profile page for the users***
***5. Text to Speech on Stories***
***6. Ability to like and add comments to a story (Just like social media)***

**Let's get started!**

## Getting Started

```bash
expo init story-telling-app
cd story-telling-app
```

Now, the first thing we want to do is to create a Firebase Project with the name **Story Telling App** from here -

https://console.firebase.google.com/

We will also create a firestore database using our region once the project is created.

Now, why do we want to use Google Authentication? Here is why -

***1. Using Google or other third parties can make your authentication process seamless and friendly. Users don’t have to waste time in the registration process, which will improve your registration and retention rates tremendously.***
***2. It's safe and secure.***
***3. Users trust Google or Facebook more than an unknown site or app on the Internet.***
***4. It provides a good user experience. As a user, we have little patience for any actions or work that we need to do, especially in a fairly unknown app that we are trying for the first time.***

Now, we will first install the dependencies for react navigation and firebase -

```bash
expo install react-native-gesture-handler
expo install react-native-reanimated
expo install react-native-screens
expo install react-native-safe-area-context
expo install @react-native-community/masked-view
yarn add react-navigation
yarn add firebase
```

To begin with, we will be using **Switch Navigation** and we will initially start with 3 screens -

***1. Loading Screen***
***2. Login Screen***
***3. Story Feed Screen***

Now, since we want to use Firebase for our project, we will create a new file **config.js** and add our firebase's project config here.

We will also need to follow the instructions from here to configure our google authentication on Firebase for both android and iOS -

https://docs.expo.io/versions/latest/sdk/google/

We'll also install the following -

```bash
expo install expo-google-app-auth
```

Now let's work on the first screen on **App.js** to create the Navigator and then work on these screens -

## App.js

```js
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
```

## LoadingScreen.js

```js
import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import firebase from "firebase";

export default class LoadingScreen extends Component {

    componentDidMount() {
        this.checkIfLoggedIn()
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate("StoryFeedScreen")
            } else {
                this.props.navigation.navigate("LoginScreen")
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
```

## LoginScreen.js

```js
import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { oAuthConfig } from "../config";
import * as Google from 'expo-google-app-auth';

export default class LoginScreen extends Component {

    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                behavior: "web",
                androidClientId: oAuthConfig.androidClientId,
                iosClientId: oAuthConfig.iosClientId,
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="Sign in with Google"
                    onPress={() => this.signInWithGoogleAsync()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
```

## StoryFeedScreen.js

```js
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class StoryFeedScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>StoryFeedScreen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
```

### Note
For **Class 1**, to understand it better, follow the tutorial from here - https://www.youtube.com/watch?v=ZcaQJoXY-3Q

For **Class 2** reference, refer - https://www.youtube.com/watch?v=GZKaVJEd4JU

Class 2 is yet to be added into the code and in README.md and this will complete the Google Authentication.