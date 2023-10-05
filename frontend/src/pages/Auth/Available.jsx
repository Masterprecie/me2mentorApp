import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Available = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		start_time: '',
		end_time: '',
		agreed_day: '',
	});

	const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData)
		setIsSubmitting(true);
		try {
			const response = await axios.post('http://localhost:5000/api/bookings/addTimeSlot', formData);

			if (response.status === 200) {
				const data = response.data;
				console.log('Response data:', data);
				console.log('Registration successful');
				alert('Registration Successfull')
				navigate('/')
				setFormData({
					start_time: '',
					end_time: '',
					agreed_day: '',
				});
			} else if (response.status === 400) {
				const errorData = response.data;
				console.log('Registration failed')
				console.error('Registration failed:', errorData.message);
			} else {
				console.log('Registration failed')
				console.error('Registration failed');
			}
		} catch (error) {
			console.error('Error:', error);

		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="w-full max-w-md mx-auto">
			<h2 className="text-2xl font-semibold mb-4 text-center">Set Availability</h2>
			<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div className="mb-4">
					<label htmlFor="startTime" className="block text-gray-700 text-sm font-bold mb-2">
						Start Time
					</label>
					<input
						type="text"
						name="start_time"
						value={formData.start_time}
						onChange={handleInputChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="endTime" className="block text-gray-700 text-sm font-bold mb-2">
						End Time
					</label>
					<input
						type="text"
						name="end_time"
						value={formData.end_time}
						onChange={handleInputChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="selectedDay" className="block text-gray-700 text-sm font-bold mb-2">
						Select a Day
					</label>
					<select
						name="agreed_day"
						value={formData.agreed_day}
						onChange={handleInputChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					>
						<option value="">Select a Day</option>
						<option value="Monday">Monday</option>
						<option value="Tuesday">Tuesday</option>
						<option value="Wednesday">Wednesday</option>
						<option value="Thursday">Thursday</option>
						<option value="Friday">Friday</option>
					</select>
				</div>
				<div className="text-center">
					<button
						type="submit"
						className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''
							}`}
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Submitting...' : 'Submit'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Available;
