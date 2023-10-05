import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UseAuth";

const MentorLogin = () => {
	const { loginMentor } = useAuth();
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		username: "",
		password: ""
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { username, password } = formData;

		// Call the login function from the context
		const success = await loginMentor(username, password);

		if (success) {
			console.log('Login successful');
			navigate('/available')
		} else {
			// Handle login failure, display error message, etc.
			console.error('Login failed');
		}
	};

	return (
		<div className="w-full bg-gray-200 h-[100vh] flex flex-col justify-center py-10">
			<div className="mx-auto lg:w-1/2 w-11/12 bg-white text-black p-5 rounded-md">
				<div className="text-center pb-6">
					<h4 className="font-semibold text-3xl">Mentor Login</h4>
				</div>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="username" className="block text-lg font-semibold pb-2">
							Username
						</label>
						<input
							type="text"
							name="username"
							value={formData.username}
							onChange={handleInputChange}
							placeholder="Enter your username"
							className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]"
						/>
					</div>


					<div>
						<label htmlFor="password" className="block text-lg font-semibold pt-3 pb-2">
							Password
						</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							placeholder="Password"
							className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]"
						/>
					</div>

					<div className="text-center w-full pt-5">
						<button
							type="submit"
							className="text-semibold w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-300 hover:text-black  transition"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default MentorLogin;
