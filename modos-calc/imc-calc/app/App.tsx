import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Clipboard from 'expo-clipboard';

type Sistema = 'Métrico' | 'Imperial';

const IMCConverter: React.FC = () => {
  const [peso, setPeso] = useState<string>('0');
  const [altura, setAltura] = useState<string>('0');
  const [sistema, setSistema] = useState<Sistema>('Métrico');
  const [imc, setImc] = useState<number | null>(null);
  const [categoria, setCategoria] = useState<string>('');

  useEffect(() => {
    calcularIMC();
  }, [peso, altura, sistema]);

  const limpiarTexto = (text: string) => {
    return text
      .replace(',', '.')
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*)\./g, '$1');
  };

  const calcularIMC = () => {
    const p = parseFloat(peso);
    const h = parseFloat(altura);

    if (isNaN(p) || isNaN(h) || p <= 0 || h <= 0) {
      setImc(null);
      setCategoria('');
      return;
    }

    let resultado: number;

    if (sistema === 'Métrico') {
      resultado = p / (h * h);
    } else {
      resultado = (p / (h * h)) * 703;
    }

    setImc(resultado);
    setCategoria(categoriaIMC(resultado));
  };

  const categoriaIMC = (valor: number): string => {
    if (valor < 18.5) return 'Bajo peso 🟡';
    if (valor < 25) return 'Peso normal 🟢';
    if (valor < 30) return 'Sobrepeso 🟠';
    return 'Obesidad 🔴';
  };

  const copiarResultado = async () => {
    if (imc !== null) {
      await Clipboard.setStringAsync(`IMC: ${imc.toFixed(2)} (${categoria})`);
      Alert.alert('✅ Copiado', 'El resultado del IMC se copió al portapapeles.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Calculadora de IMC (Índice de Masa Corporal) 💪</Text>

      <Text style={styles.label}>Sistema de medida:</Text>
      <Picker
        selectedValue={sistema}
        onValueChange={(value) => setSistema(value as Sistema)}
        style={styles.picker}
      >
        <Picker.Item label="Métrico (kg / m)" value="Métrico" />
        <Picker.Item label="Imperial (lb / in)" value="Imperial" />
      </Picker>

      <Text style={styles.label}>
        Peso ({sistema === 'Métrico' ? 'kg' : 'lb'}):
      </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={peso}
        onChangeText={(t) => setPeso(limpiarTexto(t))}
        placeholder="Ej: 70"
      />

      <Text style={styles.label}>
        Altura ({sistema === 'Métrico' ? 'metros' : 'pulgadas'}):
      </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={altura}
        onChangeText={(t) => setAltura(limpiarTexto(t))}
        placeholder={sistema === 'Métrico' ? 'Ej: 1.75' : 'Ej: 70'}
      />

      {imc !== null && (
        <View style={styles.resultadoContainer}>
          <Text style={styles.resultadoTitulo}>Tu IMC:</Text>
          <Text style={styles.resultadoValor}>{imc.toFixed(2)}</Text>
          <Text style={styles.categoria}>{categoria}</Text>

          <TouchableOpacity style={styles.copyButton} onPress={copiarResultado}>
            <Text style={styles.copyText}>📋 Copiar resultado</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'stretch',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  resultadoContainer: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
  },
  resultadoTitulo: {
    fontSize: 18,
    fontWeight: '500',
  },
  resultadoValor: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  categoria: {
    fontSize: 18,
    marginTop: 5,
  },
  copyButton: {
    marginTop: 15,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  copyText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default IMCConverter;
