import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { setUser } from "../userSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user: string | null = useSelector((state: RootState) => state.user.firstName);
  const [popup, setPopup] = useState(false);

  return (
    <div className="flex justify-between items-center px-8 py-4 shadow-sm w-full bg-blue-100">
      <Link to={'/'}><img src="/logo-black.png" className="cursor-pointer h-8 p-0 m-0"></img></Link>
      {
        (!user) ?
          <Link to={'/signin'}><button className="bg-gray-800 text-white w-full px-4 py-2 rounded-md border border-gray-800 hover:bg-gray-100 hover:text-gray-800 transition duration-300 cursor-pointer">Login</button></Link>
          :
          <div className="flex gap-4 items-center justify-center">
            {/*@ts-ignore*/}
            <div onClick={() => setPopup(prev => !prev)} className="cursor-pointer rounded-full bg-blue-500 w-10 h-10 flex items-center justify-center text-xl font-semibold text-white">{user.charAt(0).toUpperCase()}</div>
            {
              (popup) ?
              <div className="flex flex-col gap-3 bg-blue-100 py-4 px-6 w-48 absolute top-16 right-8 shadow-2xl border border-gray-400 rounded-lg">
                  <p className="font-semibold">Hi, {user}</p>
                  <Link to={'/dashboard'}><button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md border-2 border-blue-500 hover:bg-gray-100 hover:text-blue-800 transition duration-300 cursor-pointer">Dashboard</button></Link>
                  <button className="bg-gray-800 text-white w-full px-4 py-2 rounded-md border border-gray-800 hover:bg-gray-100 hover:text-gray-800 transition duration-300 cursor-pointer"
                    onClick={() => {
                      localStorage.removeItem('token');
                      dispatch(setUser({userId: null, firstName: null}));
                      navigate('/');
                    }}
                  > 
                    Logout
                  </button>
                </div>
              : 
                null
            }
          </div>
      }
    </div>
  )
}

export default Navbar
