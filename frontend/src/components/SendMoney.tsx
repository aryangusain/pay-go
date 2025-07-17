import { useNavigate } from "react-router-dom"

//@ts-ignore
function SendMoney({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center w-full py-2 px-4 rounded-lg shadow-sm bg-blue-100 duration-200">
        <div className="flex items-center gap-4">
            <div className="cursor-pointer rounded-full bg-blue-500 w-8 h-8 flex items-center justify-center text-lg font-semibold text-white">{user.firstName.charAt(0).toUpperCase()}</div>
            <div className="font-semibold text-lg">{user.firstName} {user.lastName}</div>
        </div>
        <button onClick={() => { navigate("/transfer?id=" + user.userId + "&name=" + user.firstName + " " + user.lastName) }} className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md border-2 font-semibold border-blue-500 hover:bg-gray-100 hover:text-blue-800 transition duration-300 cursor-pointer">Send Money</button>
    </div>
  )
}

export default SendMoney