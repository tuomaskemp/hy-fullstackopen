interface Result {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: number;
    ratingDescription: String;
}

interface exerciseInput {
    exerciseHours: Array<number>;
    target: number;
}

const parseArg = (days: Array<string>, target: String): exerciseInput => {
    if (days.length < 1) throw new Error('Not enough arguments');
    if (!target) throw new Error('Target not provided');

    if (!isNaN(Number(target)) && days.every(exercise => !isNaN(Number(exercise)))) {
        return {
            exerciseHours: days.map(Number),
            target: Number(target)
        } 
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const getRating = (target: number, average: number, success: boolean): number => {
    if (success) {
        return 3;
    } else {
        return (((target - average) / (target + average / 2)) * 100) < 15 ? 2 : 1;
    }
}

const getRatingDescription = (rating: number): String => {
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
}

const calculateExercises = (hoursPerEachDay: Array<number>, target: number): Result => {
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
    }
}

try {
    const { exerciseHours, target } = parseArg(['3', '0', '2', '4.5', '0', '3', '1'], '2');
    const output = calculateExercises(exerciseHours, target);
    console.log(output);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
