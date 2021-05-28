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
  import {CreateAccountInputs} from '@components/inputComponents/TextInput';

const CreateAccount = () => {
    const theme = useTheme();
    const {classic} = theme.colors;
    
    return (
        <View>
            <SafeAreaView>
                    <CreateAccountInputs
                    validate={(value) => console.log(value)}
                    />
            </SafeAreaView>
        </View>
    )
}
export default CreateAccount;