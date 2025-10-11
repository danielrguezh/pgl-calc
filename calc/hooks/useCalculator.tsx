import { use, useEffect, useRef, useState } from "react"

enum Operator {
    add = '+',
    subtract = '-',
    multiply = '×',
    divide = '÷',
}

export const useCalculator = () => {
    const [formula, setFormula] = useState('0');
    const [currentNumber, setCurrentNumber] = useState('0');
    const [previousNumber, setPreviousNumber] = useState('0');
    const lastOperation = useRef<Operator>(undefined);

    useEffect(() => {
        if (lastOperation.current) {
            const firstFormulaPart = formula.split(' ').at(0);
            setFormula(`${firstFormulaPart} ${lastOperation.current} ${currentNumber}`);
        } else {
            setFormula(currentNumber);
        }
    }, [currentNumber]);

    useEffect(() => {
        const subResult = calculateSubResult();
        setPreviousNumber(`${subResult}`);
    }, [formula]);

    const clean = () => {
        setCurrentNumber('0');
        setPreviousNumber('0');
        setFormula('0');
        lastOperation.current = undefined;
    };

    const toggleSign = () => {
        if (currentNumber.includes('-')) {
            return setCurrentNumber(currentNumber.replace('-', ''));
        }
        setCurrentNumber('-' + currentNumber);
    }

    const deleteLast = () => {
        let currentSign = '';
        let temporalNumber = currentNumber;

        if (currentNumber.includes('-')) {
            currentSign = '-';
            temporalNumber = currentNumber.replace('-', '');
        }

        if (temporalNumber.length > 1) {
            return setCurrentNumber(currentSign + temporalNumber.slice(0,-1));
        }

        setCurrentNumber('0');
    };

    const setLastNumber = () => {
        calculateResult();
        if (currentNumber.endsWith('.')) {
            setPreviousNumber(currentNumber.slice(0,-1));
        }
        setPreviousNumber(currentNumber);
        setCurrentNumber('0');
    }

    const divideOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.divide;
    }

    const multiplyOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.multiply;
    }

    const subtractOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.subtract;
    }

    const addOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.add;
    }

    const calculateSubResult = () => {
        const [firstValue, operation, secondValue] = formula.split(' ');
        const number1 = Number(firstValue);
        const number2 = Number(secondValue);
        if (isNaN(number2)) return number1;

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
    }

    const calculateResult = () => {
        const result = calculateSubResult();
        setFormula(`${result}`);
        lastOperation.current = undefined;
        setPreviousNumber('0');
    }

    const buildNumber = (numberText: string) => {
        if (currentNumber.includes('.') && numberText === '.') return;
        if (currentNumber.startsWith('0') || currentNumber.startsWith('-0')) {
            if (numberText === '.') {
                return setCurrentNumber(currentNumber + numberText);
            }
            if (numberText === '0' && currentNumber.includes('.')) {
                return setCurrentNumber(currentNumber + numberText);
            }
            if (numberText !== '0' && !currentNumber.includes('.')) {
                return setCurrentNumber(numberText);
            }
            if (numberText === '0' && !currentNumber.includes('.')) {
                return;
            }
        }
        setCurrentNumber(currentNumber + numberText);
    };

    return {
        formula,
        currentNumber,
        previousNumber,
        buildNumber,
        clean,
        toggleSign,
        deleteLast,
        divideOperation,
        multiplyOperation,
        subtractOperation,
        addOperation,
        calculateResult,
    }
};