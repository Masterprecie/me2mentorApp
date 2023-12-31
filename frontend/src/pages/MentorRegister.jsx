import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const defaultValues = {
	first_name: '',
	last_name: '',
	username: '',
	email: '',
	gender: '',
	age: null,
	password: '',
	password_hash: '',
	expertise: '',
	experience: '',
	profile_picture: '',
	brief_summary: ''
}

const MentorRegister = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState(defaultValues);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const newValue = name === 'age' || name === 'experience' ? parseInt(value, 10) : name === 'brief_summary' ? value.slice(0, 255) : value;
		setFormData({
			...formData,
			[name]: newValue,
		});
	};


	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setFormData({
			...formData,
			picture: file,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:5000/api/mentors/mentor_register', formData);

			if (response.status === 200) {
				const data = response.data;
				console.log('Registration successful');
				console.log('Response data:', data);
				alert('Registration Successfull')
				navigate('/mentor-login')
			} else if (response.status === 400) {
				const errorData = response.data;
				alert('Registration failed')
				console.error('Registration failed:', errorData.message);
			} else {
				alert('Registration failed')
				console.error('Registration failed');
			}
		} catch (error) {
			console.error('Error:', error);

		}
	};

	return (
		<div className="w-full bg-gray-200 h-full flex flex-col justify-center py-10">
			<div className="mx-auto md:w-1/2 bg-white text-black p-5 rounded-md ">
				<div className="text-center pb-6">
					<h1 className="font-bold text-3xl">Me<span className="text-yellow-400  font-bold text-4xl">2</span>Mentor</h1>
					<h4 className="font-semibold text-lg">Register as a Mentor</h4>
				</div>
				<form onSubmit={handleSubmit} className="md:grid grid-cols-2 gap-4">
					<div>
						<label htmlFor="firstName" className="block text-lg font-semibold"> First Name </label>
						<input
							type="text"
							name="first_name"
							value={formData.first_name}
							onChange={handleInputChange}
							placeholder="Enter your First Name"
							className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]"
							required
						/>
					</div>

					<div>
						<label htmlFor="lastName" className="block text-lg font-semibold"> Last Name </label>
						<input
							type="text"
							name="last_name"
							value={formData.last_name}
							onChange={handleInputChange}
							placeholder="Enter your Last Name"
							className="border outline-0 p-2 rounded-md w-full  bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]"
							required
						/>
					</div>
					<div>
						<label htmlFor="userName" className="block text-lg font-semibold"> Username </label>
						<input type="text"
							name="username"
							value={formData.username}
							onChange={handleInputChange}
							placeholder="Enter your username"
							className="border outline-0 p-2 rounded-md w-full  bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]"
							required
						/>
					</div>

					<div>
						<label htmlFor="email" className="block text-lg font-semibold"> Gender </label>
						<select name="gender"
							value={formData.gender}
							onChange={handleInputChange}
							className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]"
							required
						>
							<option value="">Select a Gender</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>

					</div>
					<div>
						<label htmlFor="email" className="block text-lg font-semibold"> Email </label>
						<input type="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							placeholder="Email"
							className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]"
							required
						/>
					</div>

					<div>
						<label htmlFor="age" className="block text-lg font-semibold"> Age </label>
						<input type="number"
							name="age"
							value={formData.age}
							onChange={handleInputChange}
							placeholder="Age"
							className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]"
							required
						/>
					</div>

					<div>
						<label htmlFor="password" className="block text-lg font-semibold"> Password </label>
						<input type="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							placeholder="Password"
							className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]"
							required
						/>
					</div>
					<div>
						<label htmlFor="password" className="block text-lg font-semibold"> Confirm Password </label>
						<input type="password"
							name="password_hash"
							value={formData.password_hash}
							onChange={handleInputChange}
							placeholder="Confirm password"
							className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]"
							required
						/>
					</div>

					<div>
						<label htmlFor="experience" className="block text-lg font-semibold"> Experience </label>
						<input type="number"
							name="experience"
							value={formData.experience}
							onChange={handleInputChange}
							placeholder="Years of Experience"
							className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]"
							required
						/>
					</div>

					<div>
						<label htmlFor="expertise" className="block text-lg font-semibold"> Expertise </label>
						<input type="text"
							name="expertise"
							value={formData.expertise}
							onChange={handleInputChange}
							placeholder="Area of Specialization"
							className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]"
							required
						/>
					</div>

					<div className="col-span-2">
						<label htmlFor="summary" className="block text-lg font-semibold"> Brief Summary </label>
						<textarea
							name="brief_summary"
							value={formData.brief_summary}
							placeholder="Brief Summary of yourself"
							onChange={handleInputChange}
							cols="30"
							rows="10"
							className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]"
							required
						></textarea>
					</div>


					<div>
						<label htmlFor="picture" className="block text-lg font-semibold"> Profile Picture </label>
						<input
							type="file"
							onChange={handleFileChange}
							className="border outline-0 p-[5px] rounded-md w-full  bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
					</div>

					<div className="text-center w-full col-span-2 pt-3">
						<button type="submit" className="text-semibold bg-blue-600 text-white p-3 rounded-md hover:bg-blue-300 w-1/2 transition">Submit</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default MentorRegister;
