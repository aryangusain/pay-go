import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../userSlice";
import type { RootState } from "../store";

function Signin() {
  const user = useSelector((state: RootState) => state.user.firstName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  async function handleSignin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signin', formData);
      console.log(formData);
  
      console.log(response.data);
  
      if(response.status == 200) {
        setFormData({
          email: "",
          password: ""
        })

        localStorage.setItem("token", response.data.token);
        const decodedUserInfo = jwtDecode(response.data.token);
        dispatch(setUser(decodedUserInfo));
        toast.success(response.data.message);
        navigate('/dashboard');
      }
    }
    catch(error: AxiosError | any) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-full bg-gray-800">
      <div className="absolute left-0 top-0 w-full bg-blue-100">
        <Link to={'/'}><img src="/logo-white.png" className="cursor-pointer h-8 absolute left-8 top-4"></img></Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 px-8 py-10 border rounded-lg w-fit bg-white border-gray-300 shadow-2xl">
        <h1 className="text-2xl font-bold mb-2">Login</h1>
        <input type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="email" className="border px-4 py-2 border-gray-400 rounded-lg outline-gray-600"></input>
        <input type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="password" className="border px-4 py-2 border-gray-400 rounded-lg outline-gray-600"></input>
        <button onClick={(e) => handleSignin(e)} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md border-2 border-blue-500 hover:bg-gray-100 hover:text-blue-800 transition duration-300 cursor-pointer">Login</button>
        <p className="text-sm">Don't have an account? <Link to={'/signup'} className="text-blue-600 underline">Sign up</Link></p>
      </div>
    </div>
  )
}

export default Signin