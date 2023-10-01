import { BsFillTelephoneFill } from 'react-icons/bs'
import { IoMdMail } from 'react-icons/io'
import { FaHouseChimney, FaFacebook, FaLinkedin, FaGooglePlus, FaTwitter } from 'react-icons/fa6'
import { IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { navLinks } from '../utils/data'

const Footer = () => {
	return (
		<div className="lg:grid grid-cols-3 gap-20 bg-blue-900  text-white py-12 px-5">
			<div>
				<h1 className="font-bold text-3xl">Me<span className="text-yellow-400 font-bold text-4xl">2</span>Mentor</h1>

				<p className='text-gray-300 pt-5'>Embark on a journey of self-discovery, empowerment, and success. Whether you're a mentor looking to make a difference or a mentee eager to learn, our platform is your pathway to personal and professional growth.</p>

				<div className='pt-5 space-y-5'>
					<div className='flex gap-4 items-center'>
						<BsFillTelephoneFill className='text-yellow-400' />
						<p>+123 (4567) 890</p>
					</div>
					<div className='flex gap-4 items-center'>
						<IoMdMail className='text-yellow-400' />
						<p>info@me2mentor.com</p>
					</div>
					<div className='flex gap-4 items-center'>
						<FaHouseChimney className='text-yellow-400' />
						<p>380 St Kilda Road, 3004, VGC, Lagos</p>
					</div>

				</div>
			</div>

			<div className='lg:flex flex-col items-center' >
				<div className="lg:relative">
					<p className="text-3xl font-bold inline-block uppercase pb-1">Links</p>
					<div className="lg:absolute bottom-0 left-0 lg:w-1/2 md:w-[50px]  w-1/5 border-b-4 border-yellow-400 "></div>
				</div>
				<ul className='space-y-5 pt-5'>
					{navLinks.map((link) => {
						const { id, url, name } = link
						return (
							<li key={id} className="flex gap-4 items-center hover:text-yellow-300">
								<IoIosArrowForward className='text-yellow-400' />
								<Link to={url}>
									{name}
								</Link>
							</li>
						)
					})}
				</ul>
			</div>


			<div className='lg:flex flex-col items-center pt-5 lg:pt-0' >
				<div className="lg:relative">
					<p className="text-3xl font-bold inline-block uppercase pb-1">Supports</p>
					<div className="lg:absolute bottom-0 left-0 lg:w-1/2 md:w-1/5 w-1/4 border-b-4 border-yellow-400"></div>
				</div>
				<div className='lg:flex flex-col items-center' >
					<ul className='space-y-5 pt-5 '>
						<li className='hover:text-yellow-300'>
							<Link to='/mentee-register'>
								Connect to a Mentor
							</Link>
						</li>

						<li className='hover:text-yellow-300'>
							<Link to='/mentor-register'>
								Become a Mentor
							</Link>
						</li>

						<li className='hover:text-yellow-300'>
							<Link to='/'>
								Support System
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className='flex'>2023 &copy; All Rights Reserved by<a href='#' className='text-yellow-400'> GAIP</a></div>
			<div>
				<div className='flex gap-2 justify-end'> Follow us:
				<ul>
					<li className='flex gap-2'>
						<Link to='#'><FaFacebook /></Link>
						<Link to='#'><FaTwitter /></Link>
						<Link to='#'><FaLinkedin /></Link>
						<Link to='#'><FaGooglePlus /></Link>
					</li>
				</ul>
				</div>
			</div>
		</div>
	)
}

export default Footer