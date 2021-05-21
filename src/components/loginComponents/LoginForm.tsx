import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    Button
} from 'react-native';
//import { Button  } from 'react-native-paper';
import {useTheme} from "react-native-paper";
import {container} from "STYLE/Login";
import {fnInit} from "../../app/api/User"
const initialIdentifier = "";
const initialPassword = "";
// import '../../app/api/User'
const LoginForm = () => {
    const theme = useTheme();
    const {classic} = theme.colors;
    const [identifier, setIdentifier] = useState(initialIdentifier)
    const [password, setPassword] = useState(initialPassword)
    
    //Login
    interface User {id:string,pw:string};
    const userLogin:User = {id:identifier,pw:password}
    
    const checkValues = ({id, pw}:User) => (undefined)
    const cleanup = () => undefined;
    useEffect(() => {
       console.log(password)
       console.log(identifier)
        // checkValues(userLogin)
        return () => {
            cleanup()
        }
    }, [identifier, password])
    const postInfo = (data:User) => false;
    const onChange = (setState:Function) => (text:string) =>{
        void setState(text)
    };
    
    const onChangeIdentifier = onChange(setIdentifier);
    const onChangePassword = onChange(setPassword);
    const submit = () => void postInfo(userLogin)
    return (
        <View style ={{...container(theme), flex:1,flexDirection:"column" , backgroundColor:"white"}}>
            <Text style={
                {
                    color : classic,
                    padding:100                       
                }
            }>Welcome to Virtual Markers !</Text>
            <TextInput
            style={{width:500}}
            key={"identifier"}
            placeholder="Profile Name"
            // right={
            //     <TextInput.Icon
            //     name="account"
            //     />
            // }
            onChangeText={onChangeIdentifier}
            /> 
            <TextInput
             style={{flex:0.5, width:300}}
            placeholder="password (optional)"
            onChangeText={onChangePassword}
            // right={
            //     <TextInput.Icon
            //     name="account"
            //     />
            // }
            />

            
            <Text>Forgotten password ?</Text>
            <Button
  onPress={() => fnInit()}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
            {/* <Button
            mode={"contained"}
            onPress={() => void console.log('aaaa')}
            >Enter</Button> */}
        </View>
    )
}
export default LoginForm;