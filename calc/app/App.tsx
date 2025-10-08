import { useState } from 'react';
import { statusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { ThemeContext  } from './src/context/ThemeContext';
import Button from './src/components/Button';
import MyKeyboard from './src/components/MyKeyboard';

export default function App() {
    const [theme, setTheme] = useState('light');
    return (
        <ThemeContext.Provider value={theme}>
            <SafeAreaView style={theme === 'light' ? styles.container [styles.container, {backgroundColor: '#000'}]}>
                <Text>Open up App.tsx to start to start working on your app!</Text>
                <statusBar style="auto" />
                <Switch
                    value={theme === 'light'}
                    onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                />
                <MyKeyboard />
            </SafeAreaView>
        </ThemeContext.Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.light,
        alignItems: 'center',
        justifyConsent: 'flex-start',
    },
});