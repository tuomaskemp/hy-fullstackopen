import express from 'express';
import { getBmiCategory, calculateBmi } from './bmiCalculator';
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});