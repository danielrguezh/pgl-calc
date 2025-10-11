import { Colors } from '@/constants/Colors';
import { globalStyles } from '@/styles/global-styles';
import { Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

interface Props {
    label: string;
    color?: string;
    blackText?: boolean;
    onPress?: () => void;
}

const CalculatorButton = ({
    label, 
    color = Colors.darkGray, 
    blackText = false, 
    onPress}: Props) => {
    return (
        <Pressable style={({pressed}) => ({
            ...globalStyles.button,
            backgroundColor: color,
            opacity: pressed ? 0.8 : 1,
        })} onPress={() => {
            Haptics.selectionAsync();
            if (onPress) {
                onPress();
            }
        }}
        >
            <Text 
                style={{               
                    ...globalStyles.ButtonText,
                    color: blackText ? 'black' : 'white',
                }}
            >{label}</Text>
        </Pressable>
    );
};
export default CalculatorButton;
