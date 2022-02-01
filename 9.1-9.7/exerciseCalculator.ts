// interface exerciseArgs {
// 	hours: Array<number>,
// 	target: number
// }


// const parseArgs = (args: Array<string>): exerciseArgs => {
// 	if (args.length < 2) throw new Error('missing arguments');
// 	args.forEach(a => {
// 		if(isNaN(Number(a))) throw new Error('received non-number argument');
// 	});
// 	return { 
// 		target: Number(args[0]), 
// 		hours: args.slice(1).map(a => Number(a))
// 	};
// };

interface exerciseStats {
	periodLength: number,
	trainingDays: number,
	target: number,
	average: number,
	success: boolean,
	rating: number,
	ratingDescription: string
}

const calculateExercises = (hours: Array<number>, target: number) : exerciseStats => {
	const average: number = hours.reduce((a, c) => a + c) / hours.length;
	const success: boolean = average >= target;
	const metHalf: boolean = average >= target / 2.0;
	const rating: number = 1 + (metHalf ? 1 : 0) + (success ? 1 : 0);
	const criteria: string = 
		success ? 'met target' : 
		metHalf ? 'met half of target' : 
		'less than half of target';
	return {
		periodLength: hours.length,
		trainingDays: hours.filter(h => h !== 0).length,
		target,
		average,
		success,
		rating,
		ratingDescription: `Avg exercise time: ${average}
		Target exercise time: ${target}
		rating: ${rating} (${criteria})`
	};
};

// try {
// 	const { hours, target } = parseArgs(process.argv.slice(2));
// 	console.log(calculateExercises(hours, target));
// } catch (err: unknown) {
// 	let error = 'Error! ';
// 	if (err instanceof Error) {
// 		error += err.message;
// 	}
// 	console.log(error);
// }

export default calculateExercises;