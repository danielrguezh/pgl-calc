import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, Pressable, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Clipboard from "expo-clipboard";
import { globalStyles } from "@/styles/global-styles";
import { Colors } from "@/constants/Colors";

type TipoCalculo = "Interés Simple" | "Interés Compuesto" | "Valor Futuro" | "Valor Presente";

interface YearData {
  year: number;
  capital: number;
}

const FinanceTools = () => {
  const [tipo, setTipo] = useState<TipoCalculo>("Interés Simple");
  const [capital, setCapital] = useState<string>("1000");
  const [tasa, setTasa] = useState<string>("5");
  const [tiempo, setTiempo] = useState<string>("5");
  const [resultado, setResultado] = useState<number | null>(null);
  const [tabla, setTabla] = useState<YearData[]>([]);

  useEffect(() => {
    calcular();
  }, [tipo, capital, tasa, tiempo]);

  const limpiarTexto = (text: string) =>
    text.replace(",", ".").replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

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
      case "Interés Simple":
        res = C * r * t;
        break;
      case "Interés Compuesto":
        res = C * (Math.pow(1 + r, t) - 1);
        for (let i = 1; i <= t; i++) tablaTemp.push({ year: i, capital: C * Math.pow(1 + r, i) });
        break;
      case "Valor Futuro":
        res = C * Math.pow(1 + r, t);
        for (let i = 1; i <= t; i++) tablaTemp.push({ year: i, capital: C * Math.pow(1 + r, i) });
        break;
      case "Valor Presente":
        res = C / Math.pow(1 + r, t);
        break;
    }

    setResultado(res);
    setTabla(tablaTemp);
  };

  const copiarResultado = async () => {
    if (resultado !== null) {
      await Clipboard.setStringAsync(`Resultado: ${resultado.toFixed(2)}`);
      Alert.alert("✅ Copiado", "El resultado se copió al portapapeles.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={globalStyles.header}>💰 Calculadora Financiera</Text>

      <Text style={globalStyles.label}>Tipo de cálculo:</Text>
      <Picker
        selectedValue={tipo}
        onValueChange={(v) => setTipo(v as TipoCalculo)}
        style={globalStyles.picker}
      >
        <Picker.Item label="Interés Simple" value="Interés Simple" />
        <Picker.Item label="Interés Compuesto" value="Interés Compuesto" />
        <Picker.Item label="Valor Futuro" value="Valor Futuro" />
        <Picker.Item label="Valor Presente" value="Valor Presente" />
      </Picker>

      <Text style={globalStyles.label}>Capital inicial:</Text>
      <TextInput
        style={globalStyles.input}
        keyboardType="numeric"
        value={capital}
        onChangeText={(t) => setCapital(limpiarTexto(t))}
        placeholder="Ej: 1000"
      />

      <Text style={globalStyles.label}>Tasa de interés (% anual):</Text>
      <TextInput
        style={globalStyles.input}
        keyboardType="numeric"
        value={tasa}
        onChangeText={(t) => setTasa(limpiarTexto(t))}
        placeholder="Ej: 5"
      />

      <Text style={globalStyles.label}>Tiempo (años):</Text>
      <TextInput
        style={globalStyles.input}
        keyboardType="numeric"
        value={tiempo}
        onChangeText={(t) => setTiempo(limpiarTexto(t))}
        placeholder="Ej: 2"
      />

      {resultado !== null && (
        <View style={[globalStyles.resultContainer, { marginTop: 30 }]}>
          <Text style={globalStyles.resultTitle}>Resultado:</Text>
          <Text style={globalStyles.resultValue}>${resultado.toFixed(2)}</Text>

          <Pressable
            style={[globalStyles.converterButton, { backgroundColor: Colors.orange, marginTop: 15 }]}
            onPress={copiarResultado}
          >
            <Text style={globalStyles.converterButtonText}>📋 Copiar resultado</Text>
          </Pressable>
        </View>
      )}

      {tabla.length > 0 && (
        <View style={[globalStyles.resultContainer, { marginTop: 25 }]}>
          <Text style={globalStyles.resultTitle}>📈 Crecimiento año por año</Text>
          {tabla.map((item) => (
            <View
              key={item.year}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                paddingVertical: 5,
                borderBottomWidth: 1,
                borderColor: Colors.lightGray,
              }}
            >
              <Text style={{ fontSize: 16, color: Colors.textPrimary }}>Año {item.year}</Text>
              <Text style={{ fontSize: 16, fontWeight: "600", color: Colors.textPrimary }}>
                ${item.capital.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default FinanceTools;
