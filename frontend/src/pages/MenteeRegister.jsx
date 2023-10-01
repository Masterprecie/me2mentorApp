import { useState } from "react";

const defaultValues = {
	firstName: '',
	lastName: '',
	username: '',
	email: '',
	age: '',
	phoneNumber: '',
	password: '',
	confirmPassword: '',
	qualification: '',
	picture: null,
}


const MenteeRegister = () => {
	const [errors, setErrors] = useState({});
	const [passwordMatchError, setPasswordMatchError] = useState('');

	const [formData, setFormData] = useState(defaultValues);
	console.log(formData)
	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setErrors({
			...errors,
			[name]: '', //Clears the error for the field
		});
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setFormData({
			...formData,
			picture: file,
		});
	};

	const validateForm = () => {
		const newErrors = {};
		// Check if fields are empty
		for (const key in formData) {
			if (!formData[key]) {
				newErrors[key] = 'This field is required';
			}
		}

		// Check if passwords match
		if (formData.password !== formData.confirmPassword) {
			setPasswordMatchError("Passwords do not match");
			newErrors.confirmPassword = 'Passwords do not match';
		} else {
			setPasswordMatchError('');
		}

		setErrors(newErrors);

		// Return true if there are no errors, indicating a valid form
		return Object.keys(newErrors).length === 0;

	};


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			// If validation passes, create a FormData object to send as a POST request
			const formDataToSend = new FormData();
			for (const key in formData) {
				formDataToSend.append(key, formData[key]);
			}

			try {
				const response = await fetch('http://localhost:5000/api/register', {
					method: 'POST',
					body: formDataToSend,
				});

				if (response.status === 201) {
					console.log('Registration successful');
					const data = await response.json();
					console.log('Response data:', data);
					// Redirect to the home page (adjust the URL as needed)
					window.location.href = '/'; // You can use React Router here if applicable
				} else if (response.status === 400) {
					// Handle validation errors and display error messages to the user
					const errorData = await response.json();
					console.error('Registration failed:', errorData.message);
					// Update the state to display error messages to the user
					setErrors(errorData.errors);
				} else {
					// Handle other error cases (e.g., server errors) and show a generic error message
					console.error('Registration failed');
					// Display a generic error message to the user
				}
			} catch (error) {
				console.error('Error:', error);
				// Handle network errors or other exceptions and display an error message to the user

			}
		}
	};


	return (
		<div className="w-full bg-gray-200 h-full flex flex-col justify-center py-10">
			<div className="mx-auto md:w-1/2 bg-white text-black p-5 rounded-md ">
				<div className="text-center pb-6">
					<h1 className="font-bold text-3xl">Me<span className="text-yellow-400  font-bold text-4xl">2</span>Mentor</h1>
					<h4 className="font-semibold text-lg">Register as a Mentee</h4>
				</div>
				<form onSubmit={handleSubmit} className="md:grid grid-cols-2 gap-4">
					<div>
						<label htmlFor="firstName" className="block text-lg font-semibold"> First Name </label>
						<input
							type="text"
							name="firstName"
							value={formData.firstName}
							onChange={handleInputChange}
							placeholder="Enter your First Name" className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
						{errors.firstName && (
							<span className="text-red-600">{errors.firstName}</span>
						)}
					</div>

					<div>
						<label htmlFor="lastName" className="block text-lg font-semibold"> Last Name </label>
						<input
							type="text"
							name="lastName"
							value={formData.lastName}
							onChange={handleInputChange}
							placeholder="Enter your Last Name" className="border outline-0 p-2 rounded-md w-full  bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
						{errors.lastName && (
							<span className="text-red-600">{errors.lastName}</span>
						)}
					</div>
					<div>
						<label htmlFor="userName" className="block text-lg font-semibold"> Username </label>
						<input type="text"
							name="username"
							value={formData.username}
							onChange={handleInputChange}
							placeholder="Enter your username" className="border outline-0 p-2 rounded-md w-full  bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
						{errors.username && (
							<span className="text-red-600">{errors.username}</span>
						)}
					</div>

					<div>
						<label htmlFor="email" className="block text-lg font-semibold"> Email </label>
						<input type="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							placeholder="Email" className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
						{errors.email && (
							<span className="text-red-600">{errors.email}</span>
						)}
					</div>
					<div>
						<label htmlFor="age" className="block text-lg font-semibold"> Age </label>
						<input type="number"
							name="age"
							value={formData.age}
							onChange={handleInputChange}
							placeholder="Age" className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
						{errors.age && (
							<span className="text-red-600">{errors.age}</span>
						)}
					</div>
					<div>
						<label htmlFor="phoneNumber" className="block text-lg font-semibold"> Phone Number </label>
						<input type="number"
							name="phoneNumber"
							value={formData.phoneNumber}
							onChange={handleInputChange}
							placeholder="Phone Number" className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
						{errors.phoneNumber && (
							<span className="text-red-600">{errors.phoneNumber}</span>
						)}
					</div>
					<div>
						<label htmlFor="password" className="block text-lg font-semibold"> Password </label>
						<input type="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							placeholder="Password" className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
						{errors.password && (
							<span className="text-red-600">{errors.password}</span>
						)}
						{passwordMatchError && (
							<span className="text-red-600">{passwordMatchError}</span>
						)}
					</div>
					<div>
						<label htmlFor="password" className="block text-lg font-semibold"> Comfirm Password </label>
						<input type="password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleInputChange}
							placeholder="Comfirm password" className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
						{errors.confirmPassword && (
							<span className="text-red-600">{errors.confirmPassword}</span>
						)}

					</div>
					<div>
						<label htmlFor="qualification" className="block text-lg font-semibold"> Current Qualification </label>
						<select name="qualification" id=""
							value={formData.qualification}
							onChange={handleInputChange}
							className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]">

							<option value=""></option>
							<option value="Option 1">Option 1</option>
							<option value="Option 2">Option 2</option>
						</select>
					</div>

					<div>
						<label htmlFor="picture" className="block text-lg font-semibold"> Profile Picture </label>
						<input

							type="file"
							onChange={handleFileChange}
							placeholder="Comfirm password" className="border outline-0 p-[5px] rounded-md w-full  bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />

					</div>

					<div className="text-center w-full col-span-2 pt-3">
						<button type="submit" className="text-semibold bg-blue-600 text-white p-3 rounded-md hover:bg-blue-300 w-1/2 transition">Submit</button>
					</div>
				</form>
			</div>

		</div>

	)
}

export default MenteeRegister