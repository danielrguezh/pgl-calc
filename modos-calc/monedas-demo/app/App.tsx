import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import CurrencyConverter from './CurrencyConverter'; // 👈 importa tu componente

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <CurrencyConverter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});

export default App;
