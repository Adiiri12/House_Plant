import { capitalize } from 'lodash';
import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Button, Divider, Text } from 'react-native-elements';
import { useTheme } from 'react-navigation';

function SimpleForm({ title, keys, initialData, onSubmit, submitLabel, context }) {
    const theme = useTheme();
    const styles = useStyles(theme);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        ...keys.reduce(
            (acc, cur) => ({
                ...acc,
                [cur.name]: initialData ? initialData[cur.name] : '',
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
        <View style={{ padding: 10 }}>
            {title && (
                <Text h3 style={styles.title}>
                    {title}
                </Text>
            )}
            {keys.map(({ component: Component, name: key, context: c, hidden, ...rest }) => (
                <View key={key} style={hidden ? styles.hidden : styles.input}>
                    <Component
                        {...rest}
                        onChange={(value) => handleSetData(key, value)}
                        defaultValue={data[key]}
                        placeholder={capitalize(key)}
                        data={c ? context[c] : null}
                    />
                </View>
            ))}
            <Button
                style={{ marginTop: 15 }}
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
            borderRadius: 5,
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
        title: {
            marginBottom: 20,
            color: '#62BD69',
        },
    });

export default SimpleForm;
