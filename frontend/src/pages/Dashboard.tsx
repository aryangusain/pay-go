import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import SendMoney from "../components/SendMoney"
import axios from "axios"
import { useSelector } from "react-redux"
import type { RootState } from "../store"
import { Input } from "../components/ui/input"

function Dashboard() {
  const user = useSelector((state: RootState) => state.user);
  
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
      axios.get("https://pay-go-snowy.vercel.app/api/v1/user/bulk?filter=" + filter)
          .then(response => {
              setUsers(response.data.user)
          })
  }, [filter])

  useEffect(() => {
    if (!user) return;

    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://pay-go-snowy.vercel.app/api/v1/account/balance', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBalance();
  }, [user]);

  return (
    <div className="flex flex-col w-full items-center min-h-full bg-neutral-900 ">
      <div className="max-w-[2000px]">
        <Navbar />
        <div className="flex flex-col mt-[100px] items-center gap-12 sm:w-[300px] w-[260px]">
          <div className="flex flex-col gap-2 items-center justify-center w-full">
            <p className="text-xl text-neutral-100/80">Account Balance:</p>
            <p className="text-4xl text-neutral-100">Rs. {balance}</p>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <Input type="text" placeholder="Search users..." onChange={(e) => setFilter(e.target.value)} className="text-sm py-2 w-full text-neutral-100"></Input>
            <div className="flex flex-col gap-2 no-scrollbar pt-[80px] pb-[10px] items-center justify-center mb-12 overflow-y-scroll overflow-x-hidden max-h-[300px]">
              {users.map((u, index) => {
                //@ts-ignore
                if(u.userId !== user.userId) {
                  return <SendMoney key={index} user={u}/>
                } 
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard