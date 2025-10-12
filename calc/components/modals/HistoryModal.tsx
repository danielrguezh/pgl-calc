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
            <Text style={globalStyles.historyModalTextEmpty}>
              No calculations yet
            </Text>
          ) : (
            <ScrollView style={{ marginVertical: 10 }}>
              {[...history].reverse().map((item, index) => (
                <Text key={index} style={{ marginBottom: 6, color: Colors.textPrimary }}>
                  {item}
                </Text>
              ))}
            </ScrollView>
          )}

          <View style={globalStyles.historyModalButtonRow}>
            <Pressable
              onPress={onClose}
              style={[globalStyles.historyModalButton, globalStyles.historyModalButtonClose]}
            >
              <Text style={globalStyles.historyModalButtonTextClose}>Close</Text>
            </Pressable>

            <Pressable
              onPress={onClear}
              style={[globalStyles.historyModalButton, globalStyles.historyModalButtonClear]}
            >
              <Text style={globalStyles.historyModalButtonTextClear}>Clear</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default HistoryModal;
