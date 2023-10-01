import ContactUS from '../components/ContactUS'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import About from '../components/AboutSection'
import NavBar from '../components/NavBar'
import Mentors from '../components/Mentors'

const Home = () => {
    return (
        <div className='' >
            <NavBar />
            <Hero />
            <About />
            <Mentors />
            <ContactUS />
            <Footer />

        </div>
    )
}

export default Home