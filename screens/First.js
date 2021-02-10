import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Screen = () => {
    const navigation = useNavigation();

    const gotoCamera = () => {
        navigation.navigate("CameraDemo");
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <TouchableOpacity onPress={gotoCamera}>
                <Text
                    style={{
                        fontSize: 24,
                        color: 'blue'
                    }}
                >Take a picture and upload it.</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Screen;