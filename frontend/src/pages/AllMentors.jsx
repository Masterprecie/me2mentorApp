import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const AllMentors = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [mentors, setMentors] = useState([]);
	const [filteredMentors, setFilteredMentors] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchMentors();
	}, []);

	useEffect(() => {
		const filtered = mentors.filter((mentor) =>
			(mentor.first_name && mentor.first_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
			(mentor.last_name && mentor.last_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
			(mentor.expertise && mentor.expertise.toLowerCase().includes(searchQuery.toLowerCase())) ||
			(mentor.experience && mentor.experience.toLowerCase().includes(searchQuery.toLowerCase()))
		);

		setFilteredMentors(filtered);
	}, [searchQuery, mentors]);

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const fetchMentors = async () => {
		try {
			const response = await axios.get('http://localhost:5000/api/mentors/all_mentors');
			const data = response.data;
			setMentors(data);
			setFilteredMentors(data);
			setIsLoading(false);
		} catch (error) {
			console.error('Error fetching mentors:', error);
			setIsLoading(false);
		}
	};

	return (
		<div>
			<NavBar />
			<div className="pt-28 pb-10 px-5">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold">Mentors</h1>
					</div>
					<div>
						<input
							type="text"
							name=""
							id=""
							placeholder="Search by name, category, experience, and expertise"
							value={searchQuery}
							onChange={handleSearchChange}
							className="border outline-0 p-2 px-3 rounded-md bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]"
						/>
					</div>
				</div>
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<div>
						<div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:mt-0 pt-5">
							{filteredMentors.map((mentor) => {
								const { id, first_name, last_name, profile_picture, expertise, experience } = mentor;
								return (
									<div key={id} className="rounded-md shadow-md mb-5 md:mb-0">
										<div>
											<Link to={`/mentor/${id}`}>
												<img src={profile_picture} alt="top-mentors" className="rounded-t-md w-full" />
											</Link>
										</div>
										<div className="bg-blue-700 text-white p-2 hover:bg-yellow-400 hover:text-black transition rounded-b-md">
											<p className="font-bold text-lg">
												{first_name}, <span className="text-sm font-normal">{last_name}</span>
											</p>
											<p className="font-semibold">
												Expertise: <span className="text-black ">{expertise}</span>
											</p>
											<p className="font-semibold">
												Experience: <span className="text-black ">{experience}</span>
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default AllMentors;
