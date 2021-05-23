import React, { useState } from 'react';
import { 
    TextInput,
    View,
    Text

} from 'react-native';
type AutoCompleteType =  "name" | "cc-csc" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-number" | "email" | "password" | "postal-code" | "street-address" | "tel" | "username" | "off" | undefined;

interface InputText{
    style:any, 
    name:string, 
    onEndEditing:((value:string, e:any) => void), 
    autoCompleteType:AutoCompleteType
}
import {useTheme} from 'react-native-paper';
function CreateTextInput({style, name, onEndEditing, autoCompleteType}:InputText){
    const theme = useTheme();
    const textStyle =() => ({...style});
    const onEnd = (e:any) => onEndEditing(value, e);
    const [value, setValue] = useState('');
    const onChangeText = (text:string) => void setValue(text);
    return (
        <TextInput
        key={name}
        style={...textStyle()}
        autoCompleteType={autoCompleteType}
        onEndEditing = {onEnd}
        onChangeText = {onChangeText}
        value = {value}
        />
    )
};

const AccountInputs = [
    {
        style:undefined,
        name:'Account name',
        onEndEditing:(value) => 
    }
]

function CreateAccountInputs({inputs}:{ inputs: InputText[]}){


    return(
        <View>
        <Text>Welcome to Virtual Markers</Text>
        <Text>Log info : </Text>
         

        </View>
    )
};

