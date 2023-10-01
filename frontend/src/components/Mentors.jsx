import { Link } from 'react-router-dom'
import { topMentors } from '../utils/data'

const Mentors = () => {
	return (
		<div className="px-5 py-16 md:flex items-center gap-5">

			<div className=' md:w-[30%] lg:w-[20%] border-2 border-blue-900 py-8 px-5 '>
				<div className="lg:relative">
					<p className="text-3xl font-bold inline-block uppercase pb-1 text-blue-900">Top Mentors</p>
					<div className="lg:absolute bottom-0 left-0 lg:w-1/2 md:w-1/5 w-1/4 border-b-4 border-yellow-400"></div>
				</div>
				<p className='py-5 text-gray-500'>Our mission is to connect individuals seeking guidance and mentorship with experienced professionals eager to share their knowledge and insights.</p>

				<p className='text-xl font-bold text-blue-900'><Link to='/all-mentors'>
					See all Mentors <span className='text-yellow-500'>&gt;</span>
				</Link></p>

			</div>

			<div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:w-[70%] lg:w-[80%] gap-5 md:mt-0 pt-5 ">
				{topMentors.slice(0, 6).map((mentors) => {
					const { id, name, field, url, category, experience, country } = mentors
					return (
						<div key={id} className='rounded-md shadow-md mb-5 md:mb-0'>
							<div>
								<img src={url} alt="top-mentors" className='rounded-t-md w-full' />
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
		</div >
	)
}

export default Mentors