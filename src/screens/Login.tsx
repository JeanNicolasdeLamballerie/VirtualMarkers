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
  import {useTheme} from "react-native-paper"
  import Log from '@components/Login';
const {LoginForm} = Log;
const Login = () => {
    const theme = useTheme();
    const {classic} = theme.colors;
    
    return (
        <View>
            <SafeAreaView>
                <Text style={{color:classic}}>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Text>
                <ScrollView>
                    <LoginForm
                    />
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
export default Login;