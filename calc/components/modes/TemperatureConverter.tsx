import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, Pressable, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import { globalStyles } from "@/styles/global-styles";
import { useThemeColors } from "@/hooks/useThemeColors";

const TemperatureConverter = () => {
  const colors = useThemeColors();
  const [value, setValue] = useState<string>("0");
  const [fromUnit, setFromUnit] = useState<"C" | "F" | "K">("C");
  const [toUnit, setToUnit] = useState<"C" | "F" | "K">("F");
  const [result, setResult] = useState<string>("0");

  useEffect(() => {
    convert();
  }, [value, fromUnit, toUnit]);

  const convert = () => {
    const v = parseFloat(value.replace(",", "."));
    if (isNaN(v)) {
      setResult("—");
      return;
    }

    let celsius = 0;

    // Convertir de la unidad de origen a Celsius
    switch (fromUnit) {
      case "C":
        celsius = v;
        break;
      case "F":
        celsius = (v - 32) * 5 / 9;
        break;
      case "K":
        celsius = v - 273.15;
        break;
    }

    // Convertir de Celsius a la unidad de destino
    let res = 0;
    switch (toUnit) {
      case "C":
        res = celsius;
        break;
      case "F":
        res = celsius * 9 / 5 + 32;
        break;
      case "K":
        res = celsius + 273.15;
        break;
    }

    setResult(res.toFixed(2));
  };

  const handleChangeValue = (text: string) => {
    const cleaned = text.replace(",", ".").replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    setValue(cleaned);
  };

  const copyResult = async () => {
    if (result && result !== "—") {
      await Clipboard.setStringAsync(result);
      Alert.alert("📋 Copied", `The result ${result} was copied to clipboard.`);
    }
  };

  const renderUnitSelector = (selected: "C" | "F" | "K", onSelect: (u: "C" | "F" | "K") => void) => (
    <View style={{ flexDirection: "row", justifyContent: "space-around", marginVertical: 10 }}>
      {["C", "F", "K"].map((u) => (
        <Pressable
          key={u}
          onPress={() => onSelect(u as "C" | "F" | "K")}
          style={{ 
            padding: 10, 
            borderWidth: 1, 
            borderColor: colors.textPrimary, 
            borderRadius: 5,
            backgroundColor: selected === u ? colors.orange : 'transparent'
          }}
        >
          <Text style={{ color: selected === u ? 'white' : colors.textPrimary }}>{u}</Text>
        </Pressable>
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor: colors.background }}>
      <Text style={[globalStyles.header, { color: colors.textPrimary }]}>Temperature Converter 🌡️</Text>

      <Text style={[globalStyles.label, { color: colors.textPrimary }]}>Value:</Text>
      <TextInput
        style={[globalStyles.input, { backgroundColor: colors.backgroundSecondary, color: colors.textPrimary }]}
        keyboardType="numeric"
        value={value}
        onChangeText={handleChangeValue}
        placeholder="Enter a value"
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={[globalStyles.label, { color: colors.textPrimary }]}>From:</Text>
      {renderUnitSelector(fromUnit, setFromUnit)}

      <Text style={[globalStyles.label, { color: colors.textPrimary }]}>To:</Text>
      {renderUnitSelector(toUnit, setToUnit)}

      <View style={[globalStyles.resultContainer, { backgroundColor: colors.backgroundSecondary, marginTop: 20 }]}>
        <Text style={[globalStyles.resultTitle, { color: colors.textPrimary }]}>Result:</Text>
        <Text style={[globalStyles.resultValue, { color: colors.textPrimary }]}>{result}</Text>

        <Pressable
          style={[globalStyles.converterButton, { backgroundColor: colors.orange, marginTop: 15 }]}
          onPress={copyResult}
        >
          <Text style={globalStyles.converterButtonText}>📋 Copy result</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default TemperatureConverter;