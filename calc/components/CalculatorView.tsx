import React from "react";
import { View } from "react-native";
import { globalStyles } from "@/styles/global-styles";
import ThemeText from "@/components/ThemeText";
import CalculatorButton from "@/components/CalculatorButton";
import { useThemeColors } from "@/hooks/useThemeColors";

interface CalculatorViewProps {
  formula: string;
  previousNumber: string;
  currentNumber: string;
  buildNumber: (num: string) => void;
  clean: () => void;
  toggleSign: () => void;
  deleteLast: () => void;
  divideOperation: () => void;
  multiplyOperation: () => void;
  subtractOperation: () => void;
  addOperation: () => void;
  calculateResult: () => void;
  calculatePorcentage: () => void;
}

const CalculatorView = ({
  formula,
  previousNumber,
  currentNumber,
  buildNumber,
  clean,
  toggleSign,
  deleteLast,
  divideOperation,
  multiplyOperation,
  subtractOperation,
  addOperation,
  calculateResult,
  calculatePorcentage,
}: CalculatorViewProps) => {
  const colors = useThemeColors();

  return (
    <View>
      <View style={{ paddingHorizontal: 30, marginBottom: 20 }}>
        <ThemeText variant="h1" color={colors.textPrimary}>
          {formula}
        </ThemeText>
        {formula === previousNumber ? (
          <ThemeText variant="h2" color={colors.textSecondary}>
            {" "}
          </ThemeText>
        ) : (
          <ThemeText variant="h2" color={colors.textSecondary}>
            {previousNumber}
          </ThemeText>
        )}
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton label={currentNumber === "0" ? "AC" : "C"} color={colors.lightGray} blackText onPress={clean} />
        <CalculatorButton label="del" color={colors.lightGray} blackText onPress={deleteLast} />
        <CalculatorButton label="%" color={colors.lightGray} blackText onPress={calculatePorcentage} />
        <CalculatorButton label="÷" color={colors.orange} onPress={divideOperation} />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton label="7" onPress={() => buildNumber("7")} />
        <CalculatorButton label="8" onPress={() => buildNumber("8")} />
        <CalculatorButton label="9" onPress={() => buildNumber("9")} />
        <CalculatorButton label="X" color={colors.orange} onPress={multiplyOperation} />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton label="4" onPress={() => buildNumber("4")} />
        <CalculatorButton label="5" onPress={() => buildNumber("5")} />
        <CalculatorButton label="6" onPress={() => buildNumber("6")} />
        <CalculatorButton label="-" color={colors.orange} onPress={subtractOperation} />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton label="1" onPress={() => buildNumber("1")} />
        <CalculatorButton label="2" onPress={() => buildNumber("2")} />
        <CalculatorButton label="3" onPress={() => buildNumber("3")} />
        <CalculatorButton label="+" color={colors.orange} onPress={addOperation} />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton label="+/-" onPress={toggleSign} />
        <CalculatorButton label="0" onPress={() => buildNumber("0")} />
        <CalculatorButton label="." onPress={() => buildNumber(".")} />
        <CalculatorButton label="=" color={colors.orange} onPress={calculateResult} />
      </View>
    </View>
  );
};

export default CalculatorView;

