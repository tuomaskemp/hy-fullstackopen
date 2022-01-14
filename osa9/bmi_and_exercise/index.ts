import express from 'express';
import { getBmiCategory, calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { weight, height } = req.query;
    if (!isNaN(Number(weight)) && !isNaN(Number(height))) {
        const bmi = calculateBmi(Number(weight), Number(height));
        const bmiCategory = getBmiCategory(bmi);
        return res.status(200).json({
            weight: Number(weight),
            height: Number(height),
            bmi: bmiCategory
        });
    } else {
        return res.status(400).json({
            error: 'malformatted parameters'
        });
    }
});

app.post('/exercises', (req, res) => {
    /* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access */
    const { daily_exercises, target } = req.body;
    if ((!daily_exercises || daily_exercises.length < 2) || daily_exercises.constructor !== Array) {
        return res.status(400).json({
            error: 'parameters missing'
        });
    }
    if (!target) {
        return res.status(400).json({
            error: 'parameters missing'
        });
    }

    const containsNumbers = daily_exercises.every((exercise: number) => !isNaN(Number(exercise)));
    const targetNum = Number(target);
    const exercises = daily_exercises.map(Number);
    
    if (!isNaN(Number(targetNum)) && containsNumbers) {
        const out = calculateExercises(exercises, targetNum);
        return res.status(200).json(out);
    } else {
        return res.status(400).json({ 
            error: 'malformatted parameters'
        });
    }
    /* eslint-enable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access */
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});