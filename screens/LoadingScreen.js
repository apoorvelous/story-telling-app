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
