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
import {LoginProps} from "@srcDir/router";

import {fnInit, getUsers, User as UserModel} from "../../app/api/User";
const initialIdentifier = "";
const initialPassword = "";
const initialUsers:UserModel[] = [];
// import '../../app/api/User'



const LoginForm = ({navigation, route}: LoginProps) => {
    const theme = useTheme();
    const {classic} = theme.colors;
    const [identifier, setIdentifier] = useState(initialIdentifier)
    const [password, setPassword] = useState(initialPassword)
    const [users, setUsers] = useState(initialUsers)
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
    
    //TODO : post info to db
    const postInfo = (data:User) => false;

    const onChange = (setState:Function) => (text:string) => void setState(text);
    
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
<Button
  onPress={() => getUsers().then(e =>{
       console.log(e)
       try {

               setUsers(e)
       }catch(err){
           console.log(err)
       }
})}
  title="Anonymous ?"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
            {/* <Button
            mode={"contained"}
            onPress={() => void console.log('aaaa')}
            >Enter</Button> */}
        <Text style={{color:'red'}}>{users[0]?.description} {users[0]?.name||'nameholder'} Here !</Text>
        <Button
 onPress={() =>
    navigation.navigate('CreateAccount')
  }
  title="Anonymous ?"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
        </View>
    )
}
export default LoginForm;