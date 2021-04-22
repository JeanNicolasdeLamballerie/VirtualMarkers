import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
  import Components from '@components';
const {
    LoginForm
} = Components;

const Login = () => {
    
    return (
        <View>
            <SafeAreaView>
                <ScrollView>
                    <LoginForm
                    />
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
export default Login;