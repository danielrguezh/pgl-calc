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
import * as Clipboard from 'expo-clipboard'; // 👈 para copiar al portapapeles
import { Moneda, ejemploMonedas } from './data/monedas';

const CurrencyConverter: React.FC = () => {
  const [monedas, setMonedas] = useState<Moneda[]>([]);
  const [cantidad, setCantidad] = useState<string>('0');
  const [monedaOrigen, setMonedaOrigen] = useState<string>('');
  const [monedaDestino, setMonedaDestino] = useState<string>('');
  const [resultado, setResultado] = useState<number | null>(null);

  // Cargar monedas al iniciar
  useEffect(() => {
    setMonedas(ejemploMonedas);
  }, []);

  // Recalcular cada vez que cambie algo
  useEffect(() => {
    const cantidadNum = parseFloat(cantidad.replace(/,/g, '')); // quitar comas para calcular

    if (
      monedas.length === 0 ||
      !monedaOrigen ||
      !monedaDestino ||
      isNaN(cantidadNum) ||
      cantidadNum <= 0
    ) {
      setResultado(null);
      return;
    }

    const origen = monedas.find(m => m.id === monedaOrigen);
    const destino = monedas.find(m => m.id === monedaDestino);

    if (origen && destino) {
      const cantidadEnDolares = cantidadNum / origen.valor;
      const cantidadConvertida = cantidadEnDolares * destino.valor;
      setResultado(cantidadConvertida);
    } else {
      setResultado(null);
    }
  }, [cantidad, monedaOrigen, monedaDestino, monedas]);

  // 🔹 Formatear número con comas y evitar caracteres inválidos
  const handleCantidadChange = (text: string) => {
    // Evitar comas manuales
    text = text.replace(/,/g, '');

    // Solo permitir números y punto
    text = text.replace(/[^0-9.]/g, '');

    // Evitar más de un punto
    const parts = text.split('.');
    if (parts.length > 2) {
      text = parts[0] + '.' + parts.slice(1).join('');
    }

    // Agregar comas de miles automáticamente (solo antes del punto decimal)
    let [entero, decimal] = text.split('.');
    entero = entero.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    setCantidad(decimal !== undefined ? `${entero}.${decimal}` : entero);
  };

  // 🔹 Copiar resultado al portapapeles
  const copiarResultado = async () => {
    if (resultado !== null) {
      await Clipboard.setStringAsync(resultado.toFixed(2));
      Alert.alert('Copiado', 'El resultado se ha copiado al portapapeles');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Conversor de Monedas</Text>

      {monedas.length > 0 && (
        <View style={styles.form}>
          <Text style={styles.label}>Cantidad:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={cantidad}
            onChangeText={handleCantidadChange}
            placeholder="Ingrese una cantidad"
          />

          <Text style={styles.label}>De:</Text>
          <Picker
            selectedValue={monedaOrigen}
            onValueChange={setMonedaOrigen}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione" value="" />
            {monedas.map((m) => (
              <Picker.Item key={m.id} label={m.id} value={m.id} />
            ))}
          </Picker>

          <Text style={styles.label}>A:</Text>
          <Picker
            selectedValue={monedaDestino}
            onValueChange={setMonedaDestino}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione" value="" />
            {monedas.map((m) => (
              <Picker.Item key={m.id} label={m.id} value={m.id} />
            ))}
          </Picker>
        </View>
      )}

      {resultado !== null && (
        <TouchableOpacity
          style={styles.resultadoContainer}
          onPress={copiarResultado}
          activeOpacity={0.8}
        >
          <Text style={styles.resultado}>
            Resultado: {resultado.toFixed(2)}
          </Text>
          <Text style={styles.copiarTexto}>(Toca para copiar)</Text>
        </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  resultadoContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 8,
  },
  resultado: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  copiarTexto: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
});

export default CurrencyConverter;
