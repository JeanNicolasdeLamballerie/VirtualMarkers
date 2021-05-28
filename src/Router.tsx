import React from "react";
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import CreateAccount from '@screens/CreateAccount';
import Login from "@screens/Login";

const Stack = createStackNavigator();

//& Typing props
type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined //{ userId: string };
  Feed: undefined //{ userId: stringsort: 'latest' | 'top' } | undefined;
};

//& Typing routes and params for navigation
//! Create Account screen 
type CreateAccountScreen_RouteProp = RouteProp<RootStackParamList, 'CreateAccount'>;

type CreateAccountScreen_NavigationProp = StackNavigationProp<
RootStackParamList,
'CreateAccount'
>;

export type CreateAccountProps = {
  route: CreateAccountScreen_RouteProp;
  navigation: CreateAccountScreen_NavigationProp;
};


//! Login screen 
type LoginScreen_RouteProp = RouteProp<RootStackParamList, 'Login'>;

type LoginScreen_NavigationProp = StackNavigationProp<
RootStackParamList,
'Login'
>;

export type LoginProps = {
  route: LoginScreen_RouteProp;
  navigation: LoginScreen_NavigationProp;
};

const AppStackRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Welcome' }}
        />
        
        <Stack.Screen
        name="CreateAccount" 
        component={CreateAccount} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStackRouter;