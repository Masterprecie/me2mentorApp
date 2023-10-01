import { FaPeopleCarryBox, FaPeopleGroup, FaPeoplePulling, FaPeopleRoof, FaUserGraduate, FaUserLock } from "react-icons/fa6"
import { Link } from "react-router-dom"

const AboutSection = () => {
	return (
		<div >
			<div className="py-10 px-5">
				<div className="text-center">
					<h2 className="md:text-4xl text-2xl text-blue-900 font-bold pb-3">Welcome to <span className="font-bold md:text-4xl">
						Me<span className="text-yellow-400 font-bold md:text-5xl">2</span>Mentor
					</span></h2>
					<p className="md:text-lg text-sm text-gray-600 font-semibold">A community that speedens your journey to growth, learning and empowerment.</p>
				</div>

				<div className="md:grid md:grid-cols-2 lg:grid-cols-3 py-5 gap-6">
					<div className="flex gap-2">
						<div className="w-[100px] h-[50px] border border-yellow-400 flex justify-center items-center rounded-full" >
							<FaPeoplePulling className='w-10' />
						</div>
						<div>
							<h3 className="text-blue-900 font-semibold text-xl">Personalized Mentorship Matching</h3>
							<p className="py-3 text-base text-gray-500 font-light">Finding the right mentor or mentee can be challenging. Me2Mentor takes the guesswork out of the equation.</p>
						</div>
					</div>

					<div className="flex gap-2">
						<div className="w-[80px] h-[50px] border border-yellow-400 flex justify-center items-center rounded-full" >
							<FaPeopleGroup className='w-10' />
						</div>
						<div>
							<h3 className="text-blue-900 font-semibold text-xl">Diverse Network of Mentors</h3>
							<p className="py-3 text-base text-gray-500 font-light">Our extensive mentor network spans various industries, professions, and backgrounds. </p>
						</div>
					</div>

					<div className="flex gap-2">
						<div className="w-[130px] h-[50px] border border-yellow-400 flex justify-center items-center rounded-full" >
							<FaUserGraduate className='w-10' />
						</div>
						<div>
							<h3 className="text-blue-900 font-semibold text-xl"> Skill Enhancement and Career Advancement:</h3>
							<p className="py-3 text-base text-gray-500 font-light">With Me2Mentor, you will have access to mentors who can help you hone your skills, set and achieve career goals, and unlock new opportunities.</p>
						</div>
					</div>
					<div className="flex gap-2">
						<div className="w-[110px] h-[50px] border border-yellow-400 flex justify-center items-center rounded-full" >
							<FaUserLock className='w-10' />
						</div>
						<div>
							<h3 className="text-blue-900 font-semibold text-xl">Unlock Opportunities for Prospective Employment</h3>
							<p className="py-3 text-base text-gray-500 font-light">Our platform offers you the opportunity to get recommended by mentors to prospective employers as the need arises.</p>
						</div>
					</div>
					<div className="flex gap-2">
						<div className="w-[140px] h-[50px] border border-yellow-400 flex justify-center items-center rounded-full" >
							<FaPeopleRoof className='w-10' />
						</div>
						<div>
							<h3 className="text-blue-900 font-semibold text-xl">Supportive Community</h3>
							<p className="py-3 text-base text-gray-500 font-light">Join a vibrant and supportive community of like-minded individuals. Connect with mentees and mentors who share your passion and commitment to growth.</p>
						</div>
					</div>
					<div className="flex gap-2">
						<div className="w-[100px] h-[50px] border border-yellow-400 flex justify-center items-center rounded-full" >
							<FaPeopleCarryBox className='w-10' />
						</div>
						<div>
							<h3 className="text-blue-900 font-semibold text-xl"> Knowledge Sharing and Growth</h3>
							<p className="py-3 text-base text-gray-500 font-light">For mentors, Me2Mentor provides a platform to give back to the community and share their wealth of experience</p>
						</div>
					</div>
				</div>
			</div>


			<div className="bg-slate-300 px-5 py-10">
				<div className="text-center">

					<p className="py-5 text-4xl font-bold">Join <span className="font-bold md:text-4xl">
						Me<span className="text-yellow-400 font-bold md:text-4xl">2</span>Mentor
					</span> and connect with your future success</p>

					<p className="py-2 text-base font-semibold">Are you ready to take your life and career to the next level? At Me2Mentor we believe that mentorship is the key to unlocking your full potential. Our platform is designed to connect you with experienced mentors who will guide you on your journey to success.</p>

					<p className="py-2 text-base font-semibold">Join the thousands of users who have already taken the leap towards success by following these simple steps</p>

					<div className="md:grid md:grid-cols-2 lg:grid-cols-4 items-center gap-4">
						<div className="flex flex-col  items-center  py-5">
							<div className="bg-blue-500 text-white rounded-full flex items-center justify-center w-10 h-10">1</div>
							<p className="font-bold text-lg">Create an Account</p>
							<p className="text-lg text-center "> Sign up with your google or email account.</p>
						</div>

						<div className="flex flex-col items-center py-5">
							<div className="bg-blue-500 text-white rounded-full flex items-center justify-center w-10 h-10">2</div>
							<p className="font-bold text-lg">Set your goals</p>
							<p className="text-lg text-center">Tell us about your mentoring goals and preferences</p>
						</div>

						<div className="flex flex-col items-center  py-5">
							<div className="bg-blue-500 text-white rounded-full flex items-center justify-center w-10 h-10">3</div>
							<p className="font-bold text-lg">Match and connect</p>
							<p className="text-lg text-center ">Our algorithm will find the perfect mentorship match for you.</p>
						</div>

						<div className="flex flex-col items-center  py-5">
							<div className="bg-blue-500 text-white rounded-full flex items-center justify-center w-10 h-10">4</div>
							<p className="font-bold text-lg">Start your journey</p>
							<p className="text-lg text-center">Begin your mentorship adventure and watch your potential unfold.</p>
						</div>

					</div>

					<div className="text-center bg-blue-900 hover:bg-yellow-400 hover:text-blue-800 font-semibold mt-3 md:w-1/2 lg:w-1/4 mx-auto rounded p-3 text-white transition-all shadow-lg">
						<button> <Link to='/mentee-register'>
							Join Me2Mentor Today!
						</Link> </button>
					</div>
				</div>


			</div>


		</div>
	)
}

export default AboutSection