import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";


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
    <div className="flex justify-center items-center h-full bg-neutral-900">
      <div className="absolute top-0 left-0 w-full py-3 px-6">
        <Link to={'/'}><h1 style={{fontFamily: "Playfair Display"}} className="text-neutral-100 font-semibold text-2xl">MockPay</h1></Link>
      </div>
      
      <div className="flex flex-col items-center justify-self-center justify-center gap-4 px-8 py-10 bg-neutral-800/10 text-neutral-100 w-fit border border-neutral-800 rounded-lg shadow-2xl">
        <h1 className="text-2xl mb-2">Sign Up</h1>
        <Input type="text" placeholder="first name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: (e.target.value).toLowerCase()})}></Input>
        <Input type="text" placeholder="last name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: (e.target.value).toLowerCase()})}></Input>
        <Input type="email" placeholder="email" value={formData.email} onChange={(e) => setFormData({...formData, email: (e.target.value).toLowerCase()})}></Input>
        <Input type="password" placeholder="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}></Input>
        <Button variant="outline" size="sm" onClick={(e) => handleSignup(e)} className="w-full text-neutral-900">Sign up</Button>
        <p className="text-xs mt-2">Already have an account? <Link to={'/signin'} className="text-blue-600 underline">Login</Link></p>
      </div>
    </div>
  )
}

export default Signup