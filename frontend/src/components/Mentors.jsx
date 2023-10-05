// import { Link } from 'react-router-dom'
// import { topMentors } from '../utils/data'

// const Mentors = () => {
// 	return (
// 		<div className="px-5 py-16 md:flex items-center gap-5">

// 			<div className=' md:w-[30%] lg:w-[20%] border-2 border-blue-900 py-8 px-5 '>
// 				<div className="lg:relative">
// 					<p className="text-3xl font-bold inline-block uppercase pb-1 text-blue-900">Top Mentors</p>
// 					<div className="lg:absolute bottom-0 left-0 lg:w-1/2 md:w-1/5 w-1/4 border-b-4 border-yellow-400"></div>
// 				</div>
// 				<p className='py-5 text-gray-500'>Our mission is to connect individuals seeking guidance and mentorship with experienced professionals eager to share their knowledge and insights.</p>

// 				<p className='text-xl font-bold text-blue-900'><Link to='/all-mentors'>
// 					See all Mentors <span className='text-yellow-500'>&gt;</span>
// 				</Link></p>

// 			</div>

// 			<div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:w-[70%] lg:w-[80%] gap-5 md:mt-0 pt-5 ">
// 				{topMentors.slice(0, 6).map((mentors) => {
// 					const { id, name, field, url, category, experience, country } = mentors
// 					return (
// 						<div key={id} className='rounded-md shadow-md mb-5 md:mb-0'>
// 							<div>
// 								<img src={url} alt="top-mentors" className='rounded-t-md w-full' />
// 							</div>
// 							<div className=' bg-blue-700 text-white p-2 hover:bg-yellow-400 hover:text-black transition rounded-b-md'  >
// 								<p className='font-bold text-lg'>{name}, <span className='text-sm font-normal'>{country}</span> </p>
// 								<p className='font-semibold '> Expertise: <span className='text-black '>{field}</span> </p>
// 								<p className='font-semibold'>Category: <span className='text-black '>{category}</span> </p>
// 								<p className='font-semibold '>Experience: <span className='text-black '>{experience}</span> </p>
// 							</div>
// 						</div>
// 					)
// 				})}
// 			</div>
// 		</div >
// 	)
// }

// export default Mentors

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Mentors = () => {
	const [mentors, setMentors] = useState([]);

	useEffect(() => {
		// Fetch all mentors data from your API
		axios
			.get('http://localhost:5000/api/mentors/all_mentors') // Replace with your API endpoint
			.then((response) => {
				const allMentors = response.data;
				const topMentors = allMentors.slice(0, 6); // Display only the first 6 mentors
				setMentors(topMentors);
			})
			.catch((error) => {
				console.error('Error fetching mentors:', error);
			});
	}, []);

	return (
		<div className="px-5 py-16 md:flex items-center gap-5">
			<div className="md:w-[30%] lg:w-[20%] border-2 border-blue-900 py-8 px-5">
				<div className="lg:relative">
					<p className="text-3xl font-bold inline-block uppercase pb-1 text-blue-900">Top Mentors</p>
					<div className="lg:absolute bottom-0 left-0 lg:w-1/2 md:w-1/5 w-1/4 border-b-4 border-yellow-400"></div>
				</div>
				<p className="py-5 text-gray-500">
					Our mission is to connect individuals seeking guidance and mentorship with experienced professionals eager to share their knowledge and insights.
				</p>
				<p className="text-xl font-bold text-blue-900">
					<Link to="/all-mentors">
						See all Mentors <span className="text-yellow-500">&gt;</span>
					</Link>
				</p>
			</div>
			<div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:w-[70%] lg:w-[80%] gap-5 md:mt-0 pt-5">
				{mentors.map((mentor) => {
					const { id, first_name, last_name, profile_picture, expertise, experience } = mentor;
					return (
						<div key={id} className="rounded-md shadow-md mb-5 md:mb-0">
							<div>
								<img src={profile_picture} alt="top-mentors" className="rounded-t-md w-full" />
							</div>
							<div className="bg-blue-700 text-white p-2 hover:bg-yellow-400 hover:text-black transition rounded-b-md">
								<p className="font-bold text-lg">
									{first_name}, <span className="text-sm font-normal">{last_name}</span>
								</p>
								<p className="font-semibold"> Expertise: <span className="text-black ">{expertise}</span> </p>
								<p className="font-semibold">Experience: <span className="text-black ">{experience}</span> </p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Mentors;
