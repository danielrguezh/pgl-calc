import { View, Text } from 'react-native';
import { globalStyles } from '@/styles/global-styles';

const CalculatorApp = () => {
  return (
    <View style={globalStyles.calculatorContainer}>
      <Text style={globalStyles.mainResult}>50 x 50</Text>
      <Text style={{fontSize: 40, fontFamily: 'SpaceMono', color: 'white'}}>
        250
      </Text>
    </View>
  );
};

export default CalculatorApp;
