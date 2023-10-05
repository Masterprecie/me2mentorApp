import { useState } from 'react';
import axios from 'axios';

const ContactUS = () => {
	const [formData, setFormData] = useState({
		full_name: '',
		email: '',
		phone_number: '',
		message: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;


		const parsedValue = name === 'phone_number' ? parseInt(value, 10) : value;

		setFormData({
			...formData,
			[name]: parsedValue,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post('http://localhost:5000/api/main/contactus', formData);

			if (response.status === 200) {
				const data = response.data;
				console.log('Response', data);
				alert('Form submitted successfully!');
				setFormData({
					full_name: '',
					email: '',
					phone_number: '',
					message: '',
				});
			} else {
				// Handle other response statuses or errors
				console.log('Form submission failed.');
			}
		} catch (error) {
			// Handle any Axios errors
			console.error('Form submission error:', error);
		}
	};

	return (
		<div className="bg-contact bg-cover relative text-white py-16 px-5">
			<div className="absolute inset-0 bg-blue-900 opacity-80 z-20"></div>
			<div className="text-center z-20 text-white relative text-4xl font-bold pb-5 ">
				<p>Contact Us</p>
			</div>
			<div className="relative z-20 md:flex items-center gap-5 ">
				<div>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.62283124574!2d3.28395955!3d6.548055099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1694735036411!5m2!1sen!2sng"
						allowFullScreen=""
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						className="rounded-md w-full md:w-[350px] lg:w-[600px] h-[450px]"
					></iframe>
				</div>
				<div className="w-full pt-5 md:pt-0">
					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor="name" className="block text-base font-semibold">
								Full Name
							</label>
							<input
								type="text"
								placeholder="Full Name"
								className="text-black border outline-0 p-2 rounded-md w-full  bg-[#f5f8fa]"
								name="full_name"
								value={formData.full_name}
								onChange={handleChange}
								required
							/>
						</div>
						<div>
							<label htmlFor="email" className="block text-base font-semibold">
								Email
							</label>
							<input
								type="email"
								placeholder="Email"
								className="text-black border outline-0 p-2 rounded-md w-full  bg-[#f5f8fa]"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>
						<div>
							<label htmlFor="number" className=" block text-base font-semibold">
								Phone Number
							</label>
							<input
								type="number"
								placeholder="Phone Number"
								className="text-black border outline-0 p-2 rounded-md w-full  bg-[#f5f8fa]"
								name="phone_number"
								value={formData.phone_number}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="">
							<label htmlFor="message" className="block text-base font-semibold">
								Message
							</label>
							<textarea
								name="message"
								cols="10"
								rows="7"
								placeholder="Message"
								className="text-black border outline-0 p-2 rounded-md w-full  bg-[#f5f8fa]"
								value={formData.message}
								onChange={handleChange}
								required
							></textarea>
						</div>
						<div>
							<button
								type="submit"
								className="bg-yellow-400 hover:bg-yellow-200 p-3 text-black font-bold w-full rounded-md shadow-lg"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ContactUS;
