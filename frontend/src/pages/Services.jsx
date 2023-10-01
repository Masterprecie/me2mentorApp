/* eslint-disable react/no-unescaped-entities */
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { services } from '../utils/data'

const Services = () => {
  return (
    <>
      <NavBar />
      <div className="py-28 px-5">
        <div className="text-center font-bold pb-5 text-2xl">
          Services
        </div>

        <div className="md:grid grid-cols-2 gap-5">
          {
            services.map((data) => {
              const { id, img, title, content } = data
              return (
                <div key={id} className="md:grid grid-cols-2 gap-5 rounded-md shadow-md p-3 border">
                  <div>
                    <img src={img} className="w-full h-full" />
                  </div>

                  <div className="text-blue-900">
                    <h1 className="font-extrabold">{title}</h1>
                    <p>{content}</p>
                  </div>
                </div>
              )
            })
          }

        </div>

      </div>
      <Footer />

    </>
  )
}

export default Services