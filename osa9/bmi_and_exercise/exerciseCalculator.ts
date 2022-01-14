interface Result {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
}

interface exerciseInput {
    exerciseHours: Array<number>;
    target: number;
}

const parseArg = (args: Array<string>): exerciseInput => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const days = args.slice(3);
    const target = args[2];

    if (!isNaN(Number(target)) && days.every(exercise => !isNaN(Number(exercise)))) {
        return {
            exerciseHours: days.map(Number),
            target: Number(target)
        }; 
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

const getRating = (target: number, average: number, success: boolean): number => {
    if (success) {
        return 3;
    } else {
        return (((target - average) / (target + average / 2)) * 100) < 15 ? 2 : 1;
    }
};

const getRatingDescription = (rating: number): string => {
    switch(rating) {
        case 3:
            return "Well done!";
        case 2:
            return "Good effort!";
        case 1:
            return "Not bad but needs more training!";
        default:
            throw new Error('Invalid rating.');
    }
};

export const calculateExercises = (hoursPerEachDay: Array<number>, target: number): Result => {
    const periodLength = hoursPerEachDay.length;
    const trainingDays = hoursPerEachDay.filter(hours => hours > 0).length;
    const average = hoursPerEachDay.reduce((x, y) => x+y, 0)/periodLength;
    const success = average >= target ? true : false;
    const rating = getRating(target, average, success);
    const ratingDescription = getRatingDescription(rating);

    return {
        periodLength,
        trainingDays,
        target,
        average,
        success,
        rating,
        ratingDescription
    };
};

try {
    const { exerciseHours, target } = parseArg(process.argv);
    const output = calculateExercises(exerciseHours, target);
    console.log(output);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
