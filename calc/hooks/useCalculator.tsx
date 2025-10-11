import { useEffect, useRef, useState } from "react"

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
        setFormula(currentNumber);
    }, [currentNumber]);

    const clean = () => {
        setCurrentNumber('0');
        setPreviousNumber('0');
        setFormula('0');
        lastOperation.current = undefined;
    }

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
    }
};