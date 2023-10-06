
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

const MentorDetails = () => {
	const { id } = useParams();
	const [mentor, setMentor] = useState(null); // Initialize mentor as null
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

		const bookingData = {
			date: selectedDate,
			...bookingDetails,
		};

		axios.post("http://localhost:5000/api/bookings", bookingData)
			.then((response) => {
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

	useEffect(() => {
		// Fetch mentor details from the API based on the ID when the component mounts
		const fetchMentorDetails = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/api/admins/mentor/${id}`);
				const data = response.data;
				setMentor(data); // Set the fetched mentor in the state
			} catch (error) {
				console.error('Error fetching mentor details:', error);
			}
		};

		fetchMentorDetails();
	}, [id]);

	return (
		<div className="px-5 py-8">
			<div className="text-center text-3xl font-bold pb-8">
				<h1>Mentor Details</h1>
			</div>
			{mentor ? (
				<div>

					<div className="md:grid gap-5 grid-cols-3 border-2 shadow-md p-2">
						<div>
							<img src={mentor.profile_picture} alt={mentor.first_name} className="w-full rounded-md" />
						</div>
						<div className="space-y-5 pt-4">
							<p className="font-bold text-2xl">First Name: <span className="font-semibold">{mentor.first_name}</span></p>
							<p className="font-bold text-2xl">Last Name: <span className="font-semibold">{mentor.last_name}</span></p>
							<p className="font-bold text-2xl">Expertise: <span className="font-semibold">{mentor.expertise}</span></p>
							<p className="font-bold text-2xl">Experience: <span className="font-semibold">{mentor.experience}</span> year(s)</p>
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
						<p>{mentor.brief_summary}</p>
					</div>
				</div>
			) : (
				<p>Mentor not found</p>
			)}
		</div>
	);
}


export default MentorDetails;
