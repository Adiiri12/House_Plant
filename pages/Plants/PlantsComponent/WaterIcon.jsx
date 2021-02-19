import React, { useState, useContext } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    Animated,
} from 'react-native';

const WaterIcon = () => {
    return (
        <MaterialCommunityIcons
            name={this.props.filled == true ? 'watering-can' : 'watering-can-outline'}
            color='blue'
            size={32}
            style={{ marginHorizontal: 6 }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
});

export default WaterIcon;
