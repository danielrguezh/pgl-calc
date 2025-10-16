import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, Pressable, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Clipboard from "expo-clipboard";
import { globalStyles } from "@/styles/global-styles";
import { useThemeColors } from "@/hooks/useThemeColors";

type Category = "Length" | "Weight" | "Volume";
type System = "SI" | "Imperial";

const ImperialConverter = () => {
  const colors = useThemeColors();

  const [value, setValue] = useState<string>("0");
  const [category, setCategory] = useState<Category>("Length");
  const [originSystem, setOriginSystem] = useState<System>("SI");
  const [result, setResult] = useState<string>("0");

  useEffect(() => {
    convert();
  }, [value, category, originSystem]);

  const convert = () => {
    const v = parseFloat(value.replace(",", "."));
    if (isNaN(v)) {
      setResult("—");
      return;
    }

    let res = 0;
    switch (category) {
      case "Length":
        res = originSystem === "SI" ? v * 3.28084 : v / 3.28084;
        break;
      case "Weight":
        res = originSystem === "SI" ? v * 2.20462 : v / 2.20462;
        break;
      case "Volume":
        res = originSystem === "SI" ? v * 0.264172 : v / 0.264172;
        break;
    }
    setResult(res.toFixed(3));
  };

  const handleChangeValue = (text: string) => {
    const cleaned = text.replace(",", ".").replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    setValue(cleaned);
  };

  const getLabel = () => {
    switch (category) {
      case "Length":
        return originSystem === "SI" ? "m → ft" : "ft → m";
      case "Weight":
        return originSystem === "SI" ? "kg → lb" : "lb → kg";
      case "Volume":
        return originSystem === "SI" ? "L → gal" : "gal → L";
    }
  };

  const copyResult = async () => {
    if (result && result !== "—") {
      await Clipboard.setStringAsync(result);
      Alert.alert("📋 Copied", `The result ${result} was copied to clipboard.`);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor: colors.background }}>
      <Text style={[globalStyles.header, { color: colors.textPrimary }]}>Imperial Conversions ⚖️</Text>

      <Text style={[globalStyles.label, { color: colors.textPrimary }]}>Value:</Text>
      <TextInput
        style={[globalStyles.input, { backgroundColor: colors.backgroundSecondary, color: colors.textPrimary }]}
        keyboardType="numeric"
        value={value}
        onChangeText={handleChangeValue}
        placeholder="Enter a value"
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={[globalStyles.label, { color: colors.textPrimary }]}>Category:</Text>
      <Picker
        selectedValue={category}
        onValueChange={(v) => setCategory(v as Category)}
        style={{ height: 60, width: "100%", color: colors.textPrimary }}
      >
        <Picker.Item label="Length" value="Length" />
        <Picker.Item label="Weight" value="Weight" />
        <Picker.Item label="Volume" value="Volume" />
      </Picker>

      <Text style={[globalStyles.label, { color: colors.textPrimary }]}>Origin System:</Text>
      <Picker
        selectedValue={originSystem}
        onValueChange={(v) => setOriginSystem(v as System)}
        style={{ height: 60, width: "100%", color: colors.textPrimary }}
      >
        <Picker.Item label="SI" value="SI" />
        <Picker.Item label="Imperial" value="Imperial" />
      </Picker>

      <View style={[globalStyles.resultContainer, { backgroundColor: colors.backgroundSecondary, marginTop: 20 }]}>
        <Text style={[globalStyles.resultTitle, { color: colors.textPrimary }]}>Conversion ({getLabel()}):</Text>
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

export default ImperialConverter;
