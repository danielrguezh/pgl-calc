import { View, Text, Switch, Pressable, Modal, ScrollView } from 'react-native';
import { globalStyles } from '@/styles/global-styles';
import ThemeText from '@/components/ThemeText';
import CalculatorButton from '@/components/CalculatorButton';
import { Colors } from '@/constants/Colors';
import { useCalculator } from '@/hooks/useCalculator';
import { useState } from 'react';

const CalculatorApp = () => {

  const  {
    formula,
    previousNumber,
    history,
    buildNumber,
    clean,
    toggleSign,
    deleteLast,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
    calculateResult,
    calculatePorcentage,
    clearHistory,
  } = useCalculator();

  const [showHistory, setShowHistory] = useState(false);
  const [showModeModal, setShowModeModal] = useState(false);
  const [selectedMode, setSelectedMode] = useState('Calculator');

  const modes = [
    { label: 'Currency', emoji: '💰' },
    { label: 'Finance', emoji: '📈' },
    { label: 'Temperature', emoji: '🌡️' },
    { label: 'BMI', emoji: '⚖️' },
    { label: 'Speed', emoji: '🚗' },
    { label: 'Calculator', emoji: '🔢' },
  ];

  const handleSelectMode = (mode: string) => {
    setSelectedMode(mode);
    setShowModeModal(false);
    console.log(`Modo seleccionado: ${mode}`);
  };

  return (
    <View style={globalStyles.calculatorContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
          paddingHorizontal: 20,
        }}
      >
        <Pressable
          onPress={() => setShowModeModal(true)}
          style={{
            backgroundColor: Colors.lightGray,
            paddingVertical: 8,
            paddingHorizontal: 14,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: 'black', fontWeight: '600' }}>Modo</Text>
        </Pressable>

        <View>
          <Text style={{ color: Colors.orange, fontWeight: '700' }}>
            {selectedMode}
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end', marginBottom: 10, paddingHorizontal: 20 }}>
        <Pressable
          onPress={() => setShowHistory(true)}
          style={{
            backgroundColor: Colors.lightGray,
            paddingVertical: 8,
            paddingHorizontal: 14,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: 'black', fontWeight: '600' }}>Historial</Text>
        </Pressable>
      </View>
      <View style={{ paddingHorizontal: 30, marginBottom: 20 }}>
        <ThemeText variant='h1'>{formula}</ThemeText>
          {
            formula === previousNumber ? (
              <ThemeText variant='h2'> </ThemeText>
            ): (
              <ThemeText variant='h2'>{previousNumber}</ThemeText>
            )
          }
      </View>
      <View style={globalStyles.row}>
        <CalculatorButton 
          label="C" 
          color={Colors.lightGray}
          blackText 
          onPress={clean} 
        />
        <CalculatorButton 
          label="del"
          color={Colors.lightGray}
          blackText 
          onPress={deleteLast}  
        />
        
        <CalculatorButton 
          label="%"
          color={Colors.lightGray}
          blackText 
          onPress={calculatePorcentage}  
        />
        <CalculatorButton 
          label="÷" 
          color={Colors.orange}
          onPress={divideOperation} 
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton 
          label="7" 
          onPress={()=> buildNumber('7')} 
        />
        <CalculatorButton 
          label="8"
          onPress={()=> buildNumber('8')} 
        />
        
        <CalculatorButton 
          label="9"
          onPress={()=> buildNumber('9')}  
        />
        <CalculatorButton 
          label="X" 
          color={Colors.orange}
          onPress={()=> multiplyOperation()} 
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton 
          label="4" 
          onPress={()=> buildNumber('4')} 
        />
        <CalculatorButton 
          label="5" 
          onPress={()=> buildNumber('5')} 
        />
        
        <CalculatorButton 
          label="6"
          onPress={()=> buildNumber('6')}  
        />
        <CalculatorButton 
          label="-" 
          color={Colors.orange}
          onPress={()=> subtractOperation()} 
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton 
          label="1" 
          onPress={()=> buildNumber('1')} 
        />
        <CalculatorButton 
          label="2" 
          onPress={()=> buildNumber('2')} 
        />
        
        <CalculatorButton 
          label="3"
          onPress={()=> buildNumber('3')}  
        />
        <CalculatorButton 
          label="+" 
          color={Colors.orange}
          onPress={()=> addOperation()}
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton 
          label="+/-" 
          onPress={toggleSign} 
        />
        <CalculatorButton 
          label="0" 
          onPress={()=> buildNumber('0')} 
        />
        
        <CalculatorButton 
          label="."
          onPress={()=> buildNumber('.')}  
        />
        <CalculatorButton 
          label="=" 
          color={Colors.orange}
          onPress={calculateResult} 
        />
      </View>
        
      <Modal
        visible={showModeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModeModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: Colors.backgroundLight,
              width: '80%',
              borderRadius: 20,
              padding: 20,
              alignItems: 'center',
            }}
          >
            <ThemeText variant="h2" style={{ marginBottom: 20 }}>
              Selecciona un modo
            </ThemeText>

            {modes.map((m) => (
              <Pressable
                key={m.label}
                onPress={() => handleSelectMode(m.label)}
                style={{
                  width: '100%',
                  backgroundColor:
                    selectedMode === m.label
                      ? Colors.orange
                      : Colors.lightGray,
                  paddingVertical: 12,
                  marginBottom: 10,
                  borderRadius: 12,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    color: selectedMode === m.label ? 'white' : 'black',
                    fontSize: 18,
                    fontWeight: '600',
                  }}
                >
                  {m.emoji} {m.label}
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => setShowModeModal(false)}
              style={{
                marginTop: 10,
                paddingVertical: 8,
                paddingHorizontal: 20,
                borderRadius: 10,
                backgroundColor: Colors.lightGray,
              }}
            >
              <Text style={{ color: 'black' }}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showHistory}
        transparent
        animationType="slide"
        onRequestClose={() => setShowHistory(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: Colors.backgroundLight,
              width: '85%',
              maxHeight: '70%',
              borderRadius: 20,
              padding: 20,
            }}
          >
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
                onPress={() => setShowHistory(false)}
                style={{
                  backgroundColor: Colors.lightGray,
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: 'black' }}>Close</Text>
              </Pressable>

              <Pressable
                onPress={clearHistory}
                style={{
                  backgroundColor: Colors.orange,
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: 'white' }}>Clear</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CalculatorApp;
