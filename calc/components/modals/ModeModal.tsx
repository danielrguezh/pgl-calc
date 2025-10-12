import { View, Text, Pressable, Modal } from 'react-native';
import { Colors } from '@/constants/Colors';
import { globalStyles } from '@/styles/global-styles';
import ThemeText from '../ThemeText';

interface ModeModalProps {
  visible: boolean;
  onClose: () => void;
  selectedMode: string;
  onSelectMode: (mode: string) => void;
}

const ModeModal = ({ visible, onClose, selectedMode, onSelectMode }: ModeModalProps) => {
  const modes = [
    { label: 'Currency', emoji: '💰' },
    { label: 'Finance', emoji: '📈' },
    { label: 'Temperature', emoji: '🌡️' },
    { label: 'BMI', emoji: '⚖️' },
    { label: 'Speed', emoji: '🚗' },
    { label: 'Calculator', emoji: '🔢' },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={globalStyles.modalContainer}>
        <View style={globalStyles.modalContent}>
          <ThemeText variant="h2" style={globalStyles.modalTitle}>
            Select a Mode
          </ThemeText>

          {modes.map((mode) => (
            <Pressable
              key={mode.label}
              onPress={() => onSelectMode(mode.label)}
              style={[
                globalStyles.modalButton,
                {
                  backgroundColor:
                    selectedMode === mode.label ? Colors.orange : Colors.lightGray,
                },
              ]}
            >
              <Text
                style={[
                  globalStyles.modalButtonText,
                  { color: selectedMode === mode.label ? 'white' : Colors.textPrimary },
                ]}
              >
                {mode.emoji} {mode.label}
              </Text>
            </Pressable>
          ))}

          <Pressable
            onPress={onClose}
            style={[globalStyles.modalButton, { backgroundColor: Colors.lightGray, marginTop: 10 }]}
          >
            <Text style={{ color: Colors.textPrimary }}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ModeModal;
