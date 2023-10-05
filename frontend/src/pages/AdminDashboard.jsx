import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
	const [mentees, setMentees] = useState([]);
	const [mentorAvailability, setMentorAvailability] = useState([]);
	const [mentors, setMentors] = useState([]);

	useEffect(() => {
		// Fetch mentees from API
		axios.get('http://localhost:5000/api/admins/all_mentees').then((response) => {
			setMentees(response.data);
		});

		// Fetch mentor availability from API
		axios.get('http://localhost:5000/api/bookings/getTimeSlots').then((response) => {
			setMentorAvailability(response.data);
		});

		// Fetch all mentors
		axios.get('http://localhost:5000/api/mentors/all_mentors').then((response) => {
			setMentors(response.data);
		});
	}, []);
	const mentorAvailabilityDict = {};
	mentorAvailability.forEach((availability) => {
		mentorAvailabilityDict[availability.mentor_id] = availability;
	});
	return (
		<div className="bg-gray-100 min-h-screen p-8">
			<div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
				<h1 className="text-3xl font-semibold mb-4 text-center">Admin Dashboard</h1>
				<div className='flex justify-between'>
					<div className="mb-8">
						<h2 className="text-xl font-semibold mb-2">All Mentees</h2>
						<div className="">
							{mentees.map((mentee) => (
								<ul key={mentee.id} className='border p-3 mb-3 shadow-lg '>
									<li>First Name: <span>{mentee.first_name}</span></li>
									<li>Last Name: <span>{mentee.last_name}</span></li>
									<li>Interest: <span>{mentee.interest}</span></li>
								</ul>
							))}
						</div>
					</div>
					<div>
						<h2 className="text-xl font-semibold mb-2">Mentor Availability</h2>
						<div className="">
							{mentorAvailability.map((mentor) => (
								<ul key={mentor.id} className='border p-3 mb-3 shadow-lg'>
									<li> Available day : <span>{mentor.day}</span></li>
									<li>From: <span>{mentor.start_time}</span></li>
									<li>To: <span>{mentor.end_time}</span></li>
								</ul>
							))}
						</div>
					</div>
					<div>
						<h2 className="text-xl font-semibold mb-2">All Mentors</h2>
						<div className="">
							{mentors.map((mentor) => (
								<ul key={mentor.id} className='border p-3 mb-3 shadow-lg'>
									<li>First Name: <span>{mentor.first_name}</span> </li>
									<li>Last Name: <span>{mentor.last_name}</span> </li>
									<li> Expertise: <span>{mentor.expertise}</span> </li>
									<li> Experience: <span>{mentor.experience}</span> year(s) </li>
									{mentorAvailabilityDict[mentor.id] && (
										<li>
											Available on: <span>{mentorAvailabilityDict[mentor.id].day}</span>
											<br />
											From: <span>{mentorAvailabilityDict[mentor.id].start_time}</span>
											<br />
											To: <span>{mentorAvailabilityDict[mentor.id].end_time}</span>
										</li>
									)}
								</ul>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
