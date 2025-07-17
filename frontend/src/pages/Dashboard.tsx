import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import SendMoney from "../components/SendMoney"
import axios from "axios"
import { useSelector } from "react-redux"
import type { RootState } from "../store"

function Dashboard() {
  const user = useSelector((state: RootState) => state.user);
  
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
      axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
          .then(response => {
              setUsers(response.data.user)
          })
  }, [filter])

  useEffect(() => {
    if (!user) return;

    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
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
    <div className="flex flex-col w-full min-h-full bg-gray-800 ">
      <Navbar />
      <div className="flex flex-col mt-8 items-center gap-12 flex-1 px-8 py-4">
        <div className="flex flex-col gap-2 items-center justify-center w-full">
          <h2 className="text-2xl text-gray-100">Account Balance:</h2>
          <p className="text-4xl text-gray-100">Rs. {balance}</p>
        </div>
        <div className="flex flex-col gap-2 w-lg">
          <input type="text" placeholder="Search users..." onChange={(e) => setFilter(e.target.value)} className="border px-4 py-2 border-gray-400 rounded-lg bg-gray-100 outline-none mb-4"></input>
          <div className="flex flex-col gap-3 items-center justify-center mb-12">
            {users.map((u, index) => {
              //@ts-ignore
              if(u.userId !== user.userId) {
                return <SendMoney key={index} user={u}/>
              } 
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard