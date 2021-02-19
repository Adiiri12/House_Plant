import { capitalize } from 'lodash';
import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useTheme } from 'react-navigation';

function SimpleForm({ keys, initialData, onSubmit, submitLabel }) {
    const theme = useTheme();
    const styles = useStyles(theme);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        ...keys.reduce(
            (acc, cur) => ({
                ...acc,
                [cur.key]: initialData ? initialData[cur.key] : '',
            }),
            {}
        ),
    });

    const handleSetData = (key, value) => {
        setData({ ...data, [key]: value });
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            await onSubmit(data);
        } catch (e) {
            Alert.alert(e.message);
        }

        setLoading(false);
    };

    return (
        <View>
            {keys.map(
                ({ key, hidden, textContentType, autoCompleteType, keyboardType, password }) => (
                    <View key={key} style={hidden ? styles.hidden : {}}>
                        <Text style={styles.inputLabel}>{capitalize(key)}</Text>
                        <Input
                            textContentType={textContentType}
                            autoCompleteType={autoCompleteType}
                            keyboardType={keyboardType}
                            secureTextEntry={password}
                            onChangeText={(text) => handleSetData(key, text)}
                            defaultValue={data[key] || ''}
                            placeholder={capitalize(key)}
                        />
                    </View>
                )
            )}
            <Button
                style={{ marginTop: 20 }}
                onPress={handleSubmit}
                title={submitLabel || 'Submit'}
                loading={loading}
            />
        </View>
    );
}

const useStyles = (theme) =>
    StyleSheet.create({
        input: {
            padding: 2,
            borderRadius: 5,
            paddingVertical: 2,
            paddingHorizontal: 10,
            marginBottom: 5,
        },
        inputLabel: {
            paddingVertical: 2,
            fontSize: 15,
            fontWeight: 'bold',
        },
        hidden: {
            display: 'none',
        },
    });

export default SimpleForm;
