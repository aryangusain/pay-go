import Navbar from "../components/Navbar"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { capitalizeFirstLetter } from "../utils";
import { toast } from "react-toastify";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
     
function Transfer() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-neutral-900">
      <Navbar />
      <div className="flex flex-1 justify-center items-center">
        <div className="flex flex-col justify-center gap-3 w-[300px] h-80 py-4 px-8 rounded-lg border border-neutral-800 shadow-2xl bg-neutral-800/10 text-neutral-100">
            <h1 className="font-medium text-2xl text-center mb-12">Send Money</h1>
            <div className="flex items-center gap-2">
                <div className="cursor-pointer rounded-full bg-neutral-100 text-neutral-900 w-9 h-9 flex items-center justify-center text-xl font-medium">{name?.charAt(0).toUpperCase()}</div>
                <div className="font-semibold text-xl">{capitalizeFirstLetter(name as string)}</div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="text-sm">Amount (in Rs.)</div>
                <Input type="number" onChange={(e) => setAmount(Number(e.target.value))} placeholder="Enter Amount" className="w-full text-sm"></Input>
            </div>
            <Button
              variant="outline" 
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
              className="cursor-pointer text-neutral-900"
            >
              Pay
            </Button>
        </div>
      </div>
    </div>
  )
}

export default Transfer