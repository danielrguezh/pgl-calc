import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, Pressable, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Clipboard from "expo-clipboard";
import { globalStyles } from "@/styles/global-styles";
import { Colors } from "@/constants/Colors";

type Sistema = "Métrico" | "Imperial";

const BMICalculator = () => {
  const [peso, setPeso] = useState<string>("0");
  const [altura, setAltura] = useState<string>("0");
  const [sistema, setSistema] = useState<Sistema>("Métrico");
  const [imc, setImc] = useState<number | null>(null);
  const [categoria, setCategoria] = useState<string>("");

  useEffect(() => {
    calcularIMC();
  }, [peso, altura, sistema]);

  const limpiarTexto = (text: string) =>
    text.replace(",", ".").replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

  const calcularIMC = () => {
    const p = parseFloat(peso);
    const h = parseFloat(altura);

    if (isNaN(p) || isNaN(h) || p <= 0 || h <= 0) {
      setImc(null);
      setCategoria("");
      return;
    }

    const resultado = sistema === "Métrico" ? p / (h * h) : (p / (h * h)) * 703;

    setImc(resultado);
    setCategoria(categoriaIMC(resultado));
  };

  const categoriaIMC = (valor: number) => {
    if (valor < 18.5) return "Underweight 🟡";
    if (valor < 25) return "Normal 🟢";
    if (valor < 30) return "Overweight 🟠";
    return "Obesity 🔴";
  };

  const copiarResultado = async () => {
    if (imc !== null) {
      await Clipboard.setStringAsync(`BMI: ${imc.toFixed(2)} (${categoria})`);
      Alert.alert("✅ Copied", "BMI result copied to clipboard.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
        BMI Calculator 💪
      </Text>

      <Text style={{ fontSize: 16, marginTop: 10 }}>Measurement system:</Text>
      <Picker
        selectedValue={sistema}
        onValueChange={(value: string) => setSistema(value as Sistema)}
        style={{ height: 60, width: "100%" }}
      >
        <Picker.Item label="Metric (kg / m)" value="Métrico" />
        <Picker.Item label="Imperial (lb / in)" value="Imperial" />
      </Picker>

      <Text style={{ fontSize: 16, marginTop: 10 }}>Weight ({sistema === "Métrico" ? "kg" : "lb"}):</Text>
      <TextInput
        style={globalStyles.input}
        keyboardType="numeric"
        value={peso}
        onChangeText={(t) => setPeso(limpiarTexto(t))}
        placeholder="e.g. 70"
      />

      <Text style={{ fontSize: 16, marginTop: 10 }}>
        Height ({sistema === "Métrico" ? "meters" : "inches"}):
      </Text>
      <TextInput
        style={globalStyles.input}
        keyboardType="numeric"
        value={altura}
        onChangeText={(t) => setAltura(limpiarTexto(t))}
        placeholder={sistema === "Métrico" ? "e.g. 1.75" : "e.g. 70"}
      />

      {imc !== null && (
        <View style={[globalStyles.resultContainer, { marginTop: 30 }]}>
            <Text style={globalStyles.resultTitle}>Your BMI:</Text>
            <Text style={globalStyles.resultValue}>{imc.toFixed(2)}</Text>
            <Text style={globalStyles.resultCategory}>{categoria}</Text>

            <Pressable
                style={[globalStyles.converterButton, { backgroundColor: Colors.orange, marginTop: 15 }]}
                onPress={copiarResultado}
            >
                <Text style={globalStyles.converterButtonText}>📋 Copy result</Text>
            </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default BMICalculator;
