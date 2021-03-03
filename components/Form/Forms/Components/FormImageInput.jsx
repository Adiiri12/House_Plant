import React, { useState, useContext, useEffect, Fragment } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, Input, Text, Image } from 'react-native-elements';
import { Camera } from 'expo-camera';

const FormImageInput = ({ label, onChange, defaultValue }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [previewVisible, setPreviewVisible] = useState(!!defaultValue);
    const [retake, setRetake] = useState(false);
    const [image, SetImage] = useState(defaultValue || null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        console.log(image);
        SetImage(image);
    }, [image]);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    let camera;
    const getPicture = async () => {
        const photo = await camera.takePictureAsync();
        setPreviewVisible(true);
        //console.log('before');
        SetImage(photo.uri);
        onChange(photo.uri);
    };

    if (previewVisible === true) {
        //console.log('what');
        //console.log('what ' + image);
        return (
            <Fragment>
                <View style={styles.cameraContainer}>
                    <Image style={styles.buttonContainer} source={{ uri: image }} />
                </View>

                <Button
                    title='Retake'
                    onPress={() => {
                        setPreviewVisible(false);
                    }}
                />
            </Fragment>
        );
    }

    return (
        <>
            <View style={styles.cameraContainer}>
                <Camera
                    type={type}
                    ref={(ref) => {
                        camera = ref;
                    }}
                >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}
                        >
                            <Text style={styles.text}> Flip </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
            <Button
                title={label}
                onPress={() => {
                    getPicture();
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        width: '100%',
        height: 300,
        backgroundColor: '#eee',
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonContainer: {
        width: '100%',
        height: 300,
    },
    text: {
        fontSize: 14,
        paddingBottom: 5,
        color: 'white',
    },
});

export default FormImageInput;
