interface BodyValues {
    weight: number;
    height: number;
}

type bmiCategory = 
    'Underweight (Severe thinness)' | 
    'Underweight (Moderate thinness)' | 
    'Underweight (Mild thinness)' |
    'Normal (healthy weight)' |
    'Overweight (Pre-obese)' |
    'Obese (Class I)' |
    'Obese (Class II)' |
    'Obese (Class III)';

const parseArgs = (args: Array<string>): BodyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            weight: Number(args[2]),
            height: Number(args[3])
        } 
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const isInRange = (min: number, max: number, num: number): boolean => 
    num >= min && num <= max;

export const calculateBmi = (weight: number, height: number): number => {
    const bmi = (weight / height / height) * 10000;
    return bmi;
}

export const getBmiCategory = (bmi: number): bmiCategory => {
    if(bmi < 16.0) {
        return 'Underweight (Severe thinness)';
    } else if (isInRange(16.0, 16.9, bmi)) {
        return 'Underweight (Moderate thinness)';
    } else if (isInRange(17.0, 18.4, bmi)) {
        return 'Underweight (Mild thinness)';
    } else if (isInRange(18.5, 24.9, bmi)) {
        return 'Normal (healthy weight)';
    } else if (isInRange(25.0, 29.9, bmi)) {
        return 'Overweight (Pre-obese)';
    } else if (isInRange(30.0, 34.9, bmi)) {
        return 'Obese (Class I)';
    } else if (isInRange(35.0, 39.9, bmi)) {
        return 'Obese (Class II)';
    } else {
        return 'Obese (Class III)';
    }
}

try {
    const { weight, height } = parseArgs(process.argv);
    const bmi = calculateBmi(height, weight);
    console.log(getBmiCategory(bmi));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}