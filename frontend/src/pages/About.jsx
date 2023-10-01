/* eslint-disable react/no-unescaped-entities */
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

const About = () => {
    return (
        <>
            <NavBar />
            <div className="px-10 pt-40 pb-10 gap-8 ">
                <div className="md:grid grid-cols-2 gap-5">
                    <div>
                        <img src="./pic-05.png" className="w-full" />
                    </div>
                    <div>
                        <h1 className="font-bold text-3xl text-blue-900 pb-3">Our Mission</h1>
                        <p className="text-lg">Welcome to Me2Mentor, where mentorship meets excellence. Our mission is to empower individuals from all walks of life to achieve their full potential and thrive in their chosen fields. We believe that mentorship is the key to unlocking greatness, and our platform connects you with experienced mentors who are passionate about sharing their knowledge and guiding you on your journey to success.</p>

                        <h1 className="font-bold text-3xl text-blue-900 py-3">Our Vision</h1>
                        <p>At Me2Mentor, we envision a world where individuals from every corner of life's diverse spectrum can harness their full potential and flourish in their chosen pursuits. We believe in the transformative power of mentorship as the key that unlocks greatness within us all. Our platform is the bridge that connects passionate mentors with eager learners, fostering a culture of shared knowledge, guidance, and unwavering support.</p>
                    </div>
                </div>

                <div>
                    <p className="font-bold text-2xl text-blue-900 py-3">Why Me2Mentor?</p>
                    <p className="text-lg"> At Me2Mentor, we take pride in offering mentorship opportunities across a wide range of sectors and industries. Here's what sets us apart:</p>
                </div>
                <div>
                    <h2 className="text-blue-900 font-bold pt-2 text-xl">Holistic Growth</h2>
                    <p className="text-lg">We believe that mentorship goes beyond career advancement. It's about personal growth, development, and self-discovery. Our mentors are here to support you not only in your professional journey but also in your personal growth and well-being.</p>
                    <h2 className="text-blue-900 font-bold pt-2 text-xl">Community and Support</h2>
                    <p className="text-lg">When you join Me2Mentor, you become part of a vibrant and supportive community. Connect with fellow mentees, share experiences, and build lasting relationships that go beyond mentorship.</p>
                    <h2 className="text-blue-900 font-bold pt-2 text-xl">Our Commitment to Excellence</h2>
                    <p className="text-lg">At Me2Mentor, excellence is at the core of what we do. We are committed to providing a platform where mentorship flourishes, knowledge is shared, and dreams are realized. Whether you're an aspiring professional looking to learn from the best or an experienced mentor eager to give back, Me2Mentor is your destination for growth and achievement.
                        Join Me2Mentor today and take the first step toward achieving your goals. Discover the power of mentorship and unlock your true potential with us.
                        We look forward to being a part of your success story.
                    </p>
                </div>


                <div className="md:flex pt-5 hidden">
                    <img src="./pic-02.png" className="w-full" />
                    <img src='./pic-01.png' className="w-full" />
                </div>

            </div>
            <Footer />
        </>
    )
}

export default About