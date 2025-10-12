import { View, Text, Pressable, Animated } from 'react-native';
import { globalStyles } from '@/styles/global-styles';
import { useRef } from 'react';
import { History, Layers } from 'lucide-react-native';

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
  const scaleAnimMode = useRef(new Animated.Value(1)).current;
  const scaleAnimHistory = useRef(new Animated.Value(1)).current;

  const handlePressIn = (anim: Animated.Value) => {
    Animated.spring(anim, { toValue: 0.95, useNativeDriver: true }).start();
  };
  const handlePressOut = (anim: Animated.Value) => {
    Animated.spring(anim, { toValue: 1, useNativeDriver: true }).start();
  };

  const buttonBaseStyle: any = {
    backgroundColor: colors.buttonBackground || colors.background,
    borderColor: colors.textSecondary || '#ccc',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    minWidth: 100,
    marginHorizontal: 2.5,
  };

  const buttonTextStyle: any = {
    color: colors.buttonText || colors.textPrimary,
    fontWeight: '600',
    fontSize: 16,
  };

  return (
    <View
      style={[
        globalStyles.topBarContainer,
        {
          backgroundColor: colors.background,
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      ]}
    >

      <Animated.View
        style={{ transform: [{ scale: scaleAnimMode }], flex: 1, maxWidth: 130 }}
      >
        <Pressable
          style={[buttonBaseStyle]}
          onPressIn={() => handlePressIn(scaleAnimMode)}
          onPressOut={() => handlePressOut(scaleAnimMode)}
          onPress={onModePress}
        >
          <Layers size={20} color={colors.buttonText || colors.textPrimary} />
          <Text style={[buttonTextStyle]}>Modes</Text>
        </Pressable>
      </Animated.View>

      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text
          style={[
            globalStyles.topBarSelectedMode,
            { color: colors.textPrimary, textAlign: 'center' },
          ]}
        >
          {selectedMode}
        </Text>
      </View>

      <Animated.View
        style={{ transform: [{ scale: scaleAnimHistory }], flex: 1, maxWidth: 130 }}
      >
        <Pressable
          style={[buttonBaseStyle]}
          onPressIn={() => handlePressIn(scaleAnimHistory)}
          onPressOut={() => handlePressOut(scaleAnimHistory)}
          onPress={onHistoryPress}
        >
          <History size={20} color={colors.buttonText || colors.textPrimary} />
          <Text style={[buttonTextStyle]}>History</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default TopBar;
