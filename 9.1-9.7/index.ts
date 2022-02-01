import express from 'express';
import bmiCalculator from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	if (!req.query.height || !req.query.weight) {
		return res.status(400).send({ error: 'missing height or weight query' });
	}
	if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
		return res.status(400).send({ error: 'received non-number query' });
	}
	const weight = Number(req.query.weight);
	const height = Number(req.query.height);
	const bmi: string = bmiCalculator(height, weight);
	return res.send({ weight, height, bmi });
});

interface exerciseParams {
	daily_exercises: Array<number>,
	target: number
}

app.post('/exercises', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const body: exerciseParams = req.body;
	if(!body.daily_exercises || !body.target){
		return res.status(400).send({ error: 'parameters missing' });
	}
	if(!Array.isArray(body.daily_exercises) 
	|| body.daily_exercises.some(isNaN)
	|| isNaN(body.target)){
		return res.status(400).send({ error: 'malformed parameters' });
	}
	return res.send(exerciseCalculator(body.daily_exercises, body.target));
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});