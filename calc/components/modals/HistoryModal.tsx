import { View, Text, Modal, ScrollView, Pressable, StyleSheet } from 'react-native';
import ThemeText from '../ThemeText';
import { useThemeColors } from '@/hooks/useThemeColors';

interface HistoryModalProps {
  visible: boolean;
  onClose: () => void;
  history: string[];
  onClear: () => void;
}

const HistoryModal = ({ visible, onClose, history, onClear }: HistoryModalProps) => {
  const colors = useThemeColors();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={[styles.container]}>
        <View style={[styles.content, { backgroundColor: colors.backgroundSecondary }]}>
          <ThemeText variant="h2" style={{ color: colors.textPrimary, marginBottom: 10, textAlign: 'center' }}>
            History
          </ThemeText>

          {history.length === 0 ? (
            <Text style={{ color: colors.textSecondary, textAlign: 'center', marginVertical: 10 }}>
              No calculations yet
            </Text>
          ) : (
            <ScrollView style={{ marginVertical: 10 }}>
              {[...history].reverse().map((item, index) => (
                <Text key={index} style={{ marginBottom: 6, color: colors.textPrimary }}>
                  {item}
                </Text>
              ))}
            </ScrollView>
          )}

          <View style={styles.buttonRow}>
            <Pressable
              onPress={onClose}
              style={[styles.button, { backgroundColor: colors.background }]}
            >
              <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>Close</Text>
            </Pressable>

            <Pressable
              onPress={onClear}
              style={[styles.button, { backgroundColor: colors.orange }]}
            >
              <Text style={{ color: 'white', fontWeight: '600' }}>Clear</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '85%',
    maxHeight: '70%',
    borderRadius: 20,
    padding: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
});

export default HistoryModal;


