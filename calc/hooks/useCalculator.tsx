import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

enum Operator {
  add = "+",
  subtract = "-",
  multiply = "×",
  divide = "÷",
}

export const useCalculator = () => {
  const [formula, setFormula] = useState("0");
  const [currentNumber, setCurrentNumber] = useState("0");
  const [previousNumber, setPreviousNumber] = useState("0");
  const [history, setHistory] = useState<string[]>([]);
  const lastOperation = useRef<Operator>(undefined);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const saved = await AsyncStorage.getItem("calculatorHistory");
        if (saved) {
          setHistory(JSON.parse(saved));
        }
      } catch (err) {
        console.warn("Error al cargar historial:", err);
      }
    };
    loadHistory();
  }, []);

  useEffect(() => {
    const saveHistory = async () => {
      try {
        await AsyncStorage.setItem("calculatorHistory", JSON.stringify(history));
      } catch (err) {
        console.warn("Error al guardar historial:", err);
      }
    };
    saveHistory();
  }, [history]);

  useEffect(() => {
    if (lastOperation.current) {
      const firstFormulaPart = formula.split(" ").at(0);
      let operation = lastOperation.current;
      let number = currentNumber;

      if (formula === "-" && number.startsWith("-")) {
        setFormula(number);
        lastOperation.current = undefined;
        return;
      }

      if (operation === Operator.subtract && firstFormulaPart === "0" && number === "0") {
        setFormula("-");
        return;
      }

      if (operation === Operator.add && number.startsWith("-")) {
        operation = Operator.subtract;
        number = number.slice(1);
      } else if (operation === Operator.subtract && number.startsWith("-")) {
        operation = Operator.add;
        number = number.slice(1);
      }

      if (number === "0") {
        setFormula(`${firstFormulaPart} ${operation}`);
      } else {
        setFormula(`${firstFormulaPart} ${operation} ${number}`);
      }
    } else {
      setFormula(currentNumber);
    }
  }, [currentNumber, previousNumber]);

  useEffect(() => {
    const subResult = calculateSubResult();
    setPreviousNumber(`${subResult}`);
  }, [formula]);

  const clean = () => {
    setCurrentNumber("0");
    setPreviousNumber("0");
    setFormula("0");
    lastOperation.current = undefined;
  };

  const toggleSign = () => {
    if (currentNumber === "0") return;
    if (currentNumber.startsWith("-")) {
      setCurrentNumber(currentNumber.slice(1));
    } else {
      setCurrentNumber("-" + currentNumber);
    }
  };

  const deleteLast = () => {
    if (currentNumber.length > 1 || (currentNumber.length === 2 && currentNumber.startsWith("-"))) {
      setCurrentNumber(currentNumber.slice(0, -1));
      return;
    }
    const parts = formula.split(" ");
    if (parts.length === 3) {
      setCurrentNumber(parts[0]);
      setFormula(parts[0]);
      lastOperation.current = undefined;
      return;
    }
    setCurrentNumber("0");
    setFormula("0");
    lastOperation.current = undefined;
  };

  const calculatePorcentage = () => {
    if (currentNumber === "0") return;
    if (currentNumber.endsWith("%")) {
      setCurrentNumber(currentNumber.slice(0, -1));
    } else {
      setCurrentNumber(currentNumber + "%");
    }
  };

  const setLastNumber = () => {
    calculateResult();
    if (currentNumber.endsWith(".")) {
      setPreviousNumber(currentNumber.slice(0, -1));
    }
    setPreviousNumber(currentNumber);
    setCurrentNumber("0");
  };

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  };

  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  };

  const subtractOperation = () => {
    if ((currentNumber === "-" || formula === "-") && formula === "-") {
      return;
    }
    if (currentNumber === "0" && formula === "0") {
      setFormula("-");
      setCurrentNumber("-");
      lastOperation.current = Operator.subtract;
      return;
    }
    setLastNumber();
    lastOperation.current = Operator.subtract;
  };

  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  };

  const parseNumber = (value: string | undefined) => {
    if (!value) return 0;
    if (value.endsWith("%")) {
      const number = Number(value.slice(0, -1));
      return isNaN(number) ? 0 : number / 100;
    }
    return Number(value);
  };

  const calculateSubResult = () => {
    if (formula === "-") return "";

    const [firstValue, operation, secondValue] = formula.split(" ");
    const number1 = parseNumber(firstValue);
    const number2 = parseNumber(secondValue);
    if (operation === undefined) return number1;
    if (isNaN(number2)) return number1;

    let addPorcentage = operation === "+" && currentNumber.includes("%");
    let subtractPorcentage = operation === "-" && currentNumber.includes("%");

    if (addPorcentage || subtractPorcentage) {
      let percentage = number1 * number2;
      if (operation === "-") {
        percentage = -percentage;
      }
      return number1 + percentage;
    }

    switch (operation) {
      case Operator.add:
        return number1 + number2;
      case Operator.subtract:
        return number1 - number2;
      case Operator.multiply:
        return number1 * number2;
      case Operator.divide:
        return number1 / number2;
      default:
        throw new Error(`Operation ${operation} is not implemented`);
    }
  };

  const calculateResult = () => {
    const result = calculateSubResult();

    if (formula && result !== undefined && formula !== result.toString()) {
      setHistory(prev => {
        const updated = [...prev, `${formula} = ${result}`];
        return updated.slice(-20);
    });
    }

    setFormula(`${result}`);
    setCurrentNumber(`${result}`);
    lastOperation.current = undefined;
    setPreviousNumber("0");
  };

  const buildNumber = (numberText: string) => {
    if (currentNumber.includes(".") && numberText === ".") return;
    if (currentNumber.startsWith("0")) {
      if (numberText === ".") {
        return setCurrentNumber(currentNumber + numberText);
      }
      if (numberText === "0" && currentNumber.includes(".")) {
        return setCurrentNumber(currentNumber + numberText);
      }
      if (numberText !== "0" && !currentNumber.includes(".")) {
        return setCurrentNumber(numberText);
      }
      if (numberText === "0" && !currentNumber.includes(".")) {
        return;
      }
    }
    setCurrentNumber(currentNumber + numberText);
  };

  const clearHistory = () => setHistory([]);

  return {
    formula,
    currentNumber,
    previousNumber,
    history,
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
    clearHistory
    
  };
};
