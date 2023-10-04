import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { blog } from "../utils/data"
import { Link } from "react-router-dom"
import { FaMessage } from "react-icons/fa6"

const Blog = () => {
	return (
		<>
			<NavBar />
			<div className="px-10 pt-28 pb-16 text-blue-900">
				<div className="text-center font-bold text-2xl pb-5">
					Blog
				</div>

				<div className="flex lg:flex-row flex-col font-light gap-20 ">
					<div className="lg:w-[30%]">
						<input
							type="text"
							name=""
							id=""
							placeholder="Search here.."
							className="border p-2 px-10 outline-slate-400 w-full"
						/>
						<div className="text-blue-950 font-bold pt-10">CATEGORY
							<ul className="">
								<li>Trending</li>
								<li>Events</li>
								<li>Tips</li>
								<li>Education</li>
							</ul>
						</div>
					</div>

					<div className="md:grid grid-rows-2 gap-10 w-[70%] ">
						{
							blog.map((data) => {
								const { id, img, title, content } = data
								return (
									<div key={id} className="p-0 gap-5 rounded-md border">
										<div>
											<img src={img} className="w-full" />
										</div>

										<div className="p-8">
										<div>
											<h1 className="font-bold">{title} </h1>
											<p>{content} </p>
										</div>
										<div className="font-bold text-blue-900 pt-5">
											<Link to="#">
												Read more
											</Link>
											<div className="flex justify-end text-yellow-400 px-5">
												<FaMessage />
												10 comments
											</div>
										</div>
										</div>
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Blog