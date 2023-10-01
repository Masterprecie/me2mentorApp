
const Login = () => {
	return (
		<div className="w-full bg-gray-200 h-[100dvh] flex flex-col justify-center py-10">
			<div className="mx-auto lg:w-1/2 w-11/12 bg-white text-black p-5 rounded-md ">
				<div className="text-center pb-6">
					<h4 className="font-semibold text-3xl">Login</h4>
				</div>
				<form action="" className="md:grid grid-cols-2 gap-4">
					<div>
						<label htmlFor="firstName" className="block text-lg font-semibold"> First Name </label>
						<input type="text" placeholder="Enter your First Name" className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
					</div>

					<div>
						<label htmlFor="lastName" className="block text-lg font-semibold"> Last Name </label>
						<input type="text" placeholder="Enter your Last Name" className="border outline-0 p-2 rounded-md w-full  bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
					</div>


					<div>
						<label htmlFor="email" className="block text-lg font-semibold"> Email </label>
						<input type="email" placeholder="Email" className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
					</div>

					<div>
						<label htmlFor="password" className="block text-lg font-semibold"> Password </label>
						<input type="password" placeholder="Password" className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
					</div>


					<div className="text-center w-full col-span-2 pt-3">
						<button className="text-semibold bg-blue-600 text-white p-3 rounded-md hover:bg-blue-300 hover:text-black w-1/2 transition">Submit</button>
					</div>
				</form>
			</div>

		</div>



	)
}

export default Login