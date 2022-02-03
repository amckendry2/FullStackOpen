import { assert } from 'console';
import React from 'react';
import { CoursePart } from '../types'
import { assertNever } from '../utils'

const Part = ({ part }: { part: CoursePart }) => {
	switch (part.type) {
		case "normal":
			return (
				<div>
					<h3>{part.name} [parts: {part.exerciseCount}]</h3>
					<p style={{ fontStyle: "italic" }}>
						{part.description}
					</p>
				</div>
			);
		case "groupProject":
			return (
				<div>
					<h3>Project: {part.name} [parts: {part.exerciseCount}]</h3>
					<p>
						exercises: {part.groupProjectCount}
					</p>
				</div>
			);
		case "submission":
			return (
				<div>
					<h3>Submission: {part.name} [parts: {part.exerciseCount}]</h3>
					<p>
						<a href={part.exerciseSubmissionLink}>submission link</a>
					</p>
				</div>
			);
		default:
			return assertNever(part);
	}
};

export default Part;