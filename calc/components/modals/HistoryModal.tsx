import { View, Text, Modal, ScrollView, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { globalStyles } from '@/styles/global-styles';
import ThemeText from '../ThemeText';

const HistoryModal = ({ visible, onClose, history, onClear }: any) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={globalStyles.modalContainer}>
        <View style={[globalStyles.modalContent, { maxHeight: '70%' }]}>
          <ThemeText variant="h2" style={{ marginBottom: 10 }}>
            Historial
          </ThemeText>

          {history.length === 0 ? (
            <Text style={{ color: 'gray' }}>No hay cálculos aún</Text>
          ) : (
            <ScrollView style={{ marginVertical: 10 }}>
              {[...history].reverse().map((item, index) => (
                <Text key={index} style={{ marginBottom: 6, color: 'black' }}>
                  {item}
                </Text>
              ))}
            </ScrollView>
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <Pressable
              onPress={onClose}
              style={{
                backgroundColor: Colors.lightGray,
                paddingVertical: 8,
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: 'black' }}>Cerrar</Text>
            </Pressable>

            <Pressable
              onPress={onClear}
              style={{
                backgroundColor: Colors.orange,
                paddingVertical: 8,
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: 'white' }}>Limpiar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default HistoryModal;
