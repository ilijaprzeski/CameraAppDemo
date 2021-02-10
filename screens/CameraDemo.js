import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert, ImageBackground, ToastAndroid, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import { useRef } from 'react';
import { uploadImage } from '../api/uploading';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

const Screen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [ready, setReady] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState(null);
    const cameraRef = useRef();
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');

            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        })();

        return () => {
            ScreenOrientation.unlockAsync();
        }
    }, []);

    const takePicture = () => {
        cameraRef.current.takePictureAsync().then(res => {
            setImage(res);
            setUploading(true);
            uploadImage(res).then(() => {
                navigation.goBack();
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Uploading is done successfully!', ToastAndroid.SHORT);
                }
            })
        }).catch(error => {
            console.log("Error:", error)
        })
    }

    const switchCamera = () => {
        if (type === Camera.Constants.Type.back) {
            setType(Camera.Constants.Type.front);
        } else {
            setType(Camera.Constants.Type.back);
        }
    }

    const toggleFlash = () => {
        if (flash === Camera.Constants.FlashMode.off) {
            setFlash(Camera.Constants.FlashMode.on)
        } else {
            setFlash(Camera.Constants.FlashMode.off)
        }
    }

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={type}
                ref={cameraRef}
                onCameraReady={() => setReady(true)}
                flashMode={flash}
            >
                {
                    ready && (
                        <View style={styles.buttonContainer}>
                            <View style={[styles.full, styles.center]}>
                                <TouchableOpacity onPress={switchCamera}>
                                    <Ionicons name="camera-reverse-outline" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={takePicture}>
                                <View style={styles.button} />
                            </TouchableOpacity>
                            <View style={[styles.full, styles.center]}>
                                <TouchableOpacity onPress={toggleFlash}>
                                    <Ionicons
                                        name={flash === Camera.Constants.FlashMode.off ? "flash-off" : "flash"}
                                        size={24}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            </Camera>
            {
                uploading && (
                    <View style={[styles.overview, styles.center]}>
                        <View style={styles.loadingContainer} />
                        <View style={styles.loader}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Uploading...</Text>
                        </View>
                    </View>
                )
            }
        </View>
    );
}

export default Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 32
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'red'
    },
    full: {
        flex: 1
    },
    loadingContainer: {
        position: 'absolute',
        top: 0, left: 0, bottom: 0, right: 0,
        backgroundColor: 'black',
        opacity: 0.6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    overview: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    loader: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
}); 