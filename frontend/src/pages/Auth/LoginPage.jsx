import { Link } from "react-router-dom";

const LoginPage = () => {
	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded shadow-md">
				<h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
				<div className="flex flex-col gap-4">
					<button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
						<Link to="/mentor-login">Mentor Login</Link>
					</button>
					<button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded">
						<Link to="/mentee-login">Mentee Login</Link>
					</button>
				</div>
				<p className="text-sm mt-4">
					Don&apos;t have an account?{" "}
					<Link to="/" className="text-blue-500 hover:underline">
						Sign up
					</Link>

				</p>
			</div>
		</div>
	);
};

export default LoginPage;
