import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth";
import { useEffect, useState } from "react";

const Hero = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [userLoggedIn, setUserLoggedIn] = useState(!!user);

	const handleMenteeSignUp = () => {
		if (userLoggedIn) {
			// If the user is logged in, navigate to the actual sign-up page
			navigate("/mentee-register");
		} else {
			// If the user is not logged in, navigate to the login page
			navigate("/login");
		}
	};

	const handleMentorSignUp = () => {
		if (userLoggedIn) {
			// If the user is logged in, navigate to the actual sign-up page
			navigate("/mentor-register");
		} else {
			// If the user is not logged in, navigate to the login page
			navigate("/login");
		}
	};

	useEffect(() => {
		// Update the userLoggedIn state when the user logs in or out
		setUserLoggedIn(!!user);
	}, [user]);

	return (
		<div className="pt-16">
			<div className="py-16 px-5 bg-hero-pattern bg-no-repeat bg-cover md:h-[40rem]">
				<h1 className="md:pt-16 font-bold md:text-6xl text-4xl text-white border-spacing-2 w-full lg:w-2/3">
					Unlock your potential and take charge of your future
				</h1>
				<p className="pt-8 text-white">
					Whether you are a mentor looking to inspire the next generation or a
					mentee seeking guidance, Me2Mentor is your path to success. <br />
					Join our community today and embark on a journey of growth, learning,
					and empowerment.
				</p>
				<div className="pt-8 flex gap-2 font-bold">
					<button
						className="bg-blue-900 hover:bg-yellow-400 rounded p-3 text-white transition-all shadow-lg"
						onClick={handleMentorSignUp}
					>
						{userLoggedIn ? (
							<Link to="/mentor-register">Become a Mentor</Link>
						) : (
							"Sign up as a Mentor"
						)}
					</button>
					<button
						className="bg-yellow-400 rounded p-3 text-blue-900 transition-all shadow-lg"
						onClick={handleMenteeSignUp}
					>
						{userLoggedIn ? (
							<Link to="/mentee-register">Become a Mentee</Link>
						) : (
							"Sign up as a Mentee"
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Hero;
