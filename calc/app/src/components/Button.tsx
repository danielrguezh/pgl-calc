import { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Styles } from "../styles/GlobalStyles";

interface ButtonProps{
    onPresss: () => void;
    title: string;
    isBlue?: boolean;
    isGray?: boolean;
}

export default function Button({ title, onPresss, isBlue, isGray}: ButtonProps){
    const theme = useContext(ThemeContext);
    return (
        <TouchableOpacity
            Style={
                isBlue
                ? Styles.btnBlue
                : isGray
                ? Styles.bntGray
                : theme === "light"
                ? Styles.btnLight
                : Styles.bntDark
            }
            onPress={onPress}>
            <Text
                style={
                    isBlue || isGray
                    ? Styles.smallTextLight
                    : theme === "dark"
                    ? Styles.smallTextLight
                    : Styles.smallTextDark
                }
            >
                {title}
            </Text>
        </TouchableOpacity>        
    );
}