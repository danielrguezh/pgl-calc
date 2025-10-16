import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Clipboard from "expo-clipboard";
import { Moneda, ejemploMonedas } from "./data/coins";
import { globalStyles } from "@/styles/global-styles";
import { useThemeColors } from "@/hooks/useThemeColors";

const CurrencyConverter = () => {
  const colors = useThemeColors();

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
      Alert.alert("📋 Copied", `The result ${resultado} was copied to clipboard.`);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        globalStyles.background,
        { backgroundColor: colors.background },
      ]}
    >
      <Text
        style={[
          globalStyles.header,
          { color: colors.textPrimary },
        ]}
      >
        Currency Converter 💰
      </Text>

      <View style={{ paddingHorizontal: 20 }}>
        <Text style={[globalStyles.label, { color: colors.textPrimary }]}>
          Quantity:
        </Text>
        <TextInput
          style={[
            globalStyles.input,
            {
              backgroundColor: colors.backgroundSecondary,
              color: colors.textPrimary,
            },
          ]}
          keyboardType="numeric"
          value={cantidad}
          onChangeText={handleCantidadChange}
          placeholder="Type any quantity"
          placeholderTextColor={colors.textSecondary}
        />

        <Text style={[globalStyles.label, { color: colors.textPrimary }]}>
          From:
        </Text>
        <Picker
          selectedValue={monedaOrigen}
          onValueChange={setMonedaOrigen}
          style={{ height: 60, width: "100%", color: colors.textPrimary }}
        >
          <Picker.Item label="Select" value="" />
          {monedas.map((m) => (
            <Picker.Item key={m.id} label={m.id} value={m.id} />
          ))}
        </Picker>

        <Text style={[globalStyles.label, { color: colors.textPrimary }]}>
         To:
        </Text>
        <Picker
          selectedValue={monedaDestino}
          onValueChange={setMonedaDestino}
          style={{ height: 60, width: "100%", color: colors.textPrimary }}
        >
          <Picker.Item label="Select" value="" />
          {monedas.map((m) => (
            <Picker.Item key={m.id} label={m.id} value={m.id} />
          ))}
        </Picker>

        {resultado !== null && (
          <TouchableOpacity
            style={[
              globalStyles.resultContainer,
              {
                backgroundColor: colors.backgroundSecondary,
                marginTop: 20,
              },
            ]}
            onPress={copiarResultado}
            activeOpacity={0.8}
          >
            <Text style={[globalStyles.resultValue, { color: colors.textPrimary }]}>
              {resultado.toFixed(2)}
            </Text>
            <Text style={[globalStyles.converterButton, { backgroundColor: colors.orange, marginTop: 15 }]}>
              (📋 Copy result)
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default CurrencyConverter;
