import express from 'express'; 
import cors from 'cors';
import diagnosesRoute from './routes/diagnosesRoute';
import patientsRoute from './routes/patientsRoute';

const app = express();
app.use(cors({ 
	
}));
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
	console.log('server pinged');
	res.send('pong');
});

app.use('/api/diagnoses/', diagnosesRoute);
app.use('/api/patients/', patientsRoute);

app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});