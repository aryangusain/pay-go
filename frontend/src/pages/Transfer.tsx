import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { capitalizeFirstLetter } from "../utils";
import { toast } from "react-toastify";
     
function Transfer() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <Navbar />
      <div className="flex flex-1 justify-center items-center">
        <div className="flex flex-col justify-center gap-3 w-96 h-80 py-4 px-8 rounded-lg shadow-lg bg-blue-100">
            <h1 className="font-bold text-2xl text-center mb-12">Send Money</h1>
            <div className="flex items-center gap-2">
                <div className="cursor-pointer rounded-full bg-blue-400 w-9 h-9 flex items-center justify-center text-xl font-semibold text-white">{name?.charAt(0).toUpperCase()}</div>
                <div className="font-bold text-xl">{capitalizeFirstLetter(name as string)}</div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="text-sm">Amount (in Rs.)</div>
                <input type="number" onChange={(e) => setAmount(Number(e.target.value))} placeholder="Enter Amount" className="w-full border px-4 py-2 text-sm font-semibold border-gray-400 bg-gray-100 rounded-lg outline-none"></input>
            </div>
            <button 
              onClick={async () => {
                try {
                  const response = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                      to: id,
                      amount
                  }, {
                      headers: {
                          Authorization: "Bearer " + localStorage.getItem("token")
                      }
                  })
                  toast.success(response.data.message);
                  navigate('/dashboard');
                }
                catch(error: AxiosError | any) {
                  toast.error(error.response.data.message);
                } 
              }} 
              className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md border-2 font-semibold border-blue-500 hover:bg-gray-100 hover:text-blue-800 transition duration-300 cursor-pointer"
            >
              Send Money
            </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Transfer