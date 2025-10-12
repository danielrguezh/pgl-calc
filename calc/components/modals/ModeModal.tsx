import { View, Text, Pressable, Modal } from 'react-native';
import { Colors } from '@/constants/Colors';
import { globalStyles } from '@/styles/global-styles';
import ThemeText from '../ThemeText';

const ModeModal = ({ visible, onClose, selectedMode, onSelectMode }: any) => {
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
          <ThemeText variant="h2" style={globalStyles.modalTitle}>Selecciona un modo</ThemeText>
          {modes.map((m) => (
            <Pressable
              key={m.label}
              onPress={() => onSelectMode(m.label)}
              style={[
                globalStyles.modalButton,
                { backgroundColor: selectedMode === m.label ? Colors.orange : Colors.lightGray },
              ]}
            >
              <Text style={[globalStyles.modalButtonText, { color: selectedMode === m.label ? 'white' : 'black' }]}>
                {m.emoji} {m.label}
              </Text>
            </Pressable>
          ))}
          <Pressable onPress={onClose} style={{ marginTop: 10, padding: 8, borderRadius: 10, backgroundColor: Colors.lightGray }}>
            <Text style={{ color: 'black' }}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ModeModal;
