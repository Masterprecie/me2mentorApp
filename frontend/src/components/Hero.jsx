import { Link } from "react-router-dom"

const Hero = () => {
	return (

		<div className="pt-16">
			<div className="py-16 px-5 bg-hero-pattern bg-no-repeat bg-cover md:h-[40rem] ">
				<h1 className="md:pt-16 font-bold md:text-6xl text-4xl text-white border-spacing-2 w-full lg:w-2/3">Unlock your potential and take charge of your future</h1>
				<p className="pt-8 text-white">Whether you are a mentor looking to inspire the next generation or a mentee seeking guidance, Me2Mentor is your path to success. <br />Join our community today and embark on a journey of growth, learning, and empowerment.</p>
				<div className="pt-8 flex gap-2 font-bold">
					<button className="bg-blue-900 hover:bg-yellow-400 rounded p-3 text-white transition-all shadow-lg">
						<Link to="/mentor-register">
							Become a Mentor
						</Link>
					</button>
					<button className="bg-yellow-400 rounded p-3 text-blue-900 transition-all shadow-lg">
						<Link to="/mentee-register">
							Sign up as a Mentee
						</Link>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Hero