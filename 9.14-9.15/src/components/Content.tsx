import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ parts }: { parts: CoursePart[] }) => {
	const courseParts = parts.map(p => 
		<Part key={p.name} part={p}/>
	)
	return (
		<>
			{courseParts}
		</>
	)
};

export default Content;