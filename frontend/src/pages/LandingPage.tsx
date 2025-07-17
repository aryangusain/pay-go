import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

function LandingPage() {
  return (
    <div className="flex flex-col gap-12 items-center w-full min-h-full bg-gray-800">
      <Navbar />
      <div className="h-full flex gap-8 justify-center items-center">
        <div className="flex flex-col justify-center gap-8 bg-blue-100 font-bold max-w-140 border border-gray-300 h-fit px-16 py-12 shadow-xl rounded-xl">
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold text-6xl">Pay Friends.</h2>
              <h2 className="font-semibold text-6xl">Pay for Everything.</h2>
            </div>
            <p className="text-xl font-normal">Easily send money to your friends and pay for everything* you want online, in-store, and in apps with your <span className="font-semibold">Pay&Go</span> account. </p>
            <Link to={'/signup'}><button className="bg-gray-800 text-white w-full px-4 py-2 rounded-md border border-gray-800 hover:bg-gray-100 hover:text-gray-800 transition duration-300 cursor-pointer">Get Started</button></Link>
        </div>
        <img src={'hero.png'} className="h-72 z-10 self-end rounded-xl"></img>
      </div>
      <Footer />
    </div>
  )
}

export default LandingPage