import { View, Text, Pressable } from 'react-native';
import { globalStyles } from '@/styles/global-styles';

interface TopBarProps {
  selectedMode: string;
  onModePress: () => void;
  onHistoryPress: () => void;
}

const TopBar = ({ selectedMode, onModePress, onHistoryPress }: TopBarProps) => {
  return (
    <View style={globalStyles.topBarContainer}>
      <Pressable style={globalStyles.topBarButton} onPress={onModePress}>
        <Text style={globalStyles.topBarButtonText}>Modo</Text>
      </Pressable>

      <View>
        <Text style={globalStyles.topBarSelectedMode}>{selectedMode}</Text>
      </View>

      <Pressable style={globalStyles.topBarButton} onPress={onHistoryPress}>
        <Text style={globalStyles.topBarButtonText}>Historial</Text>
      </Pressable>
    </View>
  );
};

export default TopBar;
