const calculateBmi = (height: number, weight: number) : string => {
	const bmi: number =  weight / ((height / 100) ** 2);
	return (
		bmi < 18.5 ? 'Underweight' :
		bmi <= 24.9 ? 'Healthy' :
		bmi <= 29.9 ? 'Overweight' :
		'Obese' 
	);
};

export default calculateBmi;