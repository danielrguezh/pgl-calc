import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, Pressable, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Clipboard from "expo-clipboard";
import { globalStyles } from "@/styles/global-styles";
import { useThemeColors } from "@/hooks/useThemeColors";

type TipoCalculo = "Simple interest" | "Compound interest" | "Future Value" | "Present Value";

interface YearData {
  year: number;
  capital: number;
}

const FinanceTools = () => {
  const colors = useThemeColors();

  const [tipo, setTipo] = useState<TipoCalculo>("Simple interest");
  const [capital, setCapital] = useState<string>("");
  const [tasa, setTasa] = useState<string>("");
  const [tiempo, setTiempo] = useState<string>("");
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
      case "Simple interest":
        res = C * r * t;
        break;
      case "Compound interest":
        res = C * (Math.pow(1 + r, t) - 1);
        for (let i = 1; i <= t; i++) tablaTemp.push({ year: i, capital: C * Math.pow(1 + r, i) });
        break;
      case "Future Value":
        res = C * Math.pow(1 + r, t);
        for (let i = 1; i <= t; i++) tablaTemp.push({ year: i, capital: C * Math.pow(1 + r, i) });
        break;
      case "Present Value":
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
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: colors.background }}>
      <Text style={[globalStyles.header, { color: colors.textPrimary }]}>
        💰 Financial Calculator
      </Text>

      <Text style={[globalStyles.label, { color: colors.textPrimary }]}>Calculation type:</Text>
      <Picker
        selectedValue={tipo}
        onValueChange={(v) => setTipo(v as TipoCalculo)}
        style={{ height: 60, width: "100%", color: colors.textPrimary }}
      >
        <Picker.Item label="Simple interest" value="Simple interest" />
        <Picker.Item label="Compound interest" value="Compound interest" />
        <Picker.Item label="Future Value" value="Future Value" />
        <Picker.Item label="Present Value" value="Present Value" />
      </Picker>

      <Text style={[globalStyles.label, { color: colors.textPrimary }]}>Initial capital:</Text>
      <TextInput
        style={[globalStyles.input, { backgroundColor: colors.backgroundSecondary, color: colors.textPrimary }]}
        keyboardType="numeric"
        value={capital}
        onChangeText={(t) => setCapital(limpiarTexto(t))}
        placeholder="e.g: 1000"
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={[globalStyles.label, { color: colors.textPrimary }]}>Interest rate (%annual):</Text>
      <TextInput
        style={[globalStyles.input, { backgroundColor: colors.backgroundSecondary, color: colors.textPrimary }]}
        keyboardType="numeric"
        value={tasa}
        onChangeText={(t) => setTasa(limpiarTexto(t))}
        placeholder="e.g: 5"
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={[globalStyles.label, { color: colors.textPrimary }]}>Time (years):</Text>
      <TextInput
        style={[globalStyles.input, { backgroundColor: colors.backgroundSecondary, color: colors.textPrimary }]}
        keyboardType="numeric"
        value={tiempo}
        onChangeText={(t) => setTiempo(limpiarTexto(t))}
        placeholder="e.g: 2"
        placeholderTextColor={colors.textSecondary}
      />

      {resultado !== null && (
        <View style={[globalStyles.resultContainer, { marginTop: 30, backgroundColor: colors.backgroundSecondary }]}>
          <Text style={[globalStyles.resultTitle, { color: colors.textPrimary }]}>Result:</Text>
          <Text style={[globalStyles.resultValue, { color: colors.textPrimary }]}>${resultado.toFixed(2)}</Text>

          <Pressable
            style={[globalStyles.converterButton, { backgroundColor: colors.orange, marginTop: 15 }]}
            onPress={copiarResultado}
          >
            <Text style={globalStyles.converterButtonText}>📋 Copy result</Text>
          </Pressable>
        </View>
      )}

      {tabla.length > 0 && (
        <View style={[globalStyles.resultContainer, { marginTop: 25, backgroundColor: colors.backgroundSecondary }]}>
          <Text style={[globalStyles.resultTitle, { color: colors.textPrimary }]}>📈 Year-over-year growth</Text>
          {tabla.map((item) => (
            <View
              key={item.year}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                paddingVertical: 5,
                borderBottomWidth: 1,
                borderColor: colors.lightGray,
              }}
            >
              <Text style={{ fontSize: 16, color: colors.textPrimary }}>Year {item.year}</Text>
              <Text style={{ fontSize: 16, fontWeight: "600", color: colors.textPrimary }}>
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

