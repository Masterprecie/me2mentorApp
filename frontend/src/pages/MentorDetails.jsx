import { useParams } from "react-router-dom";
import { topMentors } from "../utils/data";

const MentorDetails = () => {
	//useParams is used to retrieve the mentor's id from the route parameter
	const { id } = useParams();

	const mentor = topMentors.find((mentor) => mentor.id === parseInt(id, 10));


	return (
		<div className="px-5 py-8">
			<div className="text-center text-3xl font-bold pb-8">
				<h1>Mentor Details</h1>
			</div>
			{mentor ? (
				<div >
					<div className="md:grid gap-5 grid-cols-3 border-2 shadow-md p-2">
						<div>
							<img src={mentor.url} alt={mentor.name} className="w-full rounded-md" />
						</div>
						<div className="space-y-5 pt-4">
							<p className="font-bold text-2xl">Name: <span className="font-semibold"> {mentor.name}</span></p>
							<p className="font-bold text-2xl">Country:  <span className="font-semibold">{mentor.country}</span> </p>
							<p className="font-bold text-2xl">Expertise:  <span className="font-semibold">{mentor.field}</span> </p>
							<p className="font-bold text-2xl">Category:  <span className="font-semibold"> {mentor.category}</span></p>
							<p className="font-bold text-2xl">Experience: <span className="font-semibold">{mentor.experience}</span>  </p>


						</div>

						<div className="md:border-l-2 border-t-2 mt-5 md:mt-0 p-2">
							<div className="text-center">
								<h4 className="font-bold text-2xl pb-7">Book a Session</h4>

								<div>
									<button className="p-2 px-6 hover:bg-blue-600 transition-all font-semibold text-lg bg-blue-900 text-white rounded-md">Book a Session</button>
								</div>
							</div>

						</div>
					</div>

					<div className="md:w-1/2 pt-5">
						<h4 className="font-bold">Brief Overview</h4>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos dolore laboriosam impedit voluptatum incidunt, modi repellat, inventore alias dignissimos corrupti, neque ducimus minus animi reiciendis. Expedita corrupti maiores dolor id.</p>
					</div>
				</div>
			) : (
				<p>Mentor not found</p>
			)}
		</div>
	)
}

export default MentorDetails