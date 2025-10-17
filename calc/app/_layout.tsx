import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { Platform, Switch, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { useState, useEffect } from "react";
import { ThemeContext, ThemeType } from "@/components/ThemeContext";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/styles/global-styles";


const isAndroid = Platform.OS === "android";


const RootLayout = () => {
 const [loaded] = useFonts({
   SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
 });


 const [theme, setTheme] = useState<ThemeType>("light");


 const isLight = theme === "light";


 useEffect(() => {
   if (isAndroid) {
     NavigationBar.setBackgroundColorAsync(
       isLight ? Colors.dark.background : Colors.light.background
     );
     NavigationBar.setButtonStyleAsync(isLight ? "dark" : "light");
   }
 }, [isLight]);


 if (!loaded) return null;


 return (
   <ThemeContext.Provider value={{ theme, setTheme }}>
     <View
       style={[
         globalStyles.background,
         { backgroundColor: isLight ? Colors.light.background : Colors.dark.background },
       ]}
     >
       <View style={globalStyles.themeSwitchContainer}>
         <Switch
           value={isLight}
           onValueChange={() => setTheme(isLight ? "dark" : "light")}
           thumbColor={isLight ? Colors.dark.orange : Colors.light.darkGray}
         />
       </View>


       <Slot />
       <StatusBar style={isLight ? "dark" : "light"} />
     </View>
   </ThemeContext.Provider>
 );
};

export default RootLayout;

