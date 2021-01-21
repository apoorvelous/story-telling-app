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
