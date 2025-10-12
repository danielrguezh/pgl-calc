import { View, Text, Modal, ScrollView, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { globalStyles } from '@/styles/global-styles';
import ThemeText from '../ThemeText';

interface HistoryModalProps {
  visible: boolean;
  onClose: () => void;
  history: string[];
  onClear: () => void;
}

const HistoryModal = ({ visible, onClose, history, onClear }: HistoryModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={globalStyles.historyModalContainer}>
        <View style={globalStyles.historyModalContent}>
          <ThemeText variant="h2" style={globalStyles.modalTitle}>
            History
          </ThemeText>

          {history.length === 0 ? (
            <Text style={{ color: Colors.textSecondary }}>No calculations yet</Text>
          ) : (
            <ScrollView style={{ marginVertical: 10 }}>
              {[...history].reverse().map((item, index) => (
                <Text key={index} style={{ marginBottom: 6, color: Colors.textPrimary }}>
                  {item}
                </Text>
              ))}
            </ScrollView>
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <Pressable
              onPress={onClose}
              style={[globalStyles.modalButton, { backgroundColor: Colors.lightGray }]}
            >
              <Text style={{ color: Colors.textPrimary }}>Close</Text>
            </Pressable>

            <Pressable
              onPress={onClear}
              style={[globalStyles.modalButton, { backgroundColor: Colors.orange }]}
            >
              <Text style={{ color: 'white' }}>Clear</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default HistoryModal;
