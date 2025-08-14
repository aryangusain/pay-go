import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { setUser } from "../userSlice";
import { Button } from "./ui/button";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const firstName: string | null = useSelector((state: RootState) => state.user.firstName);
  const [popup, setPopup] = useState(false);

  return (
    <div className="fixed top-0 left-0 flex w-full bg-transparent backdrop-blur-sm justify-center items-center">
      <div className=" flex justify-between items-center px-6 py-4 w-full max-w-[1200px] ">
        <Link to={'/'}><h1 style={{fontFamily: "Playfair Display"}} className="text-neutral-100 font-semibold text-2xl">MockPay</h1></Link>
        {
          (!firstName) ?
              <Button variant="outline" size="sm">
                <Link to={'/signin'}>
                  Login
                </Link>
              </Button>
            :
            <div className="flex gap-4 items-center justify-center relative">
              {/*@ts-ignore*/}
              <div onClick={() => setPopup(prev => !prev)} className="cursor-pointer rounded-full bg-white w-10 h-10 flex items-center justify-center text-xl font-semibold text-neutral-900">{firstName.charAt(0).toUpperCase()}</div>
              {
                (popup) ?
                <div className="flex flex-col gap-3 bg-neutral-100 py-4 px-8 w-44 z-10 absolute top-12 right-0 shadow-2xl rounded-lg">
                    {/*@ts-ignore*/}
                    <p className="text-[20px] text-neutral-900 text-center mb-1">Hi, {firstName.split(" ")[0]}</p>
                    <Link to={'/dashboard'} className="cursor-pointer"><Button variant="outline" size="sm" className="w-full cursor-pointer">Dashboard</Button></Link>
                    <Button variant="default"
                      size="sm" 
                      className="cursor-pointer w-full"
                      onClick={() => {
                        localStorage.removeItem('token');
                        dispatch(setUser({userId: null, firstName: null}));
                        navigate('/');
                      }}
                    > 
                      Logout
                    </Button>
                  </div>
                : 
                null
              }
            </div>
        }
      </div>
    </div>
  )
}

export default Navbar
