import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Clipboard from 'expo-clipboard';

type TipoCalculo = 'Interés Simple' | 'Interés Compuesto' | 'Valor Futuro' | 'Valor Presente';

interface YearData {
  year: number;
  capital: number;
}

const FinanceCalculator: React.FC = () => {
  const [tipo, setTipo] = useState<TipoCalculo>('Interés Simple');
  const [capital, setCapital] = useState<string>('1000');
  const [tasa, setTasa] = useState<string>('5');
  const [tiempo, setTiempo] = useState<string>('5');
  const [resultado, setResultado] = useState<number | null>(null);
  const [tabla, setTabla] = useState<YearData[]>([]);

  useEffect(() => {
    calcular();
  }, [tipo, capital, tasa, tiempo]);

  const limpiarTexto = (text: string) => {
    return text
      .replace(',', '.')
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*)\./g, '$1');
  };

  const calcular = () => {
    const C = parseFloat(capital);
    const r = parseFloat(tasa) / 100;
    const t = parseFloat(tiempo);

    if (isNaN(C) || isNaN(r) || isNaN(t) || C <= 0 || r < 0 || t <= 0) {
      setResultado(null);
      setTabla([]);
      return;
    }

    let res = 0;
    let tablaTemp: YearData[] = [];

    switch (tipo) {
      case 'Interés Simple':
        res = C * r * t;
        break;

      case 'Interés Compuesto':
        res = C * (Math.pow(1 + r, t) - 1);
        for (let i = 1; i <= t; i++) {
          const cap = C * Math.pow(1 + r, i);
          tablaTemp.push({ year: i, capital: cap });
        }
        break;

      case 'Valor Futuro':
        res = C * Math.pow(1 + r, t);
        for (let i = 1; i <= t; i++) {
          const cap = C * Math.pow(1 + r, i);
          tablaTemp.push({ year: i, capital: cap });
        }
        break;

      case 'Valor Presente':
        res = C / Math.pow(1 + r, t);
        break;
    }

    setResultado(res);
    setTabla(tablaTemp);
  };

  const copiarResultado = async () => {
    if (resultado !== null) {
      await Clipboard.setStringAsync(`Resultado: ${resultado.toFixed(2)}`);
      Alert.alert('✅ Copiado', 'El resultado se copió al portapapeles.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>💰 Calculadora Financiera Pro</Text>

      <Text style={styles.label}>Tipo de cálculo:</Text>
      <Picker
        selectedValue={tipo}
        onValueChange={(v) => setTipo(v as TipoCalculo)}
        style={styles.picker}
      >
        <Picker.Item label="Interés Simple" value="Interés Simple" />
        <Picker.Item label="Interés Compuesto" value="Interés Compuesto" />
        <Picker.Item label="Valor Futuro" value="Valor Futuro" />
        <Picker.Item label="Valor Presente" value="Valor Presente" />
      </Picker>

      <Text style={styles.label}>Capital inicial:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={capital}
        onChangeText={(t) => setCapital(limpiarTexto(t))}
        placeholder="Ej: 1000"
      />

      <Text style={styles.label}>Tasa de interés (% anual):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={tasa}
        onChangeText={(t) => setTasa(limpiarTexto(t))}
        placeholder="Ej: 5"
      />

      <Text style={styles.label}>Tiempo (años):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={tiempo}
        onChangeText={(t) => setTiempo(limpiarTexto(t))}
        placeholder="Ej: 2"
      />

      {resultado !== null && (
        <View style={styles.resultadoContainer}>
          <Text style={styles.resultadoTitulo}>Resultado:</Text>
          <Text style={styles.resultadoValor}>${resultado.toFixed(2)}</Text>

          <TouchableOpacity style={styles.copyButton} onPress={copiarResultado}>
            <Text style={styles.copyText}>📋 Copiar resultado</Text>
          </TouchableOpacity>
        </View>
      )}

      {tabla.length > 0 && (
        <View style={styles.tablaContainer}>
          <Text style={styles.tablaTitulo}>📈 Crecimiento año por año</Text>
          {tabla.map((item) => (
            <View key={item.year} style={styles.fila}>
              <Text style={styles.filaTexto}>Año {item.year}</Text>
              <Text style={styles.filaValor}>${item.capital.toFixed(2)}</Text>
            </View>
          ))}
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007AFF',
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
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 8,
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
  tablaContainer: {
    marginTop: 30,
    backgroundColor: '#eef6ff',
    padding: 15,
    borderRadius: 10,
  },
  tablaTitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  filaTexto: {
    fontSize: 16,
  },
  filaValor: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FinanceCalculator;
