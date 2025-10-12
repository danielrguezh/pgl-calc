import { View, Text, Pressable } from 'react-native';
import { globalStyles } from '@/styles/global-styles';

interface TopBarProps {
  selectedMode: string;
  onModePress: () => void;
  onHistoryPress: () => void;
  colors: {
    background: string;
    textPrimary: string;
    textSecondary?: string;
    buttonBackground?: string;
    buttonText?: string;
  };
}

const TopBar = ({ selectedMode, onModePress, onHistoryPress, colors }: TopBarProps) => {
  return (
    <View style={[globalStyles.topBarContainer, { backgroundColor: colors.background }]}>
      <Pressable
        style={[globalStyles.topBarButton, { backgroundColor: colors.buttonBackground || '#ccc' }]}
        onPress={onModePress}
      >
        <Text style={[globalStyles.topBarButtonText, { color: colors.buttonText || colors.textPrimary }]}>
          Modes
        </Text>
      </Pressable>

      <View>
        <Text style={[globalStyles.topBarSelectedMode, { color: colors.textPrimary }]}>
          {selectedMode}
        </Text>
      </View>

      <Pressable
        style={[globalStyles.topBarButton, { backgroundColor: colors.buttonBackground || '#ccc' }]}
        onPress={onHistoryPress}
      >
        <Text style={[globalStyles.topBarButtonText, { color: colors.buttonText || colors.textPrimary }]}>
          History
        </Text>
      </Pressable>
    </View>
  );
};

export default TopBar;
