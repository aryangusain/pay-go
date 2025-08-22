import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../userSlice";
import type { RootState } from "../store";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

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
    <div className="flex justify-center items-center min-h-screen bg-neutral-900">
      <div className="absolute top-0 left-0 w-full py-3 px-6">
        <Link to={'/'}><h1 style={{fontFamily: "Playfair Display"}} className="text-neutral-100 font-semibold text-2xl">MockPay</h1></Link>
      </div>

      <div className="flex flex-col items-center justify-self-center justify-center gap-4 px-8 py-10 bg-neutral-800/10 text-neutral-100 w-fit border border-neutral-800 rounded-lg shadow-2xl">
        <h1 className="text-2xl mb-2">Login</h1>
        <Input type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="email" ></Input>
        <Input type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="password" ></Input>
        <Button variant="outline" size="sm" className="cursor-pointer text-neutral-900 w-full" onClick={(e) => handleSignin(e)} >Login</Button>
        <p className="mt-2 text-xs text-neutral-100/80">Don't have an account? <Link to={'/signup'} className="text-blue-600 underline">Sign up</Link></p>
      </div>
    </div>
  )
}

export default Signin