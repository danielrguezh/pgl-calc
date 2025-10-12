import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';
import ThemeText from '../ThemeText';
import { useThemeColors } from '@/hooks/useThemeColors';

interface ModeModalProps {
  visible: boolean;
  onClose: () => void;
  selectedMode: string;
  onSelectMode: (mode: string) => void;
}

const ModeModal = ({ visible, onClose, selectedMode, onSelectMode }: ModeModalProps) => {
  const colors = useThemeColors();

  const modes = [
    { label: 'Currency', emoji: '💰' },
    { label: 'Finance', emoji: '📈' },
    { label: 'Temperature', emoji: '🌡️' },
    { label: 'SI-Imperial', emoji: '📏' },
    { label: 'BMI', emoji: '💪' },
    { label: 'Calculator', emoji: '🔢' },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={[styles.container]}>
        <View style={[styles.content, { backgroundColor: colors.backgroundSecondary }]}>
          <ThemeText variant="h2" style={{ color: colors.textPrimary, marginBottom: 15, textAlign: 'center' }}>
            Select a Mode
          </ThemeText>

          {modes.map((mode) => {
            const isSelected = selectedMode === mode.label;
            return (
              <Pressable
                key={mode.label}
                onPress={() => onSelectMode(mode.label)}
                style={[styles.button, { backgroundColor: isSelected ? colors.orange : colors.background }]}
              >
                <Text style={{ color: isSelected ? 'white' : colors.textPrimary, fontWeight: '600' }}>
                  {mode.emoji} {mode.label}
                </Text>
              </Pressable>
            );
          })}

          <Pressable
            onPress={onClose}
            style={[styles.button, { backgroundColor: colors.background, marginTop: 10 }]}
          >
            <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default ModeModal;
