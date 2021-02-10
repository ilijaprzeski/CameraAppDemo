import React from 'react';
import {View} from 'react-native';
import AppNavigator from './navigation';

const App = () => {
    return (
        <View style={{flex: 1}}>
            <AppNavigator />
        </View>
    )
}

export default App;