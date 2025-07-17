import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify";


function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  async function handleSignup(e: any) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', formData);
      console.log(response.data);
  
      if(response.status === 200) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: ""
        })
  
        toast.success(response.data.message);
  
        navigate('/signin');
      }
    }
    catch(error: AxiosError | any) {
      toast.error(error.response.data.message);
    } 
  }

  return (
    <div className="flex justify-center items-center h-full bg-gray-800">
      <Link to={'/'}><img src="/logo-white.png" className="cursor-pointer h-8 absolute left-8 top-4"></img></Link>
      <div className="flex flex-col items-center justify-center gap-4 px-8 py-6 border rounded-lg w-fit bg-white border-gray-300 shadow-2xl">
        <h1 className="text-2xl font-bold mb-2">Sign Up</h1>
        <input type="text" placeholder="first name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: (e.target.value).toLowerCase()})} className="border px-4 py-2 border-gray-400 rounded-lg outline-gray-600"></input>
        <input type="text" placeholder="last name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: (e.target.value).toLowerCase()})} className="border px-4 py-2 border-gray-400 rounded-lg outline-gray-600"></input>
        <input type="email" placeholder="email" value={formData.email} onChange={(e) => setFormData({...formData, email: (e.target.value).toLowerCase()})} className="border px-4 py-2 border-gray-400 rounded-lg outline-gray-600"></input>
        <input type="password" placeholder="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="border px-4 py-2 border-gray-400 rounded-lg outline-gray-600"></input>
        <button onClick={(e) => handleSignup(e)} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md border-2 border-blue-500 hover:bg-gray-100 hover:text-blue-800 transition duration-300 cursor-pointer">Sign up</button>
        <p className="text-sm">Already have an account? <Link to={'/signin'} className="text-blue-600 underline">Login</Link></p>
      </div>
    </div>
  )
}

export default Signup