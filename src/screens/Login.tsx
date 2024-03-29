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
  import {useTheme} from "react-native-paper";
  import Log from '@components/Login';
  import {LoginProps} from "@srcDir/router";
const {LoginForm} = Log;
const Login = (props: LoginProps) => {
    const theme = useTheme();
    const {classic} = theme.colors;
    
    return (
        <View>
            <SafeAreaView>
                <ScrollView>
                    <LoginForm
                    {...props}
                    />
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
export default Login;