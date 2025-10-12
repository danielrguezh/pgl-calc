import { View } from 'react-native';
import { useState } from 'react';
import { globalStyles } from '@/styles/global-styles';
import { useCalculator } from '@/hooks/useCalculator';
import CalculatorView from '@/components/CalculatorView';
import ModeModal from '@/components/modals/ModeModal';
import HistoryModal from '@/components/modals/HistoryModal';
import TopBar from '@/components/TopBar';
import BMICalculator from '@/components/modes/BMICalculator';
import CurrencyConverter from '@/components/modes/CurrencyCoverter';
import FinanceTools from '@/components/modes/FinanceTools';
import TemperatureConverter from '@/components/modes/TemperatureConverter';
import { useThemeColors } from "@/hooks/useThemeColors";

const CalculatorApp = () => {
  const {
    formula,
    previousNumber,
    history,
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
    clearHistory,
  } = useCalculator();

  const [showModeModal, setShowModeModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedMode, setSelectedMode] = useState('Calculator');

  const colors = useThemeColors();

  const renderContent = () => {
  switch (selectedMode) {
    case 'Currency':
      return <CurrencyConverter />;
    case 'Finance':
      return <FinanceTools />;
    case 'Temperature':
      return <TemperatureConverter />;
    case 'BMI':
      return <BMICalculator />;
    default:
      return (
        <CalculatorView
          formula={formula}
          previousNumber={previousNumber}
          currentNumber={currentNumber}
          buildNumber={buildNumber}
          clean={clean}
          toggleSign={toggleSign}
          deleteLast={deleteLast}
          divideOperation={divideOperation}
          multiplyOperation={multiplyOperation}
          subtractOperation={subtractOperation}
          addOperation={addOperation}
          calculateResult={calculateResult}
          calculatePorcentage={calculatePorcentage}
        />
      );
  }
};

  return (
    <View style={[globalStyles.calculatorContainer, { backgroundColor: colors.background }]}>
      <TopBar
        selectedMode={selectedMode}
        onModePress={() => setShowModeModal(true)}
        onHistoryPress={() => setShowHistory(true)}
        colors={colors}
      />

      {renderContent()}

      <ModeModal
        visible={showModeModal}
        onClose={() => setShowModeModal(false)}
        selectedMode={selectedMode} 
        onSelectMode={(mode: string) => {
          setSelectedMode(mode);
          setShowModeModal(false);
        }}
      />

      <HistoryModal
        visible={showHistory}
        onClose={() => setShowHistory(false)}
        history={history}
        onClear={clearHistory}
      />
    </View>
  );
};

export default CalculatorApp;
