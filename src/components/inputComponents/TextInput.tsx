import React, { useState } from 'react';
import { 
    TextInput,
    View,
    FlatList,
    Text,
    Button

} from 'react-native';
type AutoCompleteType =  "name" | "cc-csc" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-number" | undefined | "email" | "password" | "postal-code" | "street-address" | "tel" | "username" | "off" ;

interface InputText{
    style:any, 
    name:string, 
    onEndEditing:((value:string, e:any) => void), 
    autoCompleteType?:AutoCompleteType,
    value:string
}
import { useTheme} from 'react-native-paper';
export function CreateTextInput({style = {}, name, onEndEditing, autoCompleteType='off', value=''}:InputText){
    // const [value, setValue] = useState('');
    // console.log("create text1")
    // const theme = useTheme();
    // console.log("create text2")
    console.log("autoCompleteType", autoCompleteType)
    const textStyle =() => ({...style});
    // const onEnd = (e:any) => onEndEditing(value, e);
    // console.log("create text3")
    
    
    // const onChangeText = (text:string) => setValue(text);
    // console.log("create text4")

    return (
        // <Button
        // title={"hello"}
        // onPress={() => onEndEditing(value, null)}
        // />
        <TextInput
        key={name}
        style={{...textStyle()}}
        autoCompleteType={autoCompleteType}
        // onEndEditing = {onEnd}
        onChangeText = {(str) => onEndEditing(str, null)}
        value = {value}
        />
    )
};


type ValidationCb = (data:{}) => void;


export function CreateAccountInputs({validate}:{validate:ValidationCb}){
    const [values, setValues] = useState({name:'', password:'', description:''})
    const startValidation = (data:{}) => validate(data);
    const form = {
        values : () => values,
        setName : (name:string) => setValues({...values, name}),
        setPassword : (password:string) => setValues({...values, password}),
        setDescription : (description:string) => setValues({...values, description}),
};
const AccountInputs: InputText[] = [
    {
        style:undefined,
        name:'Account name',
        autoCompleteType:'username',
        onEndEditing:(value:string) => form.setName(value),
        value:form.values().name
    },
    {
        style:undefined,
        name:'Password',
        autoCompleteType:'password',
        onEndEditing:(value:string) => form.setPassword(value),
        value:form.values().password

    },
    {
        style:undefined,
        name:'Description',
        onEndEditing:(value:string) => form.setDescription(value),
        value:form.values().description

    },

]

    return(
        <View>
        <Text>Welcome to Virtual Markers</Text>
        <Text>Log info : </Text>
         <FlatList
         data={AccountInputs}
         renderItem={({item})=> CreateTextInput(item) }
         keyExtractor={(item) => item.name}
         />
            <Button
             onPress={() => startValidation(form.values())}
             title="Learn More"
             color="#841584"
             accessibilityLabel="Validates your inscription."
            >

            </Button>
        </View>
    )
};

