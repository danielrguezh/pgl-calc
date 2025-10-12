import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, Pressable, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Clipboard from "expo-clipboard";
import { globalStyles } from "@/styles/global-styles";
import { Colors } from "@/constants/Colors";
import { Moneda, ejemploMonedas } from "./data/coins";

const CurrencyConverter = () => {
  const [monedas, setMonedas] = useState<Moneda[]>([]);
  const [cantidad, setCantidad] = useState<string>("0");
  const [monedaOrigen, setMonedaOrigen] = useState<string>("");
  const [monedaDestino, setMonedaDestino] = useState<string>("");
  const [resultado, setResultado] = useState<number | null>(null);

  useEffect(() => {
    setMonedas(ejemploMonedas);
  }, []);

  useEffect(() => {
    const cantidadNum = parseFloat(cantidad.replace(/,/g, ""));
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

    const origen = monedas.find((m) => m.id === monedaOrigen);
    const destino = monedas.find((m) => m.id === monedaDestino);

    if (origen && destino) {
      const cantidadEnDolares = cantidadNum / origen.valor;
      const cantidadConvertida = cantidadEnDolares * destino.valor;
      setResultado(cantidadConvertida);
    } else {
      setResultado(null);
    }
  }, [cantidad, monedaOrigen, monedaDestino, monedas]);

  const handleCantidadChange = (text: string) => {
    text = text.replace(/,/g, "").replace(/[^0-9.]/g, "");
    const parts = text.split(".");
    if (parts.length > 2) text = parts[0] + "." + parts.slice(1).join("");
    let [entero, decimal] = text.split(".");
    entero = entero.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setCantidad(decimal !== undefined ? `${entero}.${decimal}` : entero);
  };

  const copiarResultado = async () => {
    if (resultado !== null) {
      await Clipboard.setStringAsync(resultado.toFixed(2));
      Alert.alert("✅ Copiado", "El resultado se copió al portapapeles.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={globalStyles.header}>💱 Conversor de Monedas</Text>

      <Text style={globalStyles.label}>Cantidad:</Text>
      <TextInput
        style={globalStyles.input}
        keyboardType="numeric"
        value={cantidad}
        onChangeText={handleCantidadChange}
        placeholder="Ej: 1000"
      />

      <Text style={globalStyles.label}>De:</Text>
      <Picker
        selectedValue={monedaOrigen}
        onValueChange={setMonedaOrigen}
        style={globalStyles.picker}
      >
        <Picker.Item label="Seleccione" value="" />
        {monedas.map((m) => (
          <Picker.Item key={m.id} label={m.id} value={m.id} />
        ))}
      </Picker>

      <Text style={globalStyles.label}>A:</Text>
      <Picker
        selectedValue={monedaDestino}
        onValueChange={setMonedaDestino}
        style={globalStyles.picker}
      >
        <Picker.Item label="Seleccione" value="" />
        {monedas.map((m) => (
          <Picker.Item key={m.id} label={m.id} value={m.id} />
        ))}
      </Picker>

      {resultado !== null && (
        <View style={[globalStyles.resultContainer, { marginTop: 30 }]}>
          <Text style={globalStyles.resultTitle}>Resultado:</Text>
          <Text style={globalStyles.resultValue}>{resultado.toFixed(2)}</Text>

          <Pressable
            style={[globalStyles.converterButton, { backgroundColor: Colors.orange, marginTop: 15 }]}
            onPress={copiarResultado}
          >
            <Text style={globalStyles.converterButtonText}>📋 Copiar resultado</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default CurrencyConverter;
