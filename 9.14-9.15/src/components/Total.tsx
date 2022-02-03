import React from 'react';
import { CoursePart } from '../types';

const Total = ({ parts }: { parts: CoursePart[] }) => {
	const total: number = parts.reduce((a, c) => a + c.exerciseCount, 0) 
	return (
		<h4 style={{marginTop: 40}}>Total exercises: {total}</h4>
	)
};

export default Total;