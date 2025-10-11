import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { Platform, Switch, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { globalStyles } from '@/styles/global-styles';
import * as NavigationBar from 'expo-navigation-bar';
import { useState } from 'react';
import { ThemeContext } from '@/components/ThemeContext';
import { Colors } from '@/constants/Colors';

const isAndroid = Platform.OS === 'android';

if (isAndroid) {
  NavigationBar.setBackgroundColorAsync('black');
}

const RootLayout = () => {

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  const [theme, setTheme] = useState('light');

  if (!loaded) {
    return null;
  }

  const isLight = theme === 'light';

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <View
        style={[
          globalStyles.background,
          { backgroundColor: isLight ? Colors.backgroundLight : Colors.backgroundDark },
        ]}
      >
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <Switch
            value={isLight}
            onValueChange={() => setTheme(isLight ? 'dark' : 'light')}
          />
        </View>

        <Slot />
        <StatusBar style={isLight ? 'dark' : 'light'} />
      </View>
    </ThemeContext.Provider>
  );
}
export default RootLayout;
