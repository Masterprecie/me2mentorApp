
const MentorRegister = () => {
	return (
		<div className="w-full bg-gray-200 h-full flex flex-col justify-center py-10">
			<div className="mx-auto md:w-1/2 bg-white text-black p-5 rounded-md ">
				<div className="text-center pb-6">
					<h1 className="font-bold text-3xl">Me<span className="text-yellow-400  font-bold text-4xl">2</span>Mentor</h1>
					<h4 className="font-semibold text-lg">Register as a Mentor</h4>
				</div>
				<form className="md:grid grid-cols-2 gap-4">
					<div>
						<label htmlFor="firstName" className="block text-lg font-semibold"> First Name </label>
						<input type="text" placeholder="Enter your First Name" className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
					</div>

					<div>
						<label htmlFor="lastName" className="block text-lg font-semibold"> Last Name </label>
						<input type="text" placeholder="Enter your Last Name" className="border outline-0 p-2 rounded-md w-full  bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
					</div>
					<div>
						<label htmlFor="userName" className="block text-lg font-semibold"> Username </label>
						<input type="text" placeholder="Enter your username" className="border outline-0 p-2 rounded-md w-full  bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
					</div>

					<div>
						<label htmlFor="email" className="block text-lg font-semibold"> Email </label>
						<input type="email" placeholder="Email" className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
					</div>
					<div>
						<label htmlFor="age" className="block text-lg font-semibold"> Age </label>
						<input type="number" placeholder="Age" className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
					</div>
					<div>
						<label htmlFor="phoneNumber" className="block text-lg font-semibold"> Phone Number </label>
						<input type="number" placeholder="Phone Number" className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
					</div>
					<div>
						<label htmlFor="password" className="block text-lg font-semibold"> Password </label>
						<input type="password" placeholder="Password" className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
					</div>
					<div>
						<label htmlFor="password" className="block text-lg font-semibold"> Comfirm Password </label>
						<input type="password" placeholder="Comfirm password" className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
					</div>
					<div>
						<label htmlFor="qualification" className="block text-lg font-semibold"> Current Qualification </label>
						<select name="" id="" className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]">
							<option value="" ></option>
							<option value="" >Option 1</option>
							<option value="" >Option 2</option>
						</select>
					</div>
					<div>
						<label htmlFor="specialization" className="block text-lg font-semibold"> Area of Specialization </label>
						<select name="" id="" className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]">
							<option value="" ></option>
							<option value="" >Option 1</option>
							<option value="" >Option 2</option>
						</select>
					</div>
					<div>
						<label htmlFor="experience" className="block text-lg font-semibold"> Experience </label>
						<select name="" id="" className="border outline-0 p-2 rounded-md w-full bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]">
							<option value="" ></option>
							<option value="" >Option 1</option>
							<option value="" >Option 2</option>
						</select>
					</div>

					<div>
						<label htmlFor="picture" className="block text-lg font-semibold"> Profile Picture </label>
						<input type="file" placeholder="Comfirm password" className="border outline-0 p-[5px] rounded-md w-full  bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]" />
					</div>

					<div className="text-center w-full col-span-2 pt-3">
						<button className="text-semibold bg-blue-600 text-white p-3 rounded-md hover:bg-blue-300 w-1/2 transition">Submit</button>
					</div>
				</form>
			</div>

		</div>
	)
}

export default MentorRegister