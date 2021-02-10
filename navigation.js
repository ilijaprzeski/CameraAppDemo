import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FirstScreen from './screens/First';
import CameraDemoScreen from './screens/CameraDemo';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="First" component={FirstScreen} />
                <Stack.Screen name="CameraDemo" component={CameraDemoScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;