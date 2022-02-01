import express from 'express';
import service from '../services/diagnosesService';

const diagnosesRoute = express.Router();

diagnosesRoute.get('/', (_req, res) => {
	res.send(service.getAll());
});

export default diagnosesRoute;
