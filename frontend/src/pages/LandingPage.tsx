import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Button } from "../components/ui/button"
import { useSelector } from "react-redux";
import type { RootState } from "../store";

function LandingPage() {

  const user: string | null = useSelector((state: RootState) => state.user.firstName);

  return (
    <div className="flex flex-col gap-12 items-center w-full min-h-full bg-neutral-900">
      <Navbar />
      <div className="flex flex-col gap-[12px] sm:gap-[4px] justify-center items-center mt-[120px] md:mt-[80px]">
        <h1 style={{fontFamily: "Playfair Display"}} className="text-[76px] sm:text-[112px] md:text-[132px] text-neutral-100 font-bold">MockPay</h1>
        <h2 className="text-[28px] sm:text-[36px] md:text-[42px] text-neutral-100/70 font-semibold -mt-1 sm:-mt-2 md:-mt-4">Send. Receive. Play.</h2>
        <p className="text-neutral-100/50 md:text-[18px] md:w-[360px] text-center w-[240px] sm:w-[320px] mt-0 sm:mt-2">Experience money transfers without real-world stress.</p>
        {
          user ?
            <Button variant="outline" className="mt-2 sm:mt-4 md:mt-6 cursor-pointer">
              <Link to='/dashboard'>
                Go to Dashboard
              </Link>
            </Button>
          :
            <Button variant="outline" className="mt-2 sm:mt-4 md:mt-6 cursor-pointer">
              <Link to='/signin'>
                Get Started
              </Link>
            </Button>
        }
        
      </div>
    </div>
  )
}

export default LandingPage