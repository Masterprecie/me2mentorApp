import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { topMentors } from "../utils/data";

const MentorDetails = () => {
	const { id } = useParams();
	const mentor = topMentors.find((mentor) => mentor.id === parseInt(id, 10));

	const [isBookingFormVisible, setIsBookingFormVisible] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const [bookingDetails, setBookingDetails] = useState({
		name: "",
		email: "",
		message: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setBookingDetails({
			...bookingDetails,
			[name]: value,
		});
	};

	const handleBookingSubmit = (e) => {
		e.preventDefault();

		// Prepare the booking data to send to your backend API
		const bookingData = {
			date: selectedDate,
			...bookingDetails,
		};

		// Send a POST request to your backend API to create the booking
		// Replace 'your-api-endpoint' with the actual API endpoint
		axios.post("http://localhost:5000/api/bookings", bookingData)
			.then((response) => {
				// Handle the response from your API
				// You can display a success message to the user
				console.log("Booking successful:", response.data);
				// Optionally, you can reset the form and hide it
				setSelectedDate(null);
				setBookingDetails({
					name: "",
					email: "",
					message: "",
				});
				setIsBookingFormVisible(false);
			})
			.catch((error) => {
				// Handle errors, e.g., display an error message to the user
				console.error("Booking failed:", error);
			});
	};

	return (
		<div className="px-5 py-8">
			<div className="text-center text-3xl font-bold pb-8">
				<h1>Mentor Details</h1>
			</div>
			{mentor ? (
				<div>
					<div className="md:grid gap-5 grid-cols-3 border-2 shadow-md p-2">
						<div>
							<img src={mentor.url} alt={mentor.name} className="w-full rounded-md" />
						</div>
						<div className="space-y-5 pt-4">
							<p className="font-bold text-2xl">Name: <span className="font-semibold">{mentor.name}</span></p>
							<p className="font-bold text-2xl">Country: <span className="font-semibold">{mentor.country}</span></p>
							<p className="font-bold text-2xl">Expertise: <span className="font-semibold">{mentor.field}</span></p>
							<p className="font-bold text-2xl">Category: <span className="font-semibold">{mentor.category}</span></p>
							<p className="font-bold text-2xl">Experience: <span className="font-semibold">{mentor.experience}</span></p>
						</div>
						<div className="md:border-l-2 border-t-2 mt-5 md:mt-0 p-2">
							<div className="text-center">
								<h4 className="font-bold text-2xl pb-7">Book a Session</h4>
								{!isBookingFormVisible ? (
									<button
										onClick={() => setIsBookingFormVisible(true)}
										className="p-2 px-6 hover:bg-blue-600 transition-all font-semibold text-lg bg-blue-900 text-white rounded-md"
									>
										Book a Session
									</button>
								) : (
									<div>
										<form onSubmit={handleBookingSubmit}>
											<div className="mb-4">
												<label htmlFor="sessionDate" className="block font-semibold text-lg">
													Select Date and Time:
												</label>
												{/* Implement a date and time picker here */}
												<input
													type="datetime-local"
													id="sessionDate"
													name="sessionDate"
													value={selectedDate}
													onChange={(e) => setSelectedDate(e.target.value)}
													className="border outline-0 p-2 rounded-md w-full"
													required
												/>
											</div>
											<div className="mb-4">
												<label htmlFor="name" className="block font-semibold text-lg">
													Your Name:
												</label>
												<input
													type="text"
													id="name"
													name="name"
													value={bookingDetails.name}
													onChange={handleInputChange}
													className="border outline-0 p-2 rounded-md w-full"
													required
												/>
											</div>
											<div className="mb-4">
												<label htmlFor="email" className="block font-semibold text-lg">
													Your Email:
												</label>
												<input
													type="email"
													id="email"
													name="email"
													value={bookingDetails.email}
													onChange={handleInputChange}
													className="border outline-0 p-2 rounded-md w-full"
													required
												/>
											</div>
											<div className="mb-4">
												<label htmlFor="message" className="block font-semibold text-lg">
													Message (Optional):
												</label>
												<textarea
													id="message"
													name="message"
													value={bookingDetails.message}
													onChange={handleInputChange}
													className="border outline-0 p-2 rounded-md w-full"
													rows="4"
												/>
											</div>
											<div>
												<button
													type="submit"
													className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
												>
													Confirm Booking
												</button>
											</div>
										</form>
									</div>
								)}
							</div>
						</div>
					</div>

					<div className="md:w-1/2 pt-5">
						<h4 className="font-bold">Brief Overview</h4>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos dolore laboriosam impedit voluptatum incidunt, modi repellat, inventore alias dignissimos corrupti, neque ducimus minus animi reiciendis. Expedita corrupti maiores dolor id.</p>
					</div>
				</div>
			) : (
				<p>Mentor not found</p>
			)}
		</div>
	);
}

export default MentorDetails;
