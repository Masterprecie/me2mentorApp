/* eslint-disable react/no-unescaped-entities */
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { services } from '../utils/data'

const Services = () => {
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     // If validation passes, create a FormData object to send as a POST request
  //     const formDataToSend = new FormData();
  //     for (const key in formData) {
  //       formDataToSend.append(key, formData[key]);
  //     }

  //     try {
  //       const response = await fetch('http://localhost:5000/api/register', {
  //         method: 'POST',
  //         body: formDataToSend,
  //       });

  //       if (response.status === 201) {
  //         console.log('Registration successful');
  //         const data = await response.json();
  //         console.log('Response data:', data);
  //         // Redirect to the home page (adjust the URL as needed)
  //         window.location.href = '/'; // You can use React Router here if applicable
  //       } else if (response.status === 400) {
  //         // Handle validation errors and display error messages to the user
  //         const errorData = await response.json();
  //         console.error('Registration failed:', errorData.message);
  //         // Update the state to display error messages to the user
  //         setErrors(errorData.errors);
  //       } else {
  //         // Handle other error cases (e.g., server errors) and show a generic error message
  //         console.error('Registration failed');
  //         // Display a generic error message to the user
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //       // Handle network errors or other exceptions and display an error message to the user

  //     }
  //   }
  // };
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