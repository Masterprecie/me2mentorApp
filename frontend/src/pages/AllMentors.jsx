import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import { topMentors } from "../utils/data"
import { useEffect, useState } from 'react'

const AllMentors = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredMentors, setFilteredMentors] = useState(topMentors);

	useEffect(() => {
		const filtered = topMentors.filter((mentor) =>
			mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			mentor.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
			mentor.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
			mentor.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
			mentor.experience.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredMentors(filtered);
	}, [searchQuery]);

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};


	return (
		<div>
			<NavBar />
			<div className="pt-28 pb-10 px-5">
				<div className="flex justify-between items-center ">
					<div>
						<h1 className="text-3xl font-bold">Mentors</h1>
					</div>

					<div>
						<input
							type="text"
							name=""
							id=""
							placeholder="Search by name, category, experience and expertise"
							value={searchQuery}
							onChange={handleSearchChange}
							className="border outline-0 p-2 px-3 rounded-md bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]"
						/>
					</div>
				</div>


				<div>
					<div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:mt-0 pt-5 ">
						{filteredMentors.map((mentors) => {
							const { id, name, field, url, category, experience, country } = mentors
							return (
								<div key={id} className='rounded-md shadow-md mb-5 md:mb-0'>
									<div>
										<Link to={`/mentor/${id}`}>
											<img src={url} alt="top-mentors" className='rounded-t-md w-full' />
										</Link>
									</div>
									<div className=' bg-blue-700 text-white p-2 hover:bg-yellow-400 hover:text-black transition rounded-b-md'  >
										<p className='font-bold text-lg'>{name}, <span className='text-sm font-normal'>{country}</span> </p>
										<p className='font-semibold '> Expertise: <span className='text-black '>{field}</span> </p>
										<p className='font-semibold'>Category: <span className='text-black '>{category}</span> </p>
										<p className='font-semibold '>Experience: <span className='text-black '>{experience}</span> </p>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default AllMentors