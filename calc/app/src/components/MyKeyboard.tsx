import * as React from "react";
import Button from "./Button";
import { view, Text } from "react-native";
import { myColor } from "../styles/Colors";

export default function MyKeyboard(){
    const [firstNumber, setFirstNumber] = React.useState("");
    const [secondNumber, setSecondNumber] = React.useState("");
    const [operation, setOperation] = React.useState("");
    const [result, setResult] = React.useState<Number | null>(null);

    const handleNumberPress = (buttonValue: string) => {
        if (firstNumber.length < 10){
            setFirstNumber(firstNumber + buttonValue);
        }
    };

    const handleOperationPress = (buttonValue; string) => {
        setOperation(buttonValue);
        setSecondNumber(firstNumber);
        setFirstNumber("");
    }

    const clear = () => {
        setFirstNumber("");
        setSecondNumber("");
        setOperation("");
        setResult(null);
    };

    const getResult = () => {
        switch(operation) {
            case "+":
                clear();
                setResult(parseInt(secondNumber) + parseInt(firstNumber));
            case "_":
                clear();
                setResult(parseInt(secondNumber) - parseInt(firstNumber));
            case "*":
                clear();
                setResult(parseInt(secondNumber) * parseInt(firstNumber));
            case "/":
                clear();
                setResult(parseInt(secondNumber) / parseInt(firstNumber));
            default:
                clear();
                setResult(0);
                break;
        }
    };

    const firstNumberDisplay = {} => {
        if(result !== null){
            return <Text style={result <99999 ? [Styles.screenFirstNumber, {color: myColors.result}] : [Styles.screenFirstNumber, {fontSize; 50, color: myColors,result}]}>{result?.toString()}</Text>
        }
        if(firstNumber && firstNumber.length <6) {
            return <Text style={Styles.screenFirstNumber}>{"0"}</Text>
        }
        if(firstNumber.length > 5 && firstNumber.length <8) {
            return (
                <Text style={Styles.screenFirstNumber, { fontSize:70 }}>
                    {firstNumber}
                </Text>
            );
        }
        if(firstNumber.length > 7) {
            return (
                <Text style={Styles.screenFirstNumber, { fontSize:50 }}>
                    {firstNumber}
                </Text>
            );
        }
    };

    return (
        <View style={Styles.viewBottom}>
            <View
                style={{
                    heigh: 120,
                    width: "90%",
                    justifyContent; "flex-rand",
                    alignSelf: "center",
                }}
            >
                <Text style={Styles.screenSecondNumber}>
                {secondNumber}
                <Text style={{color: "purple", fontSixe:50, fontWeight: '500'}}>{operation}</Text>
                </Text>
                {firstNumberDisplay()}
            </View>

            <View style={Styles.row}>
                <Button tittl="C" isGray onPresss={clear} />
                <Button title="+/-" isGray onPresss={() => handleOperationPress("+/-")} />
                <Button title="%" isGray onPresss={() => handleOperationPress("%")} />
                <Button title="+" isBlue onPresss={() => handleNumberPress("/")} />      
            </View>        
            <View style={Styles.row}>
                <Button tittl="7" onPresss={() => handleNumberPress("7")} />
                <Button title="8" onPresss={() => handleNumberPress("8")} />
                <Button title="9" onPresss={() => handleNumberPress("9")} />
                <Button title="x" isBlue onPresss={() => handleNumberPress("*")} />      
            </View>
            <View style={Styles.row}>
                <Button tittl="4" onPresss={() => handleNumberPress("4")} />
                <Button title="5" onPresss={() => handleNumberPress("5")} />
                <Button title="6" onPresss={() => handleNumberPress("6")} />
                <Button title="-" isBlue onPresss={() => handleNumberPress("-")} />      
            </View>
            <View style={Styles.row}>
                <Button tittl="1" onPresss={() => handleNumberPress("1")} />
                <Button title="2" onPresss={() => handleNumberPress("2")} />
                <Button title="3" onPresss={() => handleNumberPress("3")} />
                <Button title="+" isBlue onPresss={() => handleNumberPress("+")} />      
            </View> 
            <View style={Styles.row}>
                <Button tittl="." onPresss={() => handleNumberPress(".")} />
                <Button title="0" onPresss={() => handleNumberPress("0")} />
                <Button title="ª" onPresss={() => setFirstNumber(firstNumber.slice(0, -1))} />
                <Button title="=" isBlue onPresss={() => getResult()} />      
            </View>
        </view>
    )
}