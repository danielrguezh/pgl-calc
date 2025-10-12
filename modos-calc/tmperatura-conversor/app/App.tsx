import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Clipboard from 'expo-clipboard';

type Categoria = 'Longitud' | 'Peso' | 'Temperatura' | 'Volumen';
type Sistema = 'Métrico' | 'Imperial';

const MetricImperialConverter: React.FC = () => {
  const [valor, setValor] = useState<string>('0');
  const [categoria, setCategoria] = useState<Categoria>('Longitud');
  const [sistemaOrigen, setSistemaOrigen] = useState<Sistema>('Métrico');
  const [resultado, setResultado] = useState<string>('0');

  useEffect(() => {
    convertir();
  }, [valor, categoria, sistemaOrigen]);

  const convertir = () => {
    const v = parseFloat(valor.replace(',', '.'));
    if (isNaN(v)) {
      setResultado('—');
      return;
    }

    let res = 0;

    switch (categoria) {
      case 'Longitud':
        res = sistemaOrigen === 'Métrico' ? v * 3.28084 : v / 3.28084; // metros ↔ pies
        break;
      case 'Peso':
        res = sistemaOrigen === 'Métrico' ? v * 2.20462 : v / 2.20462; // kg ↔ libras
        break;
      case 'Temperatura':
        res = sistemaOrigen === 'Métrico' ? v * 9/5 + 32 : (v - 32) * 5/9; // °C ↔ °F
        break;
      case 'Volumen':
        res = sistemaOrigen === 'Métrico' ? v * 0.264172 : v / 0.264172; // litros ↔ galones
        break;
    }

    setResultado(res.toFixed(3));
  };

  const handleChangeValor = (text: string) => {
    const limpio = text
      .replace(',', '.')
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*)\./g, '$1');
    setValor(limpio);
  };

  const obtenerEtiqueta = () => {
    switch (categoria) {
      case 'Longitud':
        return sistemaOrigen === 'Métrico' ? 'metros → pies' : 'pies → metros';
      case 'Peso':
        return sistemaOrigen === 'Métrico' ? 'kg → libras' : 'libras → kg';
      case 'Temperatura':
        return sistemaOrigen === 'Métrico' ? '°C → °F' : '°F → °C';
      case 'Volumen':
        return sistemaOrigen === 'Métrico' ? 'litros → galones' : 'galones → litros';
    }
  };

  const copiarResultado = async () => {
    if (resultado && resultado !== '—') {
      await Clipboard.setStringAsync(resultado);
      Alert.alert('📋 Copiado', `El resultado ${resultado} se copió al portapapeles.`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Conversor Métrico ↔ Imperial ⚖️</Text>

      <Text style={styles.label}>Valor:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={valor}
        onChangeText={handleChangeValor}
        placeholder="Introduce un valor"
      />

      <Text style={styles.label}>Categoría:</Text>
      <Picker
        selectedValue={categoria}
        onValueChange={(v) => setCategoria(v as Categoria)}
        style={styles.picker}
      >
        <Picker.Item label="Longitud" value="Longitud" />
        <Picker.Item label="Peso" value="Peso" />
        <Picker.Item label="Temperatura" value="Temperatura" />
        <Picker.Item label="Volumen" value="Volumen" />
      </Picker>

      <Text style={styles.label}>Sistema de origen:</Text>
      <Picker
        selectedValue={sistemaOrigen}
        onValueChange={(v) => setSistemaOrigen(v as Sistema)}
        style={styles.picker}
      >
        <Picker.Item label="Métrico" value="Métrico" />
        <Picker.Item label="Imperial" value="Imperial" />
      </Picker>

      <View style={styles.resultadoContainer}>
        <Text style={styles.resultadoLabel}>
          Conversión ({obtenerEtiqueta()}):
        </Text>
        <Text style={styles.resultado}>{resultado}</Text>

        <TouchableOpacity style={styles.boton} onPress={copiarResultado}>
          <Text style={styles.botonTexto}>Copiar resultado 📋</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'stretch',
  },
  header: {
    fontSize: 24,
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
    marginTop: 20,
    alignItems: 'center',
  },
  resultadoLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  resultado: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 5,
  },
  boton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MetricImperialConverter;
